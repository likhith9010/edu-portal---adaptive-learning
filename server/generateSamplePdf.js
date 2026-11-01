/**
 * Generates a minimal valid sample PDF in memory for a given module.
 * This is a pure-JS PDF builder (no dependencies) that produces a real, viewable PDF
 * with chapter title, teacher remarks, and practice questions.
 * Used as a fallback when no real PDF file exists for a module.
 */
export function generateSamplePdf(moduleInfo = {}) {
  const {
    title = 'Mathematics Worksheet',
    chapter = 'Chapter',
    grade = 'Class',
    teacherName = 'Dr. Priya Sundaram',
    teacherRemarks = 'Complete all problems carefully and show your working.',
    practiceProblems = [
      { q: '1. Solve the given problem step by step.', ans: 'Apply the standard formula and verify.' }
    ]
  } = moduleInfo;

  // Build content lines
  const lines = [];
  lines.push(`MATHEMATICS WORKSHEET`);
  lines.push(`${grade} - ${chapter}: ${title}`);
  lines.push(`Teacher: ${teacherName}`);
  lines.push(``);
  lines.push(`TEACHER REMARKS & GUIDANCE:`);
  lines.push(teacherRemarks);
  lines.push(``);
  lines.push(`PRACTICE PROBLEMS:`);
  practiceProblems.forEach((p, i) => {
    lines.push(`${p.q}`);
    lines.push(`Answer: ${p.ans}`);
    lines.push(``);
  });
  lines.push(`---`);
  lines.push(`EduPortal Adaptive Learning System | Powered by Doctus`);

  // Build a minimal PDF structure
  const objects = [];
  let oid = 1;

  const getOid = () => oid++;

  // Helper to escape PDF string
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  // Catalog
  const catalogId = getOid();
  const pagesId = getOid();
  const pageId = getOid();
  const contentId = getOid();
  const fontId = getOid();

  // Build page content stream
  const fontSize = 11;
  const margin = 50;
  const pageWidth = 595;
  const pageHeight = 842;
  const lineHeight = 18;
  let y = pageHeight - margin;
  
  let streamLines = [];
  streamLines.push('BT');
  streamLines.push('0 0 0 rg');

  const drawLine = (text, size) => {
    const safe = esc(String(text).replace(/[^\x20-\x7E]/g, ' ').substring(0, 90));
    streamLines.push(`/F1 ${size} Tf`);
    // Tm sets an absolute position. Td would stack offsets and push later lines off the page.
    streamLines.push(`1 0 0 1 ${margin} ${y} Tm`);
    streamLines.push(`(${safe}) Tj`);
  };

  drawLine(lines[0], 14);
  y -= 22;
  drawLine(lines[1], 12);
  y -= lineHeight;

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (y < margin + 40) break;
    const isSectionHeader = line.endsWith(':') && line !== '---';
    if (isSectionHeader) y -= 4;
    drawLine(line, isSectionHeader ? 11 : fontSize);
    y -= lineHeight;
  }

  streamLines.push('ET');
  const contentStream = streamLines.join('\n');

  // Build PDF objects
  const objStrings = {};
  
  objStrings[catalogId] = `${catalogId} 0 obj\n<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj`;
  objStrings[pagesId] = `${pagesId} 0 obj\n<< /Type /Pages /Kids [${pageId} 0 R] /Count 1 >>\nendobj`;
  objStrings[fontId] = `${fontId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj`;
  objStrings[contentId] = `${contentId} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj`;
  objStrings[pageId] = `${pageId} 0 obj\n<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>\nendobj`;

  // Assemble PDF
  const header = `%PDF-1.4\n`;
  let body = header;
  const offsets = {};
  
  // Write objects in order
  const orderedIds = [catalogId, pagesId, fontId, contentId, pageId];
  for (const id of orderedIds) {
    offsets[id] = body.length;
    body += objStrings[id] + '\n';
  }
  
  // Cross-reference table
  const xrefOffset = body.length;
  const totalObjs = oid;
  let xref = `xref\n0 ${totalObjs}\n`;
  xref += `0000000000 65535 f \n`;
  
  for (let i = 1; i < totalObjs; i++) {
    const off = offsets[i];
    if (off !== undefined) {
      xref += `${String(off).padStart(10, '0')} 00000 n \n`;
    } else {
      xref += `0000000000 65535 f \n`;
    }
  }

  body += xref;
  body += `trailer\n<< /Size ${totalObjs} /Root ${catalogId} 0 R >>\n`;
  body += `startxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(body, 'latin1');
}

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const PAGE_MARGIN = 48;

function pdfEscape(value) {
  return String(value)
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

export function wrapPdfText(text, width = 92) {
  const words = String(text).replace(/[^\x20-\x7E]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return [''];
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= width) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word.length > width ? word.slice(0, width) : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function blocksForChapter(chapter) {
  const blocks = [
    { text: 'MATHEMATICS WORKSHEET', size: 16, font: 'F2', gap: 16 },
    { text: `${chapter.grade}   |   ${chapter.chapter}`, size: 11, font: 'F1', gap: 14 },
    { text: chapter.title, size: 13, font: 'F2', gap: 16 },
    { text: 'Teacher: Dr. Priya Sundaram', size: 10, font: 'F1', gap: 14 },
    { text: chapter.remarks, size: 10, font: 'F1', gap: 18 }
  ];

  for (const section of chapter.sections) {
    blocks.push({ text: section.heading, size: 12, font: 'F2', gap: 16 });
    for (const paragraph of section.paragraphs || []) {
      for (const line of wrapPdfText(paragraph, 84)) {
        blocks.push({ text: line, size: 11, font: 'F1', gap: 16 });
      }
      blocks.push({ text: '', size: 11, font: 'F1', gap: 8 });
    }
    for (const step of section.steps || []) {
      for (const line of wrapPdfText(step, 84)) {
        blocks.push({ text: line, size: 11, font: 'F1', gap: 16 });
      }
    }
    if (section.steps?.length) blocks.push({ text: '', size: 11, font: 'F1', gap: 8 });
    for (const question of section.questions || []) {
      for (const line of wrapPdfText(question, 84)) {
        blocks.push({ text: line, size: 11, font: 'F1', gap: 16 });
      }
      blocks.push({ text: '', size: 11, font: 'F1', gap: 6 });
    }
  }

  blocks.push({ text: 'EduPortal Adaptive Learning  |  Class 8 Mathematics', size: 9, font: 'F1', gap: 12 });
  return blocks;
}

export function generatePagedPdf(blocks) {
  const pages = [];
  let commands = [];
  let y = PAGE_HEIGHT - PAGE_MARGIN;

  const newPage = () => {
    if (commands.length) pages.push(commands);
    commands = [];
    y = PAGE_HEIGHT - PAGE_MARGIN;
  };

  for (const block of blocks) {
    const gap = block.gap || 14;
    if (y - gap < PAGE_MARGIN + 24) newPage();
    if (block.text) {
      commands.push(`/${block.font || 'F1'} ${block.size || 10} Tf`);
      commands.push(`1 0 0 1 ${PAGE_MARGIN} ${y} Tm`);
      commands.push(`(${pdfEscape(block.text)}) Tj`);
    }
    y -= gap;
  }
  if (commands.length) pages.push(commands);

  const pageCount = pages.length;
  const streams = pages.map((pageCommands, index) => {
    const footer = [
      '/F1 9 Tf',
      `1 0 0 1 ${PAGE_MARGIN} 32 Tm`,
      `(${pdfEscape(`Page ${index + 1} of ${pageCount}`)}) Tj`
    ];
    return ['BT', '0 0 0 rg', ...pageCommands, ...footer, 'ET'].join('\n');
  });

  let nextId = 1;
  const catalogId = nextId++;
  const pagesId = nextId++;
  const fontId = nextId++;
  const boldId = nextId++;
  const contentIds = streams.map(() => nextId++);
  const pageIds = streams.map(() => nextId++);

  const objects = {
    [catalogId]: `${catalogId} 0 obj\n<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj`,
    [pagesId]: `${pagesId} 0 obj\n<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageCount} >>\nendobj`,
    [fontId]: `${fontId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj`,
    [boldId]: `${boldId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj`
  };

  streams.forEach((stream, index) => {
    const contentId = contentIds[index];
    const pageId = pageIds[index];
    objects[contentId] = `${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`;
    objects[pageId] = `${pageId} 0 obj\n<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldId} 0 R >> >> >>\nendobj`;
  });

  const header = '%PDF-1.4\n';
  let body = header;
  const offsets = {};
  for (let id = 1; id < nextId; id++) {
    offsets[id] = body.length;
    body += `${objects[id]}\n`;
  }

  const xrefOffset = body.length;
  let xref = `xref\n0 ${nextId}\n`;
  xref += '0000000000 65535 f \n';
  for (let id = 1; id < nextId; id++) {
    xref += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  body += xref;
  body += `trailer\n<< /Size ${nextId} /Root ${catalogId} 0 R >>\n`;
  body += `startxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(body, 'latin1');
}
