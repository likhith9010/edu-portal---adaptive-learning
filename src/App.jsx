import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import { USERS_DATA, INITIAL_MATH_MODULES } from './data/mockUsers';
import { Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);
  const [ratings, setRatings] = useState({});
  const ratingsRef = useRef({});
  
  // Shared Mathematics modules state across teacher and students
  const [mathModules, setMathModules] = useState(INITIAL_MATH_MODULES);

  useEffect(() => {
    ratingsRef.current = ratings;
  }, [ratings]);

  useEffect(() => {
    fetch('/api/elo')
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) setRatings(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCurrentUser((prev) => {
      if (!prev || prev.role !== 'student') return prev;
      const saved = ratings[prev.id];
      if (!Number.isFinite(Number(saved)) || Number(saved) === Number(prev.elo)) return prev;
      return { ...prev, elo: Number(saved) };
    });
  }, [ratings]);

  const withSavedElo = (user) => {
    if (!user || user.role !== 'student') return user;
    const saved = ratingsRef.current[user.id];
    return Number.isFinite(Number(saved)) ? { ...user, elo: Number(saved) } : user;
  };

  useEffect(() => {
    fetch('/api/modules')
      .then((res) => (res.ok ? res.json() : {}))
      .then((added) => {
        if (!added || typeof added !== 'object') return;
        setMathModules((prev) => {
          const next = { ...prev };
          for (const [grade, modules] of Object.entries(added)) {
            const known = new Set((next[grade] || []).map((mod) => mod.id));
            const extra = (Array.isArray(modules) ? modules : []).filter((mod) => mod?.id && !known.has(mod.id));
            if (extra.length) next[grade] = [...(next[grade] || []), ...extra];
          }
          return next;
        });
      })
      .catch(() => {});
  }, []);

  const handleLoginSuccess = (user) => {
    const local = USERS_DATA.find((item) => item.id === user?.id || item.rollNo === user?.rollNo);
    if (!local) {
      setCurrentUser(withSavedElo(user));
    } else {
      const { password, ...profile } = local;
      setCurrentUser(withSavedElo({ ...user, ...profile }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRatingChange = (userId, elo) => {
    if (!userId || !Number.isFinite(Number(elo))) return;
    setRatings((prev) => ({ ...prev, [userId]: Number(elo) }));
  };

  const handleSwitchAccount = (user) => {
    setCurrentUser(withSavedElo(user));
    setShowQuickSwitcher(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle completion of a module (accessible by student or teacher)
  const handleToggleModuleCompletion = (grade, moduleId) => {
    setMathModules(prev => {
      const currentList = prev[grade] || [];
      const updatedList = currentList.map(mod => {
        if (mod.id === moduleId) {
          return { ...mod, completed: !mod.completed };
        }
        return mod;
      });
      return { ...prev, [grade]: updatedList };
    });
  };

  // Teacher adds new module to a grade
  const handleAddModule = (grade, newModule) => {
    setMathModules(prev => ({
      ...prev,
      [grade]: [...(prev[grade] || []), newModule]
    }));
    fetch('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade, module: newModule })
    }).catch(() => {});
  };

  // Teacher deletes a module from a grade
  const handleDeleteModule = (grade, moduleId) => {
    setMathModules(prev => ({
      ...prev,
      [grade]: (prev[grade] || []).filter(m => m.id !== moduleId)
    }));
    fetch('/api/modules/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade, moduleId })
    }).catch(() => {});
  };

  const students = USERS_DATA.filter(u => u.role === 'student');
  const teacher = USERS_DATA.find(u => u.role === 'teacher');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Persistent Light Theme Header when logged in */}
      {currentUser && (
        <Header 
          user={currentUser} 
          onLogout={handleLogout} 
          onSwitchAccount={() => setShowQuickSwitcher(prev => !prev)}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 pb-20">
        {!currentUser ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : currentUser.role === 'teacher' ? (
          <TeacherDashboard 
            teacher={currentUser}
            mathModules={mathModules}
            ratings={ratings}
            onAddModule={handleAddModule}
            onDeleteModule={handleDeleteModule}
            onSwitchStudent={(student) => handleSwitchAccount(student)}
          />
        ) : (
          <StudentDashboard 
            student={currentUser} 
            mathModules={mathModules}
            onToggleModuleCompletion={handleToggleModuleCompletion}
            onRatingChange={handleRatingChange}
          />
        )}
      </main>

      {/* Floating Demo Switcher Toolbar when Logged In (Light Theme) */}
      {currentUser && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full px-4">
          <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-2.5 shadow-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-500 hidden sm:inline">Active:</span>
              <strong className="text-slate-800 truncate max-w-[120px]">{currentUser.name}</strong>
              <span className="font-mono text-blue-700 text-[11px] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                {currentUser.rollNo}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSwitchAccount(s)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap cursor-pointer ${
                    currentUser.id === s.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={`${s.name} (${s.grade})`}
                >
                  {s.grade.replace('Class ', 'C')}
                </button>
              ))}

              {teacher && (
                <button
                  onClick={() => handleSwitchAccount(teacher)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    currentUser.id === teacher.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                  title={`${teacher.name} (Maths Teacher - 11 Digits)`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Teacher</span>
                </button>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>EduPortal &bull; Mathematics Adaptive Learning System &bull; Powered by Doctus</p>
      </footer>

    </div>
  );
}
