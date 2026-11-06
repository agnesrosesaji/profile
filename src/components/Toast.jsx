'use client';

import React from 'react';
import { useCampus } from '../context/CampusContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCampus();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#282326] text-white shadow-2xl border border-white/10 text-sm font-medium animate-in slide-in-from-bottom-3 duration-200 max-w-md">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-amber-300 shrink-0" />}
      <span>{toast.message}</span>
    </div>
  );
}

