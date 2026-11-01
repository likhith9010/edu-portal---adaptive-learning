import React from 'react';

export default function EduLogo({ className = "w-16 h-16", showText = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative flex flex-col items-center justify-center bg-white rounded-xl p-2 shadow-sm border border-slate-200 ${className}`}>
        {/* Modern clean educational emblem with geometric dots and book crest */}
        <svg viewBox="0 0 100 85" className="w-full h-auto text-blue-600 fill-current">
          {/* Top arc of learning stars */}
          <circle cx="20" cy="14" r="4.5" fill="#3b82f6" />
          <circle cx="35" cy="12" r="4.5" fill="#2563eb" />
          <circle cx="50" cy="10" r="5.5" fill="#1d4ed8" />
          <circle cx="65" cy="12" r="4.5" fill="#2563eb" />
          <circle cx="80" cy="14" r="4.5" fill="#3b82f6" />

          {/* Pillars of knowledge */}
          <circle cx="26" cy="26" r="4.5" fill="#60a5fa" />
          <circle cx="41" cy="24" r="4.5" fill="#3b82f6" />
          <circle cx="59" cy="24" r="4.5" fill="#3b82f6" />
          <circle cx="74" cy="26" r="4.5" fill="#60a5fa" />

          {/* Core foundation columns */}
          <circle cx="36" cy="38" r="4.5" fill="#2563eb" />
          <circle cx="36" cy="50" r="4.5" fill="#2563eb" />
          <circle cx="36" cy="62" r="4.5" fill="#1d4ed8" />

          <circle cx="64" cy="38" r="4.5" fill="#2563eb" />
          <circle cx="64" cy="50" r="4.5" fill="#2563eb" />
          <circle cx="64" cy="62" r="4.5" fill="#1d4ed8" />

          {/* Center flame of wisdom */}
          <circle cx="50" cy="38" r="4" fill="#f59e0b" />
          <circle cx="50" cy="50" r="4.5" fill="#ea580c" />
        </svg>

        {showText && (
          <div className="text-[7.5px] font-extrabold tracking-wider text-slate-800 text-center leading-tight mt-1 uppercase border-t border-slate-200 pt-0.5 w-full">
            ADAPTIVE ACADEMY
          </div>
        )}
      </div>
    </div>
  );
}
