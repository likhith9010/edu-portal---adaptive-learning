import React, { useState } from 'react';
import { User, Shield, Eye, EyeOff, Sparkles, GraduationCap, School, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import EduLogo from './EduLogo';
import { USERS_DATA } from '../data/mockUsers';

export default function LoginPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickFillNotification, setQuickFillNotification] = useState('');

  // Handle direct login submission
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    if (!rollNo.trim() || !password.trim()) {
      setError('Please enter both User Name/Roll Number and Password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNo: rollNo.trim(),
          password: password.trim(),
          role: activeTab
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.user);
        return;
      } else {
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend call fallback to client mock:', err);
    }

    // Client-side fallback authentication
    const user = USERS_DATA.find(u => 
      (u.rollNo.toLowerCase() === rollNo.trim().toLowerCase() || u.id.toLowerCase() === rollNo.trim().toLowerCase())
    );

    if (!user) {
      setError('No account found with this Roll Number/User ID.');
      setLoading(false);
      return;
    }

    if (user.password !== password.trim()) {
      setError('Incorrect password. Please verify and try again.');
      setLoading(false);
      return;
    }

    if (user.role !== activeTab) {
      setError(`This account is registered as a ${user.role.toUpperCase()}. Please switch tabs.`);
      setLoading(false);
      return;
    }

    setLoading(false);
    onLoginSuccess(user);
  };

  // Quick fill helper
  const handleQuickSelect = (credential) => {
    setActiveTab(credential.role);
    setRollNo(credential.rollNo);
    setPassword(credential.password);
    setError('');
    setQuickFillNotification(`Loaded credentials for ${credential.name} (${credential.grade || 'Maths Teacher'})`);
    setTimeout(() => setQuickFillNotification(''), 3000);
  };

  const students = USERS_DATA.filter(u => u.role === 'student');
  const teacher = USERS_DATA.find(u => u.role === 'teacher');

  return (
    <div className="relative min-h-[92vh] bg-slate-100/80 flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
      
      {/* Soft Light Theme Accents */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-blue-100/60 to-transparent pointer-events-none" />

      {/* Main Reference Login Card (Matching Screenshot Form & Layout) */}
      <div className="w-full max-w-[420px] bg-[#e2e5eb] text-slate-800 rounded-3xl p-7 shadow-xl border border-slate-300 relative z-10 transition-all duration-300">
        
        {/* Top Crest & Logo matching the Reference */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 transform hover:scale-105 transition-transform duration-200">
            <EduLogo className="w-16 h-16 shadow-sm" showText={true} />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
            EDUPORTAL
          </h1>
          <p className="text-slate-600 text-xs font-semibold tracking-wide mt-0.5">
            Secure workspace access
          </p>
        </div>

        {/* Portal Mode Switcher */}
        <div className="mt-5 p-1 bg-slate-300/80 rounded-xl flex items-center justify-between gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setError(''); }}
            className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-white text-blue-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Students (6th-10th)</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('teacher'); setError(''); }}
            className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-white text-blue-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Teacher Portal</span>
          </button>
        </div>

        {/* Status notification */}
        {quickFillNotification && (
          <div className="mt-3 py-1.5 px-3 bg-emerald-100 text-emerald-800 text-xs rounded-lg border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{quickFillNotification}</span>
          </div>
        )}

        {error && (
          <div className="mt-3 py-2 px-3 bg-rose-100 text-rose-800 text-xs rounded-lg border border-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* User Name / Roll No field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 tracking-tight">
              User Name {activeTab === 'student' ? '(Student Roll No)' : '(Faculty ID)'}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder={activeTab === 'student' ? "Enter your roll number (e.g. 240601)" : "Enter faculty ID (e.g. 20180940211)"}
                className="w-full bg-white text-slate-900 text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 shadow-inner font-medium placeholder:text-slate-400"
                required
              />
            </div>
            {activeTab === 'student' ? (
              <p className="text-[10px] text-slate-500 mt-1 pl-1">
                Tip: First 2 digits signify joining year (24, 23, 22, 21, 20).
              </p>
            ) : (
              <p className="text-[10px] text-slate-500 mt-1 pl-1">
                Teacher roll number has 11 digits: <strong>20180940211</strong>.
              </p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 tracking-tight">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Shield className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white text-slate-900 text-sm pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600 shadow-inner font-medium placeholder:text-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Log In Button - Reference Blue Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#2563eb] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-150 ease-in-out active:scale-[0.99] flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-75"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>

        {/* Option to login as a teacher below option to login as students */}
        <div className="mt-4 pt-3 border-t border-slate-300/80 text-center">
          {activeTab === 'student' ? (
            <button
              type="button"
              onClick={() => {
                setActiveTab('teacher');
                setRollNo('20180940211');
                setPassword('Teacher@2024');
                setError('');
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span>Faculty or Educator? Login as Teacher</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setRollNo('240601');
                setPassword('Aarav@2024');
                setError('');
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span>Student from Class 6th–10th? Login as Student</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {/* Forgot Password / Unlock Account */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setError('Password reset link has been dispatched to your institutional address.')}
              className="text-xs font-bold text-[#4c1d95] hover:text-[#3b0764] hover:underline cursor-pointer"
            >
              Forgot Password / Unlock Account
            </button>
          </div>
        </div>

      </div>

      {/* Powered by Doctus footer */}
      <div className="mt-4 text-center z-10">
        <p className="text-xs text-slate-500 font-medium">
          Powered by <span className="font-bold text-slate-700">Doctus</span>
        </p>
      </div>

      {/* Quick Demo Credentials Toolbar (Light Theme) */}
      <div className="mt-6 w-full max-w-4xl z-10 px-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Quick Test Credentials (1-Click Auto Fill)</span>
              </h2>
              <p className="text-xs text-slate-500">
                5 Indian students (Class 6th to 10th) with joining year roll numbers + 1 Mathematics teacher with 11-digit roll number.
              </p>
            </div>
            <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
              Format: YY + Class + No
            </span>
          </div>

          {/* Quick select buttons */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {students.map((std) => (
              <button
                key={std.id}
                type="button"
                onClick={() => handleQuickSelect(std)}
                className="bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl p-2.5 text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-mono">
                      {std.grade}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      Joined '{String(std.joiningYear).slice(2)}
                    </span>
                  </div>
                  <p className="font-bold text-xs text-slate-800 mt-1.5 group-hover:text-blue-700 truncate">
                    {std.name}
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200/70 text-[10px] font-mono text-slate-500">
                  <div>Roll: <strong className="text-slate-800">{std.rollNo}</strong></div>
                  <div>Pass: <span className="text-slate-600">{std.password}</span></div>
                </div>
              </button>
            ))}

            {/* Teacher Card */}
            {teacher && (
              <button
                type="button"
                onClick={() => handleQuickSelect(teacher)}
                className="bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 hover:border-emerald-300 rounded-xl p-2.5 text-left transition-all group flex flex-col justify-between col-span-2 sm:col-span-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">
                      Maths Teacher
                    </span>
                    <span className="text-[9px] text-emerald-700 font-bold">
                      11 Digits
                    </span>
                  </div>
                  <p className="font-bold text-xs text-emerald-900 mt-1.5 truncate">
                    {teacher.name}
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-emerald-200 text-[10px] font-mono text-emerald-700">
                  <div>Roll: <strong className="text-emerald-900">{teacher.rollNo}</strong></div>
                  <div>Pass: <span className="text-emerald-800">{teacher.password}</span></div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
