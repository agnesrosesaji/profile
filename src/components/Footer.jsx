'use client';

import React from 'react';
import { useCampus } from '../context/CampusContext';
import { Shield, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const { setActivePage } = useCampus();

  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#421021] text-white/90 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Central Purpose */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-serif tracking-tight">
                  CampusFind
                </span>
                <p className="text-[10px] text-white/60 tracking-wider uppercase font-semibold">
                  College Lost &amp; Found
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              "Every lost belonging deserves a way back home." A centralized, secure digital recovery platform designed exclusively for our university community.
            </p>

            <div className="pt-2 text-xs text-rose-200/80 font-medium flex items-center gap-1.5">
              <span>Managed by Campus Security &amp; Student Affairs</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-4">
              Campus Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('browse')} className="hover:text-white transition-colors">
                  Browse Found Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('report-lost')} className="hover:text-white transition-colors">
                  Submit Lost Belonging Report
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('report-found')} className="hover:text-white transition-colors">
                  Staff Found Item Registration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('my-reports')} className="hover:text-white transition-colors">
                  My Reports &amp; Claims Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Recovery Office & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-4">
              Physical Recovery Desk
            </h4>
            <ul className="space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span>
                  Administration Block, Room 102<br />
                  Central Campus Recovery Desk
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span>
                  Monday – Friday: 8:30 AM – 5:00 PM<br />
                  Saturday: 9:00 AM – 1:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-4">
              Security Assistance
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Desk Hotline: +1 (555) 234-CAMPUS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-300 shrink-0" />
                <span>lostandfound@college.edu</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 mt-3">
                <p className="text-[11px] text-white/70">
                  Valuable electronics, cash, and sensitive ID documents are transferred to the campus safe daily at 4:30 PM.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} CampusFind University Platform. All official rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Campus Honor Code
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Verification Guidelines
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
