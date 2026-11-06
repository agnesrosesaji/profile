'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';
import { Bell, CheckCheck, Sparkles, CheckCircle2, AlertCircle, FileText, ExternalLink } from 'lucide-react';

export default function NotificationDropdown() {
  const { notifications, unreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead, setSelectedItemId, setActivePage } = useCampus();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    if (notif.linkItemId) {
      setSelectedItemId(notif.linkItemId);
    } else {
      setActivePage('my-reports');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-[#282326] hover:text-[#681D35] hover:bg-black/5 transition-colors"
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#681D35] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-modal border border-[#E8E2DC] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-4 bg-[#F7F3EF] border-b border-[#E8E2DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#282326]">Campus Notifications</span>
              {unreadNotificationCount > 0 && (
                <span className="bg-[#681D35] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {unreadNotificationCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-[#681D35] font-semibold hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto divide-y divide-[#E8E2DC]/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-[#777078] text-sm">
                <Bell className="w-8 h-8 mx-auto text-[#777078]/40 mb-2" />
                <p>No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 hover:bg-[#F7F3EF]/70 transition-colors cursor-pointer flex gap-3 ${
                    !notif.read ? 'bg-[#FFF9F6]' : ''
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'match' && (
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}
                    {notif.type === 'claim_approved' && (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    {notif.type === 'claim_rejected' && (
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    )}
                    {(!notif.type || notif.type === 'report' || notif.type === 'claim_submitted' || notif.type === 'system') && (
                      <div className="w-8 h-8 rounded-full bg-[#681D35]/10 text-[#681D35] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-bold truncate ${!notif.read ? 'text-[#681D35]' : 'text-[#282326]'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-[#777078] shrink-0">{notif.date}</span>
                    </div>
                    <p className="text-xs text-[#777078] mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 bg-[#FAF8F5] text-center border-t border-[#E8E2DC]">
            <button
              onClick={() => {
                setActivePage('my-reports');
                setIsOpen(false);
              }}
              className="text-xs font-bold text-[#681D35] hover:underline"
            >
              View in My Reports Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

