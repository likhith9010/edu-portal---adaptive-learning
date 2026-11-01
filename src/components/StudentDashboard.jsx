import React, { useState, useEffect, useRef } from 'react';
import { class8Chapter } from '../data/class8Study';
import { class6Chapter } from '../data/class6Study';
import { applyEloEvents, selectByRating } from '../data/elo';
import { conceptFor } from '../data/conceptGraph';
import { 
  GraduationCap, BookOpen, CheckCircle2, Clock, Sparkles, Send, 
  BrainCircuit, ArrowRight, ArrowLeft, Check, FileText,
  MessageSquareQuote, ZoomIn, ZoomOut, Maximize2, Minimize2,
  RefreshCw, ExternalLink, AlertCircle, Loader2
} from 'lucide-react';

// ------------------------------------------------------------------
// PDF Viewer Panel - streams from backend, never uses local storage
// ------------------------------------------------------------------
function PdfViewerPanel({ moduleId, moduleTitle, grade, chapter, teacherRemarks }) {
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, [moduleId, reloadKey]);

  // Build the backend URL for streaming — query params pass context for generated PDF
  const pdfUrl = `/api/pdf/${encodeURIComponent(moduleId)}?grade=${encodeURIComponent(grade)}&title=${encodeURIComponent(moduleTitle)}&chapter=${encodeURIComponent(chapter)}&remarks=${encodeURIComponent(teacherRemarks || '')}`;

  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 60));
  const handleRefresh = () => {
    setLoaded(false);
    setError(false);
    setReloadKey((key) => key + 1);
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener');
  };

  const toggleFullscreen = () => {
    setFullscreen(f => !f);
  };

  return (
    <div
      ref={panelRef}
      className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
        fullscreen
          ? 'fixed inset-4 z-50 shadow-2xl'
          : 'h-full min-h-[520px]'
      }`}
    >
      {/* PDF Viewer Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-rose-600" />
          <span className="text-xs font-bold text-slate-800 truncate max-w-[160px]">{moduleTitle}</span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            LIVE PDF
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 60}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-bold text-slate-600 font-mono w-10 text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200 mx-1" />

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Reload PDF from server"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Open in New Tab */}
          <button
            onClick={handleOpenNewTab}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Open PDF in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {fullscreen && (
            <button
              onClick={toggleFullscreen}
              className="ml-1 text-xs font-bold text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Backend source badge */}
      <div className="px-4 py-1.5 bg-blue-50 border-b border-blue-100 flex items-center gap-1.5 shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-medium text-blue-700">
          Streamed from EduPortal backend · <span className="font-mono">GET /api/pdf/{moduleId}</span> · No local storage
        </span>
      </div>

      {/* PDF Embed Area */}
      <div className="relative flex-1 overflow-auto bg-slate-200">
        {/* Loading skeleton */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 z-10">
            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            <div className="text-xs font-semibold text-slate-600">Loading PDF from server…</div>
            <div className="text-[11px] text-slate-400 font-mono">{pdfUrl}</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 z-10 p-6">
            <AlertCircle className="w-8 h-8 text-amber-500" />
            <div className="text-sm font-bold text-slate-700">Could not load PDF</div>
            <div className="text-xs text-slate-500 text-center">
              Make sure the backend server is running on port 5000.
            </div>
            <button
              onClick={handleRefresh}
              className="mt-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
            <button
              onClick={handleOpenNewTab}
              className="text-xs font-semibold text-slate-600 underline cursor-pointer hover:text-slate-900"
            >
              Try opening directly in browser
            </button>
          </div>
        )}

        {/* Actual iframe — streams PDF from /api/pdf/:id, Content-Type: application/pdf */}
        <iframe
          ref={iframeRef}
          key={`${moduleId}-${reloadKey}`}
          src={`${pdfUrl}${pdfUrl.includes('?') ? '&' : '?'}v=${reloadKey}`}
          title={`PDF: ${moduleTitle}`}
          onLoad={() => { setLoaded(true); setError(false); }}
          onError={() => { setLoaded(true); setError(true); }}
          style={{
            width: `${zoom}%`,
            minWidth: '100%',
            height: '100%',
            minHeight: '480px',
            border: 'none',
            display: 'block',
            transformOrigin: 'top left',
          }}
          className="bg-white"
        />
      </div>
    </div>
  );
}

function formatTestTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function solvePlaceholders(mod) {
  return [
    {
      id: 's1',
      prompt: `State the main idea of “${mod.title}” in one sentence.`,
      level: 'Medium',
      fallbackHint: 'Use the teacher remarks and name the one rule this chapter keeps using.'
    },
    {
      id: 's2',
      prompt: `A quantity in ${mod.chapter} doubles. If the relationship is linear, what happens to the result?`,
      level: 'Medium',
      fallbackHint: 'A linear relationship scales the result by the same factor as the input.'
    },
    {
      id: 's3',
      prompt: 'What should you write before you calculate: the given values, the unknown, or the final number?',
      level: 'Easy',
      fallbackHint: 'Write what is given and what is unknown before you compute.'
    }
  ];
}

const TEST_PLACEHOLDERS = [
  {
    id: 't1',
    prompt: 'What should you identify before using a formula?',
    level: 'Easy',
    answer: 'The given values and the unknown',
    options: ['Only the final answer', 'The given values and the unknown', 'A random example', 'The page number']
  },
  {
    id: 't2',
    prompt: 'Which order matches a careful solution?',
    level: 'Medium',
    answer: 'Given, unknown, formula, then calculate',
    options: ['Answer, then the formula', 'Given, unknown, formula, then calculate', 'Calculate, then read the question', 'Skip the units']
  },
  {
    id: 't3',
    prompt: 'When a result looks unreasonable, what should you do first?',
    level: 'Medium',
    answer: 'Check the given values and the operation',
    options: ['Submit it anyway', 'Check the given values and the operation', 'Erase the worksheet', 'Change the chapter']
  }
];

function levelClass(level) {
  if (level === 'Easy') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (level === 'Hard') return 'bg-rose-50 text-rose-700 border-rose-200';
  if (level === 'Medium') return 'bg-amber-50 text-amber-800 border-amber-200';
  return '';
}

function studyFor(mod, student) {
  const chapter = class8Chapter(mod?.id) || class6Chapter(mod?.id);
  if (!chapter) {
    return { solve: solvePlaceholders(mod), test: TEST_PLACEHOLDERS, skillNote: '' };
  }
  const solve = selectByRating(chapter.solve, student?.elo);
  const test = selectByRating(chapter.test, student?.elo);
  return {
    solve,
    test,
    skillNote: `${solve.length} topics from this worksheet.`
  };
}

function StudyTabs({
  studyTab, setStudyTab, activeModule,
  learnQuery, setLearnQuery, learnReply, learnLoading, onLearnSearch,
  solveQuestions, skillNote, solveHints, hintLoadingId, onSolveHint,
  testQuestions, testStarted, testSubmitted, testSeconds, testAnswers, setTestAnswers,
  onStartTest, onSubmitTest, testScore
}) {
  const tabClass = (id) => `flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
    studyTab === id
      ? 'bg-white text-blue-700 shadow-sm font-bold'
      : 'text-slate-600 hover:text-slate-900'
  }`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="p-1 bg-slate-200/80 rounded-xl flex items-center gap-1 text-xs font-semibold">
          <button type="button" onClick={() => setStudyTab('learn')} className={tabClass('learn')}>
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learn</span>
          </button>
          <button type="button" onClick={() => setStudyTab('solve')} className={tabClass('solve')}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solve</span>
          </button>
          <button type="button" onClick={() => setStudyTab('test')} className={tabClass('test')}>
            <Clock className="w-3.5 h-3.5" />
            <span>Test</span>
          </button>
        </div>
      </div>

      <div className="p-5">
        {studyTab === 'learn' && (
          <form onSubmit={onLearnSearch} className="space-y-3">
            <p className="text-xs text-slate-500">
              Ask about this assignment. The server sends the title to Gemini 3.6 Flash.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={learnQuery}
                onChange={(e) => setLearnQuery(e.target.value)}
                placeholder={`Ask about ${activeModule.title}...`}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={learnLoading || !learnQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{learnLoading ? 'Asking…' : 'Ask'}</span>
              </button>
            </div>
            {learnReply && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {learnReply}
              </div>
            )}
          </form>
        )}

        {studyTab === 'solve' && (
          <div className="space-y-3">
            {skillNote && (
              <p className="text-xs text-slate-500">{skillNote}</p>
            )}
            {solveQuestions.map((question, index) => (
              <div key={question.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <button
                  type="button"
                  onClick={() => onSolveHint(question)}
                  disabled={hintLoadingId === question.id}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-60"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{hintLoadingId === question.id ? 'Getting hint…' : 'Take AI hint'}</span>
                </button>
                {(question.topic || question.level) && (
                  <div className="flex items-center gap-2">
                    {question.topic && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{question.topic}</p>
                    )}
                    {question.level && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${levelClass(question.level)}`}>{question.level}</span>
                    )}
                  </div>
                )}
                <p className="text-xs font-bold text-slate-900">{index + 1}. {question.prompt}</p>
                {solveHints[question.id] && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 whitespace-pre-line">
                    {solveHints[question.id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {studyTab === 'test' && (
          <div className="space-y-3">
            {!testStarted && !testSubmitted && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <p className="text-sm font-bold text-slate-900">Ready to take the test?</p>
                <p className="text-xs text-slate-600">
                  {testQuestions.length > 3
                    ? `This test has ${testQuestions.length} questions from the worksheet. You have 10 minutes. Click OK to start. Submitting marks this assignment complete.`
                    : 'This test is 10 minutes. Click OK to start. Submitting marks this assignment complete.'}
                </p>
                <button
                  type="button"
                  onClick={onStartTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  OK
                </button>
              </div>
            )}

            {testStarted && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {testQuestions.length > 3 ? `${testQuestions.length} questions` : 'Chapter test'}
                  </span>
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                    testSeconds === 0 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    {formatTestTime(testSeconds)}
                  </span>
                </div>
                {testQuestions.map((question, index) => (
                  <div key={question.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900">{index + 1}. {question.prompt}</p>
                      {question.level && (
                        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${levelClass(question.level)}`}>{question.level}</span>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      {question.options.map((option) => (
                        <label key={option} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={testAnswers[question.id] === option}
                            disabled={testSubmitted}
                            onChange={() => setTestAnswers((prev) => ({ ...prev, [question.id]: option }))}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {testSubmitted ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {testScore
                        ? `Test submitted. ${testScore.correct} right, ${testScore.wrong} wrong. This assignment is marked complete.`
                        : 'Test submitted. This assignment is marked complete.'}
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmitTest}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer"
                  >
                    Submit test
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// MAIN STUDENT DASHBOARD
// ------------------------------------------------------------------
export default function StudentDashboard({ student, mathModules, onToggleModuleCompletion, onRatingChange }) {
  const currentGradeModules = mathModules[student.grade] || [];
  
  const totalModules = currentGradeModules.length;
  const completedModules = currentGradeModules.filter(m => m.completed).length;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // View state
  const [currentView, setCurrentView] = useState('list');
  const [activeModule, setActiveModule] = useState(null);
  
  // AI doubt solver state
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Assignment study tabs: learn | solve | test
  const [studyTab, setStudyTab] = useState('learn');
  const [learnQuery, setLearnQuery] = useState('');
  const [learnReply, setLearnReply] = useState('');
  const [learnLoading, setLearnLoading] = useState(false);
  const [solveHints, setSolveHints] = useState({});
  const [hintLoadingId, setHintLoadingId] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testSeconds, setTestSeconds] = useState(10 * 60);
  const [testAnswers, setTestAnswers] = useState({});
  const [testScore, setTestScore] = useState(null);
  const [paperElo, setPaperElo] = useState(student?.elo);
  const testFinishedRef = useRef(false);
  const testAnswersRef = useRef({});
  const testQuestionsRef = useRef([]);
  const hintedRef = useRef({});
  const eloRef = useRef(student?.elo);
  const ratingQueue = useRef(Promise.resolve());

  useEffect(() => {
    testAnswersRef.current = testAnswers;
  }, [testAnswers]);

  useEffect(() => {
    eloRef.current = student?.elo;
  }, [student?.elo]);

  const recordEvents = (events) => {
    if (!events?.length || !student?.id) return;
    ratingQueue.current = ratingQueue.current.then(async () => {
      try {
        const res = await fetch('/api/elo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: student.id, events })
        });
        const data = await res.json();
        if (res.ok && Number.isFinite(Number(data.elo))) {
          eloRef.current = Number(data.elo);
          onRatingChange?.(student.id, Number(data.elo));
          return;
        }
      } catch {
        // The server keeps the saved rating. Fall back only when it cannot be reached.
      }
      const next = applyEloEvents(eloRef.current, events);
      eloRef.current = next;
      onRatingChange?.(student.id, next);
    }).catch(() => {});
  };

  const resetStudySession = () => {
    setStudyTab('learn');
    setLearnQuery('');
    setLearnReply('');
    setLearnLoading(false);
    setSolveHints({});
    setHintLoadingId(null);
    setTestStarted(false);
    setTestSubmitted(false);
    setTestSeconds(10 * 60);
    setTestAnswers({});
    setTestScore(null);
    testFinishedRef.current = false;
    hintedRef.current = {};
  };

  // Handle open assignment page
  const handleOpenAssignment = (mod) => {
    setPaperElo(student?.elo);
    setActiveModule(mod);
    resetStudySession();
    setCurrentView('assignment-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markAssignmentComplete = (mod) => {
    if (!mod || mod.completed) return;
    onToggleModuleCompletion(student.grade, mod.id);
    setActiveModule((prev) => (prev && prev.id === mod.id ? { ...prev, completed: true } : prev));
  };

  useEffect(() => {
    if (!testStarted || testSubmitted) return undefined;
    const timer = setInterval(() => {
      setTestSeconds((seconds) => (seconds <= 1 ? 0 : seconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const submitTestRef = useRef(() => {});
  submitTestRef.current = () => {
    if (testFinishedRef.current || !activeModule) return;
    testFinishedRef.current = true;
    const questions = testQuestionsRef.current || [];
    const answers = testAnswersRef.current || {};
    const events = [];
    let correct = 0;
    let wrong = 0;
    for (const question of questions) {
      if (!question?.answer) continue;
      const matched = answers[question.id] === question.answer;
      if (matched) correct += 1;
      else wrong += 1;
      events.push({
        level: question.level || 'Medium',
        outcome: matched ? 'correct' : 'wrong',
        concept: conceptFor(activeModule.id, question.id)
      });
    }
    setTestScore({ correct, wrong });
    setTestSubmitted(true);
    markAssignmentComplete(activeModule);
    recordEvents(events);
  };

  useEffect(() => {
    if (!testStarted || testSubmitted || testSeconds !== 0 || !activeModule) return;
    submitTestRef.current();
  }, [testStarted, testSubmitted, testSeconds, activeModule]);

  const handleAskAi = async (promptText) => {
    const query = promptText || aiQuery;
    if (!query.trim()) return;

    setAiLoading(true);
    setAiReply('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          role: 'student',
          grade: student.grade,
          studentContext: {
            name: student.name,
            rollNo: student.rollNo,
            grade: student.grade
          }
        })
      });
      const data = await res.json();
      setAiReply(data.response || 'Explanation generated.');
    } catch (err) {
      setAiReply(`✨ Step-by-Step Maths Guidance for ${student.grade}:\n1. Identify what variables and numbers are given.\n2. Apply the formula taught by Dr. Priya Sundaram.\n3. Verify your answer with step-by-step arithmetic.`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleLearnSearch = async (event) => {
    event?.preventDefault();
    if (!learnQuery.trim() || !activeModule || learnLoading) return;
    setLearnLoading(true);
    setLearnReply('');
    try {
      const res = await fetch('/api/ai/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: learnQuery.trim(),
          title: activeModule.title,
          useModel: true,
          teacherRemarks: activeModule.teacherRemarks || activeModule.description || '',
          moduleId: activeModule.id,
          grade: student.grade,
          chapter: activeModule.chapter,
          fileName: activeModule.pdfAttachment?.fileName || `${activeModule.id}.pdf`
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'The tutor could not answer.');
      setLearnReply(data.response || 'No answer returned.');
    } catch (err) {
      setLearnReply(err.message || `From “${activeModule.title}”: use the teacher remarks on this worksheet.`);
    } finally {
      setLearnLoading(false);
    }
  };

  const handleSolveHint = async (question) => {
    if (!activeModule || hintLoadingId) return;
    if (!hintedRef.current[question.id]) {
      hintedRef.current[question.id] = true;
      recordEvents([{
        level: question.level || 'Medium',
        outcome: 'hint',
        concept: conceptFor(activeModule.id, question.id)
      }]);
    }
    setHintLoadingId(question.id);
    try {
      const res = await fetch('/api/ai/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.prompt,
          title: activeModule.title,
          teacherRemarks: activeModule.teacherRemarks || activeModule.description || '',
          moduleId: activeModule.id,
          grade: student.grade,
          chapter: activeModule.chapter
        })
      });
      const data = await res.json();
      const hint = data.response || question.fallbackHint;
      setSolveHints((prev) => ({ ...prev, [question.id]: hint }));
    } catch {
      setSolveHints((prev) => ({ ...prev, [question.id]: question.fallbackHint }));
    } finally {
      setHintLoadingId(null);
    }
  };

  const finishTest = () => {
    submitTestRef.current();
  };

  // =================================================================
  // VIEW: ASSIGNMENT DETAIL PAGE (Two-column split with PDF on right)
  // =================================================================
  if (currentView === 'assignment-page' && activeModule) {
    const isCompleted = activeModule.completed;
    const studySession = studyFor(activeModule, { ...student, elo: paperElo });
    testQuestionsRef.current = studySession.test;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4 animate-fadeIn">
        {/* Navigation Bar */}
        <button
          onClick={() => setCurrentView('list')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to All Modules</span>
        </button>

        {/* Assignment Header Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {activeModule.chapter}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {student.grade} Mathematics
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              {activeModule.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated by {activeModule.addedBy} · Uploaded {activeModule.dateAdded}
            </p>
          </div>

          {/* Mark Complete Button */}
          <button
            onClick={() => {
              onToggleModuleCompletion(student.grade, activeModule.id);
              setActiveModule(prev => ({ ...prev, completed: !prev.completed }));
            }}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
              isCompleted 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isCompleted ? 'Completed ✓ (Click to Undo)' : 'Mark as Completed'}</span>
          </button>
        </div>

        {/* Two-Column Split Layout: Details Left, PDF Viewer Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          
          {/* ── LEFT COLUMN: Assignment Details ── */}
          <div className="space-y-4">

            {/* Teacher Remarks */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-4 h-4 text-blue-600" />
                  <span>Teacher Remarks & Guidance</span>
                </h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
                  Dr. Priya Sundaram
                </span>
              </div>
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">
                <p className="font-medium text-slate-900">
                  "{activeModule.teacherRemarks || activeModule.description || 'Focus on solving problems step-by-step and write formulas clearly.'}"
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            {activeModule.learningObjectives && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  What You Will Learn
                </h3>
                <ul className="space-y-2">
                  {activeModule.learningObjectives.map((obj, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <StudyTabs
              studyTab={studyTab}
              setStudyTab={setStudyTab}
              activeModule={activeModule}
              learnQuery={learnQuery}
              setLearnQuery={setLearnQuery}
              learnReply={learnReply}
              learnLoading={learnLoading}
              onLearnSearch={handleLearnSearch}
              solveQuestions={studySession.solve}
              skillNote={studySession.skillNote}
              solveHints={solveHints}
              hintLoadingId={hintLoadingId}
              onSolveHint={handleSolveHint}
              testQuestions={studySession.test}
              testStarted={testStarted}
              testSubmitted={testSubmitted}
              testSeconds={testSeconds}
              testAnswers={testAnswers}
              setTestAnswers={setTestAnswers}
              onStartTest={() => setTestStarted(true)}
              onSubmitTest={finishTest}
              testScore={testScore}
            />
          </div>

          {/* ── RIGHT COLUMN: PDF Viewer ── */}
          <div className="flex flex-col gap-3">
            {/* PDF Viewer Component — streams from backend, no local storage */}
            <PdfViewerPanel
              moduleId={activeModule.id}
              moduleTitle={activeModule.title}
              grade={student.grade}
              chapter={activeModule.chapter}
              teacherRemarks={activeModule.teacherRemarks || activeModule.description}
            />
          </div>
        </div>
      </div>
    );
  }

  // =================================================================
  // VIEW: MAIN MODULE LIST
  // =================================================================
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
      
      {/* 1. Student Identity Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl ${student.color || 'bg-blue-600'} text-white font-black text-lg flex items-center justify-center shadow-sm`}>
            {student.initials || "ST"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{student.name}</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {student.grade}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{student.email}</p>
            
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                Roll No: <strong className="text-blue-700 font-bold">{student.rollNo}</strong>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">
                Year of Joining: <strong>{student.joiningYear}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Maths Teacher Tag */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 sm:text-right">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
            Subject & Teacher
          </span>
          <span className="text-sm font-bold text-slate-800">Mathematics</span>
          <p className="text-xs text-slate-500 mt-0.5">Teacher: Dr. Priya Sundaram</p>
        </div>
      </div>

      {/* 2. Progress Tab */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Mathematics Syllabus Progress</span>
            </h2>
            <p className="text-xs text-slate-500">
              Only showing modules curated by your Maths teacher for {student.grade}.
            </p>
          </div>

          {/* Progress Badge */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
            <span className="text-2xl font-black">{progressPercentage}%</span>
            <div className="text-left border-l border-blue-400 pl-3">
              <div className="text-xs font-medium text-blue-100">Progress</div>
              <div className="text-sm font-bold">{completedModules} / {totalModules} Modules</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Overall Course Completion</span>
            <span>{completedModules} of {totalModules} completed ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

      </div>

      {/* 3. Modules List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Modules Uploaded by Teacher ({totalModules})
            </h2>
            <p className="text-xs text-slate-500">
              Click any module to open its dedicated page with Teacher Remarks and PDF worksheet.
            </p>
          </div>

          <button
            onClick={() => setShowAiHelper(prev => !prev)}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>{showAiHelper ? 'Close AI Doubt Solver' : 'Ask AI Doubt Solver'}</span>
          </button>
        </div>

        {/* AI Helper Accordion (on list view) */}
        {showAiHelper && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Mathematics Assistant for {student.grade}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">LLM Enabled</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAskAi(); }}
                placeholder={`Ask any question from your ${student.grade} Mathematics chapters...`}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAskAi()}
                disabled={aiLoading || !aiQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </button>
            </div>

            {aiLoading && (
              <div className="text-xs text-blue-600 font-medium flex items-center gap-2 py-1">
                <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Generating step-by-step mathematical explanation...</span>
              </div>
            )}

            {aiReply && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 whitespace-pre-line leading-relaxed shadow-sm">
                {aiReply}
              </div>
            )}
          </div>
        )}

        {/* Modules List */}
        <div className="divide-y divide-slate-100">
          {currentGradeModules.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => handleOpenAssignment(mod)}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50/80 px-3 rounded-xl cursor-pointer group border border-transparent hover:border-slate-200"
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Book icon */}
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">
                      {mod.chapter}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {mod.title}
                    </h3>
                    {mod.completed ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>In Progress</span>
                      </span>
                    )}

                    {/* All modules show PDF badge since we generate on backend */}
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-rose-600" />
                      <span>PDF Available</span>
                    </span>
                  </div>

                  {/* Teacher Remarks Preview */}
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed italic">
                    Teacher Remarks: "{mod.teacherRemarks || mod.description}"
                  </p>

                  <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-2">
                    <span>Uploaded by {mod.addedBy}</span>
                    <span>•</span>
                    <span>{mod.dateAdded}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">Click to open with PDF viewer</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pl-11 sm:pl-0">
                <button
                  type="button"
                  className="bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-blue-200 group-hover:border-blue-600 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Open + View PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
