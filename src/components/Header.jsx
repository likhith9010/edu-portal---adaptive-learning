import React from 'react';
import { LogOut, User, ShieldCheck, GraduationCap } from 'lucide-react';
import EduLogo from './EduLogo';

export default function Header({ user, onLogout, onSwitchAccount }) {
  if (!user) return null;

  const isTeacher = user.role === 'teacher';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <EduLogo className="w-10 h-10 shadow-xs" showText={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">EduPortal</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Mathematics LMS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Secondary School Adaptive Learning Platform</p>
          </div>
        </div>

        {/* Right: User Profile & Actions (NO pictures, clean initials badge) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-800">{user.name}</span>
              {isTeacher ? (
                <span className="bg-emerald-50 text-emerald-700 text-[11px] px-2 py-0.5 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Maths Teacher
                </span>
              ) : (
                <span className="bg-blue-50 text-blue-700 text-[11px] px-2 py-0.5 rounded-full font-bold border border-blue-200 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-blue-600" /> {user.grade}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {isTeacher ? (
                <span>Faculty ID: <strong className="text-slate-800">{user.rollNo}</strong> (11-Digits)</span>
              ) : (
                <span>Roll No: <strong className="text-blue-700">{user.rollNo}</strong> (Joined {user.joiningYear})</span>
              )}
            </div>
          </div>

          {/* Clean Initials Badge (NO picture) */}
          <div className={`w-9 h-9 rounded-xl ${user.color || 'bg-blue-600'} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
            {user.initials || user.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <button
              onClick={onSwitchAccount}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-300 font-medium flex items-center gap-1.5 cursor-pointer"
              title="Switch demo account"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Switch</span>
            </button>
            <button
              onClick={onLogout}
              className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg transition-colors border border-rose-200 font-medium flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
