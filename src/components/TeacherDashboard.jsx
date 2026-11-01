import React, { useState, useRef } from 'react';
import { USERS_DATA } from '../data/mockUsers';
import { skillBand, skillBandClass } from '../data/elo';
import { 
  ShieldCheck, GraduationCap, Users, Plus, Upload, CheckCircle2, 
  Clock, ArrowRight, ArrowLeft, BookOpen, Trash2, Sparkles, 
  FileText, Check, HelpCircle, Download, MessageSquareQuote, Paperclip, X
} from 'lucide-react';

export default function TeacherDashboard({ 
  teacher, 
  mathModules, 
  ratings,
  onAddModule, 
  onDeleteModule, 
  onSwitchStudent 
}) {
  const grades = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  
  // Navigation views: 'classes-overview' | 'classroom-page' | 'assignment-page' | 'student-progress-page'
  const [currentView, setCurrentView] = useState('classes-overview');
  const [activeGrade, setActiveGrade] = useState("Class 6");
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newChapter, setNewChapter] = useState('');
  const [newRemarks, setNewRemarks] = useState('');
  const [attachedPdf, setAttachedPdf] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');

  // PDF Preview Modal
  const [previewPdf, setPreviewPdf] = useState(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfUploadStatus, setPdfUploadStatus] = useState('');

  const fileInputRef = useRef(null);

  // Active grade data
  const currentGradeModules = mathModules[activeGrade] || [];
  const completedCount = currentGradeModules.filter(m => m.completed).length;
  const totalCount = currentGradeModules.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Handle opening a classroom page
  const handleOpenClassroom = (grade) => {
    setActiveGrade(grade);
    setCurrentView('classroom-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle opening assignment page
  const handleOpenAssignment = (module) => {
    setActiveAssignment(module);
    setCurrentView('assignment-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle opening student progress page
  const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const clearAttachedPdf = () => {
    setAttachedPdf(null);
    setPdfUploadStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Keep the chosen PDF locally until the assignment is saved, then store it under the real module id.
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setAttachedPdf(null);
      setPdfUploadStatus('invalid');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setPdfUploadStatus('');
    setAttachedPdf({
      file,
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      uploadDate: 'Just now'
    });
  };

  // Handle module upload. A PDF is optional and is stored on the server under this assignment's id.
  const handleUploadModule = async (e) => {
    e?.preventDefault();
    if (!newTitle.trim() || !newChapter.trim() || pdfUploading) return;

    const moduleId = `m-${Date.now()}`;
    let pdfAttachment = null;

    if (attachedPdf?.file) {
      setPdfUploading(true);
      setPdfUploadStatus('');
      try {
        const base64 = await readFileAsBase64(attachedPdf.file);
        const res = await fetch('/api/pdf/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId,
            fileName: attachedPdf.fileName,
            base64
          })
        });
        if (!res.ok) {
          setPdfUploadStatus('error');
          setPdfUploading(false);
          return;
        }
        pdfAttachment = {
          fileName: attachedPdf.fileName,
          fileSize: attachedPdf.fileSize,
          uploadDate: 'Just now'
        };
      } catch {
        setPdfUploadStatus('error');
        setPdfUploading(false);
        return;
      }
      setPdfUploading(false);
    }

    const newModule = {
      id: moduleId,
      title: newTitle.trim(),
      chapter: newChapter.trim(),
      assignmentType: pdfAttachment ? "PDF Worksheet & Exercises" : "Practice Problems",
      description: newRemarks.trim() || "Review assigned problems and verify calculations carefully.",
      teacherRemarks: newRemarks.trim() || "Review assigned problems and verify calculations carefully.",
      completed: false,
      addedBy: teacher.name,
      dateAdded: "Just now",
      dueDate: "Upcoming",
      hasPdf: !!pdfAttachment,
      pdfAttachment,
      learningObjectives: [
        "Master the key concepts in " + newChapter.trim(),
        "Solve textbook exercises and worksheet problems"
      ],
      practiceProblems: [
        { q: "1. Practice Question for " + newTitle.trim(), ans: "Solve using standard theorems and formulas." }
      ]
    };

    onAddModule(activeGrade, newModule);

    setUploadSuccess(
      pdfAttachment
        ? `Successfully uploaded "${newTitle}" with PDF attachment to ${activeGrade} Classroom!`
        : `Successfully uploaded "${newTitle}" to ${activeGrade} Classroom!`
    );
    setNewTitle('');
    setNewChapter('');
    setNewRemarks('');
    clearAttachedPdf();
    setTimeout(() => setUploadSuccess(''), 4500);
  };

  // -------------------------------------------------------------
  // VIEW 1: ALL CLASSES OVERVIEW (Main Teacher Dashboard)
  // -------------------------------------------------------------
  if (currentView === 'classes-overview') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
        
        {/* Teacher Profile Banner (NO picture, clean initials badge, 11-digit Faculty ID) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-800 text-white font-black text-lg flex items-center justify-center shadow-xs">
              {teacher.initials || "PS"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{teacher.name}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Maths Lead Teacher
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{teacher.designation} &bull; {teacher.email}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                <span className="font-mono bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  Faculty Roll No: <strong className="text-emerald-700 font-bold">{teacher.rollNo}</strong> (11 Digits)
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-600">
                  Joining Year: <strong>{teacher.joiningYear}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:text-right">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Teaching Scope
              </span>
              <span className="text-sm font-bold text-slate-800">Mathematics (Classes 6–10)</span>
              <p className="text-xs text-slate-500 mt-0.5">5 Grade Classrooms</p>
            </div>
        </div>

        {/* Classes Grid: Click to open another page for each classroom */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Secondary Mathematics Classrooms
              </h2>
              <p className="text-xs text-slate-500">
                Click on any class to open its dedicated Classroom Page where you can upload modules, attach PDFs, and track students.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              5 Classes Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grades.map((grade) => {
              const gModules = mathModules[grade] || [];

              return (
                <div
                  key={grade}
                  onClick={() => handleOpenClassroom(grade)}
                  className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                        {grade}
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {gModules.length} Modules
                      </span>
                    </div>
                  </div>

                  {/* Open Classroom button */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span>Open {grade} Classroom Page</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: DEDICATED CLASSROOM PAGE (Opened after clicking a class)
  // -------------------------------------------------------------
  if (currentView === 'classroom-page') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
        
        {/* Navigation Bar: Back to All Classes */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => setCurrentView('classes-overview')}
            className="self-start text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Classes</span>
          </button>

          {/* Quick class switcher tabs */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl overflow-x-auto">
            {grades.map(g => (
              <button
                key={g}
                onClick={() => setActiveGrade(g)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeGrade === g 
                    ? 'bg-blue-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Classroom Header Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                {activeGrade}
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Mathematics Classroom Panel
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Upload assignments & PDF worksheets, enter Teacher Remarks, and inspect student progress.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-right">
            <div className="text-[11px] font-semibold text-blue-700">Assignments</div>
            <div className="text-xs font-bold text-slate-800">{totalCount} modules</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Students in {activeGrade}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USERS_DATA.filter((user) => user.role === 'student' && user.grade === activeGrade).map((student) => {
              const elo = Number.isFinite(Number(ratings?.[student.id])) ? Number(ratings[student.id]) : student.elo;
              const band = skillBand(elo);
              return (
                <div key={student.id} className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl ${student.color || 'bg-blue-600'} text-white font-black text-sm flex items-center justify-center shrink-0`}>
                    {student.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{student.name}</p>
                      {band && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${skillBandClass(band)}`}>
                          {band} · Elo {elo}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{student.email}</p>
                    <p className="text-[11px] font-mono text-slate-600 mt-1">
                      Roll {student.rollNo} · Joined {student.joiningYear}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Upload New Assignment / Module Form (WITH TABS FOR PDF UPLOAD) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          
          <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Upload New Assignment Module to {activeGrade}
                </h2>
                <p className="text-xs text-slate-500">
                  Uploaded modules immediately update the student's Mathematics syllabus.
                </p>
              </div>
            </div>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* ASSIGNMENT FORM (single clean form, no PDF tab) */}
          {(
            <form onSubmit={handleUploadModule} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chapter Code / Name
                  </label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="e.g. Chapter 9"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Algebraic Proofs & Practice Worksheet"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                </div>
              </div>

              {/* TEACHER REMARKS FIELD */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-blue-600" />
                  <span>Teacher Remarks & Guidance (Displayed to Student)</span>
                </label>
                <textarea
                  value={newRemarks}
                  onChange={(e) => setNewRemarks(e.target.value)}
                  placeholder="Enter your personalized teacher remarks, hints, key formulas to remember, and submission guidelines..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none"
                  required
                />
              </div>

              {/* Optional PDF attachment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                  <span>Attach PDF</span>
                  <span className="font-medium text-slate-400">(optional)</span>
                </label>
                <input
                  ref={fileInputRef}
                  id="assignment-pdf"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {!attachedPdf ? (
                  <label
                    htmlFor="assignment-pdf"
                    className="flex items-center justify-between gap-3 w-full bg-slate-50 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40 rounded-lg px-3 py-2.5 cursor-pointer transition-colors"
                  >
                    <span className="text-xs text-slate-500">Choose a PDF worksheet to include with this assignment</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-white border border-blue-200 px-2.5 py-1 rounded-lg shrink-0">Browse</span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{attachedPdf.fileName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{attachedPdf.fileSize}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearAttachedPdf}
                      className="w-7 h-7 rounded-lg bg-white border border-rose-200 text-slate-500 hover:text-rose-600 flex items-center justify-center shrink-0 cursor-pointer"
                      title="Remove PDF"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {pdfUploadStatus === 'invalid' && (
                  <p className="text-[11px] text-rose-600 mt-1.5">Please choose a PDF file.</p>
                )}
                {pdfUploadStatus === 'error' && (
                  <p className="text-[11px] text-rose-600 mt-1.5">The PDF could not be saved. The assignment was not created — try again.</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={pdfUploading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{pdfUploading ? 'Saving PDF…' : `Upload Assignment to ${activeGrade}`}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Section 3: List of Assignments (Clicking any opens its dedicated page!) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Active Assignments & Syllabus ({totalCount})
              </h2>
              <p className="text-xs text-slate-500">
                Click any assignment below to open its dedicated view with Teacher Remarks and practice questions.
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {completedCount} Completed &bull; {totalCount - completedCount} In Progress
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {currentGradeModules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => handleOpenAssignment(mod)}
                className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-2xs rounded-xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 mt-0.5">
                    {mod.chapter}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {mod.title}
                      </h3>
                      {(mod.pdfAttachment || mod.hasPdf) && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-rose-600" />
                          <span>PDF</span>
                        </span>
                      )}
                    </div>

                    {/* Teacher Remarks snippet */}
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed italic">
                      Remarks: "{mod.teacherRemarks || mod.description}"
                    </p>

                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                      <span>Type: <strong className="text-slate-600">{mod.assignmentType || 'Worksheet'}</strong></span>
                      <span>&bull;</span>
                      <span>Uploaded: {mod.dateAdded}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  {mod.completed ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> In Progress
                    </span>
                  )}

                  <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                    <span>View Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteModule(activeGrade, mod.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove assignment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: DEDICATED ASSIGNMENT DETAILS PAGE (Opened if assignment clicked)
  // -------------------------------------------------------------
  if (currentView === 'assignment-page' && activeAssignment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
        
        {/* Navigation Bar: Back to Classroom */}
        <button
          onClick={() => setCurrentView('classroom-page')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to {activeGrade} Classroom</span>
        </button>

        {/* Assignment Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {activeAssignment.chapter}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activeGrade} Mathematics
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                {activeAssignment.title}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Assigned by {activeAssignment.addedBy} &bull; Uploaded {activeAssignment.dateAdded}
              </p>
            </div>

            {/* Status indicator */}
            <div>
              {activeAssignment.completed ? (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Student Completed</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>In Progress</span>
                </span>
              )}
            </div>
          </div>

          {/* TEACHER REMARKS (Replaced instead of generic overview) */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4 text-blue-600" />
              <span>Teacher Remarks & Guidance (Dr. Priya Sundaram)</span>
            </h3>
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">
              <p className="font-medium text-slate-900">
                "{activeAssignment.teacherRemarks || activeAssignment.description}"
              </p>
            </div>
          </div>

          {/* Attached PDF Worksheet */}
          {(activeAssignment.pdfAttachment || activeAssignment.hasPdf) && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {activeAssignment.pdfAttachment?.fileName || `${activeAssignment.chapter}_Official_Worksheet.pdf`}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {activeAssignment.pdfAttachment?.fileSize || '2.1 MB'} &bull; Uploaded PDF Document
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPreviewPdf({
                  ...(activeAssignment.pdfAttachment || {
                    fileName: `${activeAssignment.chapter}_Official_Worksheet.pdf`,
                    fileSize: '2.1 MB'
                  }),
                  moduleId: activeAssignment.id,
                  title: activeAssignment.title,
                  chapter: activeAssignment.chapter,
                  remarks: activeAssignment.teacherRemarks || ''
                })}
                className="text-xs bg-white hover:bg-slate-100 text-blue-700 font-bold px-3.5 py-2 rounded-lg border border-slate-300 flex items-center gap-1.5 shadow-2xs cursor-pointer self-start sm:self-center"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>View / Download PDF</span>
              </button>
            </div>
          )}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-700">
              {activeAssignment.pdfAttachment ? 'Uploaded worksheet' : 'Worksheet preview'}
            </div>
            <iframe
              title={activeAssignment.pdfAttachment?.fileName || activeAssignment.title}
              src={`/api/pdf/${encodeURIComponent(activeAssignment.id)}?grade=${encodeURIComponent(activeGrade)}&title=${encodeURIComponent(activeAssignment.title)}&chapter=${encodeURIComponent(activeAssignment.chapter)}&remarks=${encodeURIComponent(activeAssignment.teacherRemarks || activeAssignment.description || '')}`}
              className="w-full h-[70vh] bg-white"
            />
          </div>

          {/* Learning Objectives */}
          {activeAssignment.learningObjectives && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Core Learning Objectives
              </h3>
              <ul className="space-y-1.5">
                {activeAssignment.learningObjectives.map((obj, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practice Problems Attached to this Assignment */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Worksheet Questions & Model Solutions
            </h3>
            
            <div className="space-y-3">
              {(activeAssignment.practiceProblems || [
                { q: "1. Solve standard practice problems from this chapter.", ans: "Verify step-by-step arithmetic." }
              ]).map((prob, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                  <p className="font-bold text-slate-900">{prob.q}</p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-emerald-700 text-[11px]">
                    <strong className="text-slate-600 font-sans">Answer / Key: </strong>
                    {prob.ans}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PDF Modal Viewer for Teacher */}
        {previewPdf && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-rose-600" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{previewPdf.fileName}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">{previewPdf.fileSize} &bull; PDF Attachment</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewPdf(null)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <iframe
                title={previewPdf.fileName || 'Assignment PDF'}
                src={`/api/pdf/${encodeURIComponent(previewPdf.moduleId)}?grade=${encodeURIComponent(activeGrade)}&title=${encodeURIComponent(previewPdf.title || '')}&chapter=${encodeURIComponent(previewPdf.chapter || '')}&remarks=${encodeURIComponent(previewPdf.remarks || '')}`}
                className="w-full h-[70vh] rounded-xl border border-slate-200 bg-slate-50"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setPreviewPdf(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 4: DEDICATED STUDENT PROGRESS PAGE (Opened if student clicked)
  // -------------------------------------------------------------
  if (currentView === 'student-progress-page' && activeStudent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
        
        {/* Navigation Bar: Back to Classroom */}
        <button
          onClick={() => setCurrentView('classroom-page')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to {activeGrade} Classroom</span>
        </button>

        {/* Student Banner (NO pictures, initials badge) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${activeStudent.color || 'bg-blue-600'} text-white font-black text-lg flex items-center justify-center shadow-xs`}>
              {activeStudent.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{activeStudent.name}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {activeStudent.grade}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeStudent.email}</p>
              
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  Roll No: <strong className="text-blue-700 font-bold">{activeStudent.rollNo}</strong>
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-600">
                  Joined: <strong>{activeStudent.joiningYear}</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSwitchStudent(activeStudent)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-center"
          >
            <span>Switch to {activeStudent.name}'s Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Course Progress Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Mathematics Course Completion Progress
              </h2>
              <p className="text-xs text-slate-500">
                Evaluation of modules assigned by Dr. Priya Sundaram
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-700">{progressPct}%</span>
              <div className="text-xs text-slate-500">{completedCount} of {totalCount} Modules Completed</div>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Module Checklist */}
          <div className="pt-3 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Module Status Breakdown
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {currentGradeModules.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => handleOpenAssignment(m)}
                  className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      {m.chapter}
                    </span>
                    <span className={m.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-bold'}>
                      {m.title}
                    </span>
                    {(m.pdfAttachment || m.hasPdf) && (
                      <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-bold">PDF</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {m.completed ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> In Progress
                      </span>
                    )}
                    <span className="text-slate-400 text-xs">View →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  }

  return null;
}
