'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import NotificationDropdown from './NotificationDropdown';
import { Shield, Search, PlusCircle, AlertCircle, FileText, LayoutDashboard, Menu, X, LogIn, UserCheck } from 'lucide-react';

export default function Navbar() {
  const { activePage, setActivePage, currentUser } = useCampus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Found Items' },
    { id: 'report-lost', label: 'Report Lost Item' },
    { id: 'report-found', label: 'Report Found Item', staffOnly: true },
    { id: 'my-reports', label: 'My Reports' },
  ];

  if (currentUser.role === 'admin' || currentUser.role === 'staff') {
    navItems.push({ id: 'admin', label: 'Admin Dashboard', adminOnly: true });
  }

  const handleNav = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E2DC] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group focus-visible:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#681D35] to-[#8C4058] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#681D35] font-serif">
                CampusFind
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#681D35]/10 text-[#681D35]">
                Official
              </span>
            </div>
            <p className="text-[11px] text-[#777078] font-medium tracking-wide">
              University Lost &amp; Found Portal
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="CampusFind Navigation">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-[#681D35] bg-[#F7F3EF]'
                    : 'text-[#282326] hover:text-[#681D35] hover:bg-[#F7F3EF]/60'
                }`}
              >
                <span>{item.label}</span>
                {item.staffOnly && (
                  <span className="ml-1.5 text-[9px] font-extrabold bg-[#8C4058]/15 text-[#681D35] px-1.5 py-0.5 rounded">
                    Staff
                  </span>
                )}
                {item.adminOnly && (
                  <span className="ml-1.5 text-[9px] font-extrabold bg-[#681D35] text-white px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#681D35] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Quick CTA: Report Lost button */}
          <button
            onClick={() => handleNav('report-lost')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Lost</span>
          </button>

          {/* User Profile Pill */}
          <button
            onClick={() => handleNav('my-reports')}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-[#E8E2DC] hover:border-[#681D35] bg-[#FAF8F5] transition-colors"
            title="View My Profile & Reports"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#282326] leading-tight truncate max-w-[100px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#777078] capitalize font-medium">
                {currentUser.role}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#282326] hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E2DC] px-5 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-left ${
                  activePage === item.id
                    ? 'bg-[#F7F3EF] text-[#681D35]'
                    : 'text-[#282326] hover:bg-[#F7F3EF]/50'
                }`}
              >
                <span>{item.label}</span>
                {item.staffOnly && (
                  <span className="text-[10px] font-bold bg-[#8C4058]/15 text-[#681D35] px-2 py-0.5 rounded">
                    Staff
                  </span>
                )}
                {item.adminOnly && (
                  <span className="text-[10px] font-bold bg-[#681D35] text-white px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-[#E8E2DC] mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNav('report-lost')}
                className="w-full py-3 rounded-xl bg-[#681D35] text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>I Lost Something</span>
              </button>
              <button
                onClick={() => handleNav('report-found')}
                className="w-full py-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2DC] text-[#681D35] font-bold text-sm flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Register a Found Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
