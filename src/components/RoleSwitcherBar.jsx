'use client';

import React from 'react';
import { useCampus, DEMO_USERS } from '../context/CampusContext';
import { ShieldCheck, User, Award, ShieldAlert } from 'lucide-react';

export default function RoleSwitcherBar() {
  const { currentUser, switchRole } = useCampus();

  return (
    <div className="bg-[#501528] text-white/90 text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white/80">Campus Identity Mode:</span>
          <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-white font-bold flex items-center gap-1.5">
            {currentUser.role === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />}
            {currentUser.role === 'staff' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />}
            {currentUser.role === 'student' && <User className="w-3.5 h-3.5 text-blue-300" />}
            <span>{currentUser.name} ({currentUser.role.toUpperCase()})</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-white/60 hidden sm:inline">Switch Role for Demo:</span>
          <button
            onClick={() => switchRole('student')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              currentUser.role === 'student'
                ? 'bg-white text-[#681D35] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Student (Alex)
          </button>
          <button
            onClick={() => switchRole('staff')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              currentUser.role === 'staff'
                ? 'bg-white text-[#681D35] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Staff (Security)
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              currentUser.role === 'admin'
                ? 'bg-white text-[#681D35] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Admin (Dean)
          </button>
        </div>
      </div>
    </div>
  );
}

