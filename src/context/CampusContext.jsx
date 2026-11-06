'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_FOUND_ITEMS,
  INITIAL_LOST_REPORTS,
  INITIAL_CLAIMS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const CampusContext = createContext();

export const DEMO_USERS = {
  student: {
    name: 'Alex Mercer',
    email: 'alex.student@college.edu',
    role: 'student',
    id: 'STU-2024-88',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'
  },
  staff: {
    name: 'Officer Rajesh Kumar',
    email: 'rajesh.security@college.edu',
    role: 'staff',
    id: 'SEC-8821',
    department: 'Campus Security & Facilities',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
  },
  admin: {
    name: 'Dean Arthur Campbell',
    email: 'admin@college.edu',
    role: 'admin',
    id: 'ADM-001',
    department: 'Office of Student Welfare & Campus Security',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
  }
};

export function CampusProvider({ children }) {
  // Authentication & Role
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.student);

  // Core Data
  const [foundItems, setFoundItems] = useState([]);
  const [lostReports, setLostReports] = useState([]);
  const [claims, setClaims] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Active page navigation state ('home', 'browse', 'report-lost', 'report-found', 'my-reports', 'admin', 'login')
  const [activePage, setActivePage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState(null); // for item detail modal
  const [claimingItem, setClaimingItem] = useState(null); // for claim modal
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Initial load from localStorage
  useEffect(() => {
    try {
      const savedFound = localStorage.getItem('cf_found_items');
      const savedLost = localStorage.getItem('cf_lost_reports');
      const savedClaims = localStorage.getItem('cf_claims');
      const savedNotifs = localStorage.getItem('cf_notifs');
      const savedUserRole = localStorage.getItem('cf_user_role');

      setFoundItems(savedFound ? JSON.parse(savedFound) : INITIAL_FOUND_ITEMS);
      setLostReports(savedLost ? JSON.parse(savedLost) : INITIAL_LOST_REPORTS);
      setClaims(savedClaims ? JSON.parse(savedClaims) : INITIAL_CLAIMS);
      setNotifications(savedNotifs ? JSON.parse(savedNotifs) : INITIAL_NOTIFICATIONS);

      if (savedUserRole && DEMO_USERS[savedUserRole]) {
        setCurrentUser(DEMO_USERS[savedUserRole]);
      }
    } catch (e) {
      console.error('Error loading CampusFind state', e);
      setFoundItems(INITIAL_FOUND_ITEMS);
      setLostReports(INITIAL_LOST_REPORTS);
      setClaims(INITIAL_CLAIMS);
      setNotifications(INITIAL_NOTIFICATIONS);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cf_found_items', JSON.stringify(foundItems));
      localStorage.setItem('cf_lost_reports', JSON.stringify(lostReports));
      localStorage.setItem('cf_claims', JSON.stringify(claims));
      localStorage.setItem('cf_notifs', JSON.stringify(notifications));
      localStorage.setItem('cf_user_role', currentUser.role);
    }
  }, [foundItems, lostReports, claims, notifications, currentUser, isLoaded]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  // Role Switcher
  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setCurrentUser(DEMO_USERS[roleKey]);
      showToast(`Switched active profile to ${DEMO_USERS[roleKey].name} (${DEMO_USERS[roleKey].role.toUpperCase()})`, 'info');
    }
  };

  // -------------------------------------------------------------
  // Smart Matching Engine
  // -------------------------------------------------------------
  const calculateMatchScore = (lostItem, foundItem) => {
    let score = 0;

    // 1. Category match (High priority)
    if (lostItem.category.toLowerCase() === foundItem.category.toLowerCase()) {
      score += 45;
    }

    // 2. Keyword overlap in Title
    const lostWords = (lostItem.itemName || '').toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const foundWords = (foundItem.title || '').toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const titleCommon = lostWords.filter(w => foundWords.includes(w));
    if (titleCommon.length > 0) {
      score += Math.min(30, titleCommon.length * 15);
    }

    // 3. Keyword overlap in Description
    const lostDescWords = (lostItem.description || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const foundDescWords = (foundItem.description || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const descCommon = lostDescWords.filter(w => foundDescWords.includes(w));
    if (descCommon.length > 0) {
      score += Math.min(15, descCommon.length * 5);
    }

    // 4. Location proximity
    if (lostItem.locationLost && foundItem.locationFound) {
      const lostLoc = lostItem.locationLost.toLowerCase();
      const foundLoc = foundItem.locationFound.toLowerCase();
      if (lostLoc === foundLoc || lostLoc.includes(foundLoc.split('–')[0].trim())) {
        score += 10;
      }
    }

    return Math.min(100, score);
  };

  const getMatchesForLostItem = (lostItem) => {
    return foundItems
      .filter(item => item.status === 'Available' || item.status === 'Claim Pending')
      .map(item => ({
        item,
        score: calculateMatchScore(lostItem, item)
      }))
      .filter(m => m.score >= 40)
      .sort((a, b) => b.score - a.score);
  };

  const getMatchesForFoundItem = (foundItem) => {
    return lostReports
      .map(report => ({
        report,
        score: calculateMatchScore(report, foundItem)
      }))
      .filter(m => m.score >= 40)
      .sort((a, b) => b.score - a.score);
  };

  // -------------------------------------------------------------
  // Actions: Lost Reports
  // -------------------------------------------------------------
  const submitLostReport = (reportData) => {
    const reportId = `LST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      ...reportData,
      id: reportId,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };

    // Check smart matches
    const matches = getMatchesForLostItem(newReport);
    if (matches.length > 0) {
      newReport.status = 'Potential Match Found';
      newReport.matchedItemId = matches[0].item.id;
    }

    setLostReports(prev => [newReport, ...prev]);

    // Create confirmation notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      userId: newReport.reporterEmail,
      title: 'Lost Item Report Registered',
      message: `Your report for "${newReport.itemName}" (ID: ${reportId}) is now active in the campus recovery system.`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'report'
    };

    // If match found, create extra alert
    if (matches.length > 0) {
      const matchNotif = {
        id: `NOTIF-${Date.now() + 1}`,
        userId: newReport.reporterEmail,
        title: 'Possible Item Match Detected! 🔍',
        message: `We found a potential match for "${newReport.itemName}" found at ${matches[0].item.locationFound}.`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type: 'match',
        linkItemId: matches[0].item.id
      };
      setNotifications(prev => [matchNotif, newNotif, ...prev]);
    } else {
      setNotifications(prev => [newNotif, ...prev]);
    }

    showToast(`Lost report ${reportId} submitted successfully!`, 'success');
    return { reportId, matches };
  };

  // -------------------------------------------------------------
  // Actions: Found Items (Staff / Admin Only)
  // -------------------------------------------------------------
  const registerFoundItem = (itemData) => {
    const itemId = `FND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newItem = {
      ...itemData,
      id: itemId,
      status: 'Available',
      dateFound: itemData.dateFound || new Date().toISOString().split('T')[0],
      registeredBy: currentUser.name,
      staffId: currentUser.id
    };

    setFoundItems(prev => [newItem, ...prev]);

    // Check if any student lost report matches this new found item
    const matchingLostReports = getMatchesForFoundItem(newItem);
    if (matchingLostReports.length > 0) {
      matchingLostReports.forEach(({ report }) => {
        // Notify the student
        const alertNotif = {
          id: `NOTIF-${Date.now()}-${report.id}`,
          userId: report.reporterEmail,
          title: 'Campus Alert: Possible Match for Your Lost Item! 🎓',
          message: `Staff just registered a found "${newItem.title}" at ${newItem.locationFound} that matches your report.`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          type: 'match',
          linkItemId: newItem.id
        };
        setNotifications(prev => [alertNotif, ...prev]);

        // Update lost report status
        setLostReports(reports =>
          reports.map(r =>
            r.id === report.id
              ? { ...r, status: 'Potential Match Found', matchedItemId: newItem.id }
              : r
          )
        );
      });
    }

    showToast(`Found item ${itemId} registered and listed on CampusFind!`, 'success');
    return newItem;
  };

  const updateFoundItem = (id, updates) => {
    setFoundItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Found item record updated.', 'info');
  };

  const deleteFoundItem = (id) => {
    setFoundItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from public registry.', 'info');
  };

  // -------------------------------------------------------------
  // Actions: Claims Workflow
  // -------------------------------------------------------------
  const submitClaim = (claimData) => {
    const claimId = `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newClaim = {
      ...claimData,
      id: claimId,
      claimDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
      adminNote: '',
      pickupInstructions: ''
    };

    setClaims(prev => [newClaim, ...prev]);

    // Update found item status
    setFoundItems(prev =>
      prev.map(item =>
        item.id === claimData.itemId ? { ...item, status: 'Claim Pending' } : item
      )
    );

    // Notify student
    const notif = {
      id: `NOTIF-${Date.now()}`,
      userId: claimData.claimantEmail,
      title: 'Claim Submitted – Under Review 📋',
      message: `Your claim (${claimId}) for "${claimData.itemTitle}" has been received. College staff will review your verification details.`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'claim_submitted'
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Claim submitted for verification! Staff will review shortly.', 'success');
    return claimId;
  };

  const approveClaim = (claimId, adminNote, pickupOffice = 'Central Administration Block, Room 102') => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) return;

    const instructions = `Please collect your item from ${pickupOffice}. Bring your official college ID card between 9:00 AM - 4:30 PM (Mon-Fri). Note: ${adminNote || 'Verification confirmed by staff.'}`;

    setClaims(prev =>
      prev.map(c =>
        c.id === claimId
          ? {
              ...c,
              status: 'Approved',
              adminNote,
              pickupInstructions: instructions
            }
          : c
      )
    );

    // Update found item status
    setFoundItems(prev =>
      prev.map(item =>
        item.id === claim.itemId ? { ...item, status: 'Claim Approved' } : item
      )
    );

    // Send high priority notification to student
    const approvalNotif = {
      id: `NOTIF-${Date.now()}`,
      userId: claim.claimantEmail,
      title: '🎉 Claim Approved! Ready for Pickup',
      message: `Your claim for "${claim.itemTitle}" was approved by campus authorities. You can collect it from ${pickupOffice}.`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'claim_approved'
    };
    setNotifications(prev => [approvalNotif, ...prev]);

    showToast(`Claim ${claimId} approved! Claimant notified with collection instructions.`, 'success');
  };

  const rejectClaim = (claimId, reasonNote) => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) return;

    setClaims(prev =>
      prev.map(c =>
        c.id === claimId
          ? {
              ...c,
              status: 'Rejected',
              adminNote: reasonNote || 'Identifying characteristics did not match the recovered item.'
            }
          : c
      )
    );

    // Check if there are other pending claims on this item
    const otherPending = claims.some(c => c.id !== claimId && c.itemId === claim.itemId && c.status === 'Pending Verification');
    if (!otherPending) {
      setFoundItems(prev =>
        prev.map(item =>
          item.id === claim.itemId ? { ...item, status: 'Available' } : item
        )
      );
    }

    // Notify claimant safely without exposing internal details
    const rejectNotif = {
      id: `NOTIF-${Date.now()}`,
      userId: claim.claimantEmail,
      title: 'Update on Your Item Claim',
      message: `Your claim for "${claim.itemTitle}" could not be verified at this time: ${reasonNote || 'Details did not match item features.'} Please visit the campus recovery desk with additional proof if needed.`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'claim_rejected'
    };
    setNotifications(prev => [rejectNotif, ...prev]);

    showToast(`Claim ${claimId} rejected. Item remains safely cataloged.`, 'info');
  };

  const markItemReturned = (claimId) => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) return;

    setClaims(prev =>
      prev.map(c => (c.id === claimId ? { ...c, status: 'Returned' } : c))
    );

    setFoundItems(prev =>
      prev.map(item =>
        item.id === claim.itemId ? { ...item, status: 'Returned' } : item
      )
    );

    // If claimant also had a lost report, resolve it
    setLostReports(prev =>
      prev.map(r =>
        r.reporterEmail === claim.claimantEmail && r.category === (foundItems.find(f => f.id === claim.itemId)?.category)
          ? { ...r, status: 'Returned' }
          : r
      )
    );

    const returnNotif = {
      id: `NOTIF-${Date.now()}`,
      userId: claim.claimantEmail,
      title: 'Item Handover Complete! 🌿',
      message: `Handover of "${claim.itemTitle}" confirmed. Thank you for using CampusFind!`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'returned'
    };
    setNotifications(prev => [returnNotif, ...prev]);

    showToast(`Item confirmed handed over and marked as Successfully Returned!`, 'success');
  };

  // -------------------------------------------------------------
  // Notifications helpers
  // -------------------------------------------------------------
  const userNotifications = notifications.filter(
    n => n.userId === currentUser.email || n.userId === 'all'
  );

  const unreadNotificationCount = userNotifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(n => (n.userId === currentUser.email ? { ...n, read: true } : n))
    );
  };

  // -------------------------------------------------------------
  // Dynamic Statistics
  // -------------------------------------------------------------
  const stats = {
    totalFound: foundItems.length,
    successfullyReturned: foundItems.filter(i => i.status === 'Returned').length,
    activeLostReports: lostReports.filter(r => r.status !== 'Returned').length,
    awaitingClaims: claims.filter(c => c.status === 'Pending Verification').length,
    availableItems: foundItems.filter(i => i.status === 'Available').length
  };

  return (
    <CampusContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        foundItems,
        lostReports,
        claims,
        notifications: userNotifications,
        unreadNotificationCount,
        stats,
        activePage,
        setActivePage,
        selectedItemId,
        setSelectedItemId,
        claimingItem,
        setClaimingItem,
        toast,
        showToast,
        submitLostReport,
        registerFoundItem,
        updateFoundItem,
        deleteFoundItem,
        submitClaim,
        approveClaim,
        rejectClaim,
        markItemReturned,
        getMatchesForLostItem,
        getMatchesForFoundItem,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
}

