import React from 'react';

export default function VnrvjietLogo({ className = "w-16 h-16", showText = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative flex flex-col items-center justify-center bg-white rounded-lg p-2 shadow-sm border border-slate-200/60 ${className}`}>
        {/* Vignana Jyothi dot-matrix emblem replica matching reference */}
        <svg viewBox="0 0 100 85" className="w-full h-auto text-amber-500 fill-current">
          {/* Top row of dots */}
          <circle cx="20" cy="12" r="4.5" fill="#f59e0b" />
          <circle cx="35" cy="12" r="4.5" fill="#f59e0b" />
          <circle cx="50" cy="12" r="5" fill="#ea580c" />
          <circle cx="65" cy="12" r="4.5" fill="#f59e0b" />
          <circle cx="80" cy="12" r="4.5" fill="#f59e0b" />

          {/* Arch row */}
          <circle cx="26" cy="24" r="4.5" fill="#f59e0b" />
          <circle cx="41" cy="22" r="4.8" fill="#ea580c" />
          <circle cx="59" cy="22" r="4.8" fill="#ea580c" />
          <circle cx="74" cy="24" r="4.5" fill="#f59e0b" />

          {/* Center pillar left */}
          <circle cx="36" cy="36" r="4.5" fill="#f59e0b" />
          <circle cx="36" cy="48" r="4.5" fill="#f59e0b" />
          <circle cx="36" cy="60" r="4.5" fill="#f59e0b" />

          {/* Center pillar right */}
          <circle cx="64" cy="36" r="4.5" fill="#f59e0b" />
          <circle cx="64" cy="48" r="4.5" fill="#f59e0b" />
          <circle cx="64" cy="60" r="4.5" fill="#f59e0b" />

          {/* Inner flame / spark */}
          <circle cx="50" cy="38" r="3.5" fill="#ea580c" />
          <circle cx="50" cy="50" r="3.5" fill="#f59e0b" />
        </svg>

        {showText && (
          <div className="text-[7.5px] font-extrabold tracking-wider text-slate-800 text-center leading-tight mt-1 uppercase border-t border-slate-200 pt-0.5 w-full">
            Vignana Jyothi
          </div>
        )}
      </div>
    </div>
  );
}
