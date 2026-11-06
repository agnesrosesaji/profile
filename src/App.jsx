'use client';

import React from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import RoleSwitcherBar from './components/RoleSwitcherBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ItemDetailModal from './components/ItemDetailModal';
import ClaimModal from './components/ClaimModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import BrowseFoundPage from './pages/BrowseFoundPage';
import ReportLostPage from './pages/ReportLostPage';
import ReportFoundPage from './pages/ReportFoundPage';
import MyReportsPage from './pages/MyReportsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AppContent() {
  const { activePage } = useCampus();

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-[#282326] flex flex-col font-sans selection:bg-[#681D35]/15 selection:text-[#681D35]">
      {/* 1. Campus Identity Demo Switcher */}
      <RoleSwitcherBar />

      {/* 2. Official Campus Navigation */}
      <Navbar />

      {/* 3. Page Router View */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'browse' && <BrowseFoundPage />}
        {activePage === 'report-lost' && <ReportLostPage />}
        {activePage === 'report-found' && <ReportFoundPage />}
        {activePage === 'my-reports' && <MyReportsPage />}
        {activePage === 'admin' && <AdminDashboardPage />}
      </main>

      {/* 4. Global Modals & Overlays */}
      <ItemDetailModal />
      <ClaimModal />
      <Toast />

      {/* 5. Official College Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CampusProvider>
      <AppContent />
    </CampusProvider>
  );
}
