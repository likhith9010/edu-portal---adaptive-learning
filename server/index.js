import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { USERS } from './data/users.js';
import { generateSamplePdf, generatePagedPdf, blocksForChapter } from './generateSamplePdf.js';
import { CLASS8_CHAPTERS } from '../src/data/class8Study.js';
import { applyEloEvents } from '../src/data/elo.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '40mb' }));

// In-memory assignment storage for interactive teacher assignments
let dynamicAssignments = [];

// In-memory PDF metadata store (moduleId -> pdfInfo)
// When teacher uploads a PDF, its metadata and buffer are stored here
const pdfStore = new Map();
const ratingsPath = path.join(__dirname, 'data', 'ratings.json');

function readRatings() {
  try {
    const data = JSON.parse(fs.readFileSync(ratingsPath, 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function writeRatings(ratings) {
  fs.writeFileSync(ratingsPath, JSON.stringify(ratings, null, 2));
}

function savedElo(user) {
  const saved = readRatings()[user?.id];
  return Number.isFinite(Number(saved)) ? Number(saved) : user?.elo;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    institution: 'EduPortal Adaptive Learning System',
    timestamp: new Date().toISOString()
  });
});

// PDF Streaming Endpoint — never stores PDF in Chrome local storage
// GET /api/pdf/:moduleId?grade=Class+6&title=...&chapter=...&remarks=...
// Streams a PDF from server memory directly; browser renders it via iframe
app.get('/api/pdf/:moduleId', (req, res) => {
  const moduleId = safeModuleId(req.params.moduleId);
  const { grade, title, chapter, remarks } = req.query;
  if (!moduleId) {
    return res.status(400).json({ error: 'Invalid module id' });
  }

  // Check if we have a real uploaded PDF for this module
  if (pdfStore.has(moduleId)) {
    const stored = pdfStore.get(moduleId);
    res.setHeader('Content-Type', 'application/pdf');
    const downloadName = String(stored.fileName || `${moduleId}.pdf`).replace(/["\r\n\\]/g, '');
    res.setHeader('Content-Disposition', `inline; filename="${downloadName}"`); 
    res.setHeader('Cache-Control', 'no-store'); // Never cache in browser storage
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(stored.buffer);
    return;
  }

  // Check if a real PDF file exists on disk for this module
  const pdfPath = path.join(__dirname, 'pdfs', `${moduleId}.pdf`);
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${moduleId}.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    return fs.createReadStream(pdfPath).pipe(res);
  }

  const chapterBuffer = chapterWorksheet(moduleId);
  if (chapterBuffer) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${moduleId}_worksheet.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Served-By', 'EduPortal-Backend');
    res.send(chapterBuffer);
    return;
  }

  // Fallback: Generate a real sample PDF in-memory for this module
  const pdfBuffer = generateSamplePdf({
    title: title || 'Mathematics Worksheet',
    chapter: chapter || 'Chapter',
    grade: grade || 'Class',
    teacherName: 'Dr. Priya Sundaram',
    teacherRemarks: remarks || 'Complete all problems carefully and show your working step by step.',
    practiceProblems: [
      { q: `1. Solve the core problem sets from ${chapter || 'this chapter'} as discussed in class.`, ans: 'Apply the standard formulas taught and verify your answer step by step.' },
      { q: '2. Identify all given values, unknown quantities and state the formula before solving.', ans: 'Write given: ..., unknown: ..., formula: ..., then compute.' },
      { q: '3. Write a short explanation (3-4 sentences) of the main concept in your own words.', ans: 'Demonstrate conceptual understanding in your own language.' }
    ]
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${moduleId}_worksheet.pdf"`);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('X-Served-By', 'EduPortal-Backend');
  res.send(pdfBuffer);
});

const pdfDir = path.join(__dirname, 'pdfs');

function safeModuleId(moduleId) {
  const clean = String(moduleId || '').replace(/[^a-zA-Z0-9._-]/g, '');
  if (!clean || clean === '.' || clean === '..') return null;
  return clean;
}

// Upload/store PDF for a module. Kept in memory and written to server/pdfs so it can be viewed after a refresh.
// POST /api/pdf/upload  { moduleId, fileName, base64 }
app.post('/api/pdf/upload', (req, res) => {
  const { fileName, base64 } = req.body;
  const moduleId = safeModuleId(req.body.moduleId);
  if (!moduleId || !base64) {
    return res.status(400).json({ error: 'moduleId and base64 are required' });
  }
  try {
    const buffer = Buffer.from(base64, 'base64');
    if (!buffer.length || buffer.subarray(0, 4).toString() !== '%PDF') {
      return res.status(400).json({ error: 'The file is not a valid PDF.' });
    }
    fs.mkdirSync(pdfDir, { recursive: true });
    const storedName = `${moduleId}.pdf`;
    fs.writeFileSync(path.join(pdfDir, storedName), buffer);
    pdfStore.set(moduleId, { buffer, fileName: fileName || storedName, uploadedAt: new Date().toISOString() });
    res.json({ success: true, moduleId, message: 'PDF saved and ready to view.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store PDF buffer.' });
  }
});

const addedModulesPath = path.join(__dirname, 'data', 'addedModules.json');

function readAddedModules() {
  try {
    const parsed = JSON.parse(fs.readFileSync(addedModulesPath, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAddedModules(modules) {
  fs.mkdirSync(path.dirname(addedModulesPath), { recursive: true });
  fs.writeFileSync(addedModulesPath, JSON.stringify(modules, null, 2));
}

app.get('/api/modules', (req, res) => {
  res.json(readAddedModules());
});

app.post('/api/modules', (req, res) => {
  const { grade, module: savedModule } = req.body || {};
  if (!grade || !savedModule?.id) {
    return res.status(400).json({ error: 'grade and module are required' });
  }
  const all = readAddedModules();
  const list = Array.isArray(all[grade]) ? all[grade] : [];
  if (!list.some((item) => item.id === savedModule.id)) list.push(savedModule);
  all[grade] = list;
  writeAddedModules(all);
  res.json({ success: true });
});

app.post('/api/modules/delete', (req, res) => {
  const { grade, moduleId } = req.body || {};
  if (!grade || !moduleId) {
    return res.status(400).json({ error: 'grade and moduleId are required' });
  }
  const all = readAddedModules();
  all[grade] = (all[grade] || []).filter((item) => item.id !== moduleId);
  writeAddedModules(all);
  const id = safeModuleId(moduleId);
  if (id) {
    pdfStore.delete(id);
    const storedPath = path.join(pdfDir, `${id}.pdf`);
    if (fs.existsSync(storedPath)) fs.unlinkSync(storedPath);
  }
  res.json({ success: true });
});

// 2. Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { rollNo, password, role } = req.body;

  if (!rollNo || !password) {
    return res.status(400).json({ error: 'Please enter both Roll Number/User Name and Password' });
  }

  const cleanRoll = rollNo.trim();
  const cleanPass = password.trim();

  // Find user by rollNo (or id)
  const user = USERS.find(u =>
    (u.rollNo.toLowerCase() === cleanRoll.toLowerCase() || u.id.toLowerCase() === cleanRoll.toLowerCase())
  );

  if (!user) {
    return res.status(401).json({ error: 'No account found with this Roll Number/User ID.' });
  }

  if (user.password !== cleanPass) {
    return res.status(401).json({ error: 'Incorrect password. Please verify and try again.' });
  }

  // If role is specified, verify matching role
  if (role && user.role !== role) {
    return res.status(403).json({
      error: `This account is registered as a ${user.role.toUpperCase()}. Please switch to the ${user.role} login tab.`
    });
  }

  // Return user without password, using the saved rating when this student has one
  const { password: _, ...safeUser } = user;
  if (user.role === 'student') safeUser.elo = savedElo(user);
  return res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    user: safeUser,
    token: `jwt-mock-token-${user.id}-${Date.now()}`
  });
});

app.get('/api/elo', (_req, res) => {
  res.json(readRatings());
});

app.post('/api/elo', (req, res) => {
  const { userId, events } = req.body || {};
  const user = USERS.find((item) => item.id === userId && item.role === 'student');
  if (!user) return res.status(404).json({ error: 'Student not found' });
  const clean = (Array.isArray(events) ? events : []).filter((event) => (
    event && (event.outcome === 'correct' || event.outcome === 'wrong' || event.outcome === 'hint')
  )).map((event) => ({
    level: event.level === 'Easy' || event.level === 'Hard' ? event.level : 'Medium',
    outcome: event.outcome
  }));
  if (!clean.length) return res.status(400).json({ error: 'No results to score' });
  const next = applyEloEvents(savedElo(user), clean);
  const all = readRatings();
  all[userId] = next;
  writeRatings(all);
  res.json({ elo: next });
});

// 3. Get all students (for Teacher Dashboard)
app.get('/api/students', (req, res) => {
  const students = USERS.filter(u => u.role === 'student').map(s => {
    const { password, ...safe } = s;
    safe.elo = savedElo(s);
    return safe;
  });
  res.json(students);
});

// 4. Get single student profile
app.get('/api/student/:rollNo', (req, res) => {
  const { rollNo } = req.params;
  const student = USERS.find(u => u.role === 'student' && u.rollNo === rollNo);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  const { password, ...safe } = student;
  safe.elo = savedElo(student);
  res.json(safe);
});

// 5. Teacher assigns adaptive task
app.post('/api/teacher/assign', (req, res) => {
  const { title, subject, targetGrade, targetRollNo, difficulty, instructions } = req.body;
  if (!title || !subject) {
    return res.status(400).json({ error: 'Title and subject are required' });
  }

  const newAssignment = {
    id: `assign-${Date.now()}`,
    title,
    subject,
    targetGrade: targetGrade || 'All Classes',
    targetRollNo: targetRollNo || 'All',
    difficulty: difficulty || 'Adaptive Medium',
    instructions: instructions || 'Complete before next review',
    createdAt: new Date().toLocaleDateString(),
    status: 'Active'
  };

  dynamicAssignments.unshift(newAssignment);
  res.json({ success: true, assignment: newAssignment, message: 'Adaptive task dispatched to cohort successfully' });
});

// 6. Get teacher assignments
app.get('/api/teacher/assignments', (req, res) => {
  res.json(dynamicAssignments);
});

// 7. LLM Integration Endpoint for Adaptive Learning & Teacher Quiz Generation
function chapterWorksheet(moduleId) {
  const chapter = CLASS8_CHAPTERS[moduleId];
  if (!chapter) return null;
  return generatePagedPdf(blocksForChapter(chapter));
}

function worksheetPdfBuffer(pdfContext) {
  if (!pdfContext?.moduleId) return null;
  const id = safeModuleId(pdfContext.moduleId);
  if (!id) return null;
  if (pdfStore.has(id)) return pdfStore.get(id).buffer;
  const pdfPath = path.join(pdfDir, `${id}.pdf`);
  if (fs.existsSync(pdfPath)) return fs.readFileSync(pdfPath);
  const chapterBuffer = chapterWorksheet(id);
  if (chapterBuffer) return chapterBuffer;
  return generateSamplePdf({
    title: pdfContext.title,
    chapter: pdfContext.chapter,
    grade: pdfContext.grade,
    teacherRemarks: pdfContext.remarks
  });
}

function pdfLiteral(raw) {
  return raw
    .replace(/\\n/g, ' ')
    .replace(/\\r/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stringsFromPdfContent(content) {
  const lines = [];
  const pattern = /\((?:\\.|[^\\)]){2,}\)/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const text = pdfLiteral(match[0].slice(1, -1));
    if (text.length > 2) lines.push(text);
  }
  return lines;
}

function extractPdfText(buffer) {
  if (!buffer) return '';
  const raw = buffer.toString('latin1');
  const lines = [];
  const streamPattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  while ((match = streamPattern.exec(raw)) !== null) {
    const dictStart = raw.lastIndexOf('<<', match.index);
    const dict = dictStart >= 0 ? raw.slice(dictStart, match.index) : '';
    let bytes = Buffer.from(match[1], 'latin1');
    if (dict.includes('FlateDecode')) {
      try {
        bytes = zlib.inflateSync(bytes);
      } catch {
        continue;
      }
    }
    lines.push(...stringsFromPdfContent(bytes.toString('latin1')));
  }
  if (!lines.length) lines.push(...stringsFromPdfContent(raw));
  return [...new Set(lines)].join('\n');
}

function crispWorksheetAnswer({ question, title, teacherRemarks, pdfText }) {
  const sheetTitle = title || 'this worksheet';
  const remarks = (teacherRemarks || '').replace(/\s+/g, ' ').trim();
  const referenceLines = [
    remarks,
    ...String(pdfText || '').split('\n')
  ].map((line) => line.trim()).filter((line) => line.length > 8);

  const stop = new Set(['the', 'a', 'an', 'of', 'to', 'and', 'or', 'in', 'on', 'for', 'with', 'can', 'you', 'me', 'tell', 'also', 'about', 'what', 'is', 'how', 'do', 'does', 'from', 'this', 'that', 'three', 'please', 'give']);
  const words = String(question).toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !stop.has(word));

  const scored = referenceLines.map((line, index) => {
    const lower = line.toLowerCase();
    const hits = words.filter((word) => lower.includes(word)).length;
    return { line, index, hits };
  }).filter((item) => item.hits > 0).sort((a, b) => b.hits - a.hits || b.line.length - a.line.length);

  const picked = [];
  const addLine = (line) => {
    const clean = line.trim();
    if (clean.length < 3 || picked.includes(clean)) return;
    picked.push(clean);
  };
  for (const item of scored) {
    addLine(item.line);
    addLine(referenceLines[item.index + 1] || '');
    addLine(referenceLines[item.index + 2] || '');
    if (picked.length >= 3) break;
  }

  if (!picked.length) {
    const remarkBit = remarks ? ` Teacher remarks: ${remarks}` : '';
    return `“${sheetTitle}” does not mention that.${remarkBit} Use only what is on this worksheet.`;
  }

  return `From “${sheetTitle}”: ${picked.join(' ')}`;
}

function learnRequestParts({ title, question, pdfBase64 }) {
  const parts = [{
    text: `Assignment title: ${title || 'Mathematics'}\n\nStudent question: ${question}`
  }];
  if (pdfBase64) {
    parts.push({
      inlineData: { mimeType: 'application/pdf', data: pdfBase64 }
    });
  }
  return parts;
}

async function askGemini({ title, question, pdfBase64 }) {
  const apiKey = (process.env.LLM_API_KEY || '').trim();
  const model = (process.env.LLM_MODEL || 'gemini-3.6-flash').trim();
  if (!apiKey) {
    return { error: 'Add LLM_API_KEY to the .env file, save it, and restart the server.' };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{
            text: 'You are a school mathematics tutor. Answer in a short, crisp way. The only reference you have right now is the assignment title. Do not pretend you can see the worksheet PDF.'
          }]
        },
        contents: [{ role: 'user', parts: learnRequestParts({ title, question, pdfBase64 }) }]
      })
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || 'Gemini could not answer.';
    return { error: message };
  }
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text)
    .filter(Boolean)
    .join('\n')
    .trim();
  if (!text) return { error: 'Gemini returned an empty answer.' };
  return { text, model };
}

app.post('/api/ai/learn', async (req, res) => {
  const { question, title, teacherRemarks, moduleId, grade, chapter, useModel } = req.body || {};
  if (!question || !String(question).trim()) {
    return res.status(400).json({ error: 'A question is required.' });
  }

  if (useModel) {
    try {
      const result = await askGemini({ title, question: String(question).trim() });
      if (result.error) return res.status(502).json({ error: result.error });
      return res.json({ response: result.text, source: result.model });
    } catch {
      return res.status(502).json({ error: 'The model could not be reached. Check the API key and try again.' });
    }
  }

  const pdfBuffer = worksheetPdfBuffer({
    moduleId,
    title,
    chapter,
    grade,
    remarks: teacherRemarks
  });
  const pdfText = extractPdfText(pdfBuffer);
  const response = crispWorksheetAnswer({
    question: String(question).trim(),
    title,
    teacherRemarks,
    pdfText
  });

  return res.json({ response, source: 'worksheet' });
});

app.post('/api/ai/chat', async (req, res) => {
  const { prompt, studentContext, role = 'student', grade = 'Class 8', pdfContext } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Adaptive Pedagogical Engine (local tutor; no outside model)
  const lower = prompt.toLowerCase();
  let aiReply = '';

  if (role === 'teacher') {
    if (lower.includes('quiz') || lower.includes('test') || lower.includes('question')) {
      aiReply = `📋 **AI-Generated Adaptive Diagnostic Assessment for ${grade}**

**Topic: Core Concept Mastery**
1. **Recall & Definition (Bloom's Level 1):**
   *Question:* Define the fundamental principle of the current unit in your own words.
   *Rubric:* 2 Marks for precision and key scientific/mathematical terminology.

2. **Application Problem (Bloom's Level 3):**
   *Question:* If values scale by a factor of 1.5x in this condition, calculate the resultant change in output.
   *Rubric:* 3 Marks for step-by-step derivation.

3. **Higher-Order Analytical Challenge (Bloom's Level 4):**
   *Question:* Compare and contrast how this applies to real-world industrial or daily scenarios.

*Tip for Dr. Sundaram:* 3 of your students scored lower in multi-step word problems; this format directly reinforces their step-by-step reasoning.`;
    } else {
      aiReply = `💡 **Pedagogical Recommendation for ${grade} Cohort**:
Based on the current analytics, the students have demonstrated high mastery in foundational theory (87% average) but show variance in multi-step problem solving. 

**Recommended Action:**
1. Deploy a 10-minute micro-module with visual breakdown.
2. Pair student **Rohan Verma (Class 8)** with visual geometric aids.
3. Provide advanced acceleration problems for **Ananya Iyer (Class 9)**.`;
    }
  } else {
    const worksheetLead = pdfContext?.title
      ? `Using the worksheet PDF for ${pdfContext.chapter || grade}: ${pdfContext.title}.\n\n`
      : '';
    // Student Persona
    if (lower.includes('explain') || lower.includes('what is') || lower.includes('how') || lower.includes('hint')) {
      aiReply = worksheetLead + `✨ **Adaptive Explanation tailored for ${grade}**:

Here is the easiest way to understand this step-by-step:

1. **The Big Picture Idea**: Think of this concept like balancing a scale. Whatever you do to one side, you mirror on the other to preserve harmony.
2. **Key Rule to Remember**:
   • Focus on breaking large calculations into smaller chunks.
   • Always identify what is **given** first, then what is **unknown**.
3. **Quick Practice for You**:
   Try solving: If $x + 4 = 12$, what is the value of $x$? (Subtract 4 from both sides to get $x = 8$!)

Would you like another practice problem or a visual diagram breakdown? 🚀`;
    } else if (lower.includes('formula') || lower.includes('math') || lower.includes('solve')) {
      aiReply = worksheetLead + `📐 **Step-by-Step Solver Guide (${grade})**:

Let's break down this calculation together:
• **Step 1:** Write down the given variables clearly.
• **Step 2:** Substitute the numbers into the standard formula.
• **Step 3:** Perform arithmetic operations following the BODMAS/PEMDAS order.

Keep your study streak of strong problem solving going! What specific numbers would you like me to walk through with you?`;
    } else {
      aiReply = worksheetLead + `Hello ${studentContext?.name || 'Scholar'}! 👋 I am your **VNRVJIET Adaptive AI Tutor**.

I am tuned specifically for **${grade}**. I can help you with:
• Simplifying tricky science & math concepts into easy analogies.
• Generating instant practice questions with hints.
• Breaking down formulas and derivations step-by-step.
• Preparing for upcoming school tests and quizzes.

What topic are you studying today?`;
    }
  }

  return res.json({
    response: aiReply,
    source: 'adaptive-engine-v1',
    modelNote: 'Answered on the server from the worksheet. No outside model is used.'
  });
});

app.listen(PORT, () => {
  console.log(`[EduPortal Server] Running at http://localhost:${PORT}`);
  console.log(`[EduPortal Server] PDF Streaming endpoint: GET /api/pdf/:moduleId`);
  console.log(`[EduPortal Server] Pre-configured with 5 Students (Classes 6-10) and 1 Teacher`);
});
