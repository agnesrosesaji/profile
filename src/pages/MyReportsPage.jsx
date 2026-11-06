'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { FileText, ShieldCheck, Sparkles, Bell, Clock, CheckCircle2, AlertCircle, ArrowRight, MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function MyReportsPage() {
  const {
    currentUser,
    lostReports,
    claims,
    foundItems,
    notifications,
    getMatchesForLostItem,
    setSelectedItemId,
    setActivePage
  } = useCampus();

  const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'claims' | 'matches' | 'notifications'

  // Filter lost reports for current user
  const userLostReports = lostReports.filter(
    r => r.reporterEmail === currentUser.email
  );

  // Filter claims for current user
  const userClaims = claims.filter(
    c => c.claimantEmail === currentUser.email
  );

  // Collect potential matches across all active user lost reports
  const potentialMatches = userLostReports
    .map(report => ({
      report,
      matches: getMatchesForLostItem(report)
    }))
    .filter(g => g.matches.length > 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'Potential Match Found':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Match Found</span>;
      case 'Under Review':
      case 'Claim Pending':
      case 'Pending Verification':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1"><Clock className="w-3 h-3" /> Under Review</span>;
      case 'Approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved for Pickup</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Rejected</span>;
      case 'Returned':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Handed Over</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2DC] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border border-[#E8E2DC] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#282326] font-serif">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#681D35]/10 text-[#681D35]">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-[#777078] mt-0.5">
              {currentUser.email} • {currentUser.department} ({currentUser.id})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActivePage('report-lost')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold shadow-sm transition-all text-center"
          >
            + Report New Lost Item
          </button>
          <button
            onClick={() => setActivePage('browse')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DC] text-[#282326] text-xs font-bold hover:bg-gray-100 transition-all text-center"
          >
            Browse Found Catalog
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm">
        <button
          onClick={() => setActiveTab('lost')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'lost'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Lost Reports ({userLostReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'claims'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>My Claims ({userClaims.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'matches'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Potential Matches ({potentialMatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'notifications'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications ({notifications.length})</span>
        </button>
      </div>

      {/* Tab 1: My Lost Reports */}
      {activeTab === 'lost' && (
        <div className="space-y-4">
          {userLostReports.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2DC] shadow-sm">
              <FileText className="w-10 h-10 text-[#777078]/40 mx-auto mb-2" />
              <h3 className="font-bold text-base text-[#282326]">No Active Lost Reports</h3>
              <p className="text-xs text-[#777078] mt-1 mb-4">
                You haven't reported any lost belongings yet.
              </p>
              <button
                onClick={() => setActivePage('report-lost')}
                className="px-5 py-2 rounded-xl bg-[#681D35] text-white text-xs font-bold"
              >
                Submit Lost Report
              </button>
            </div>
          ) : (
            userLostReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-[#E8E2DC] p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2DC]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#681D35] bg-[#F7F3EF] px-2.5 py-1 rounded-lg">
                      {report.id}
                    </span>
                    <span className="text-xs text-[#777078]">Reported on {report.dateReported}</span>
                  </div>
                  <div>{getStatusBadge(report.status)}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {report.image && (
                    <img
                      src={report.image}
                      alt={report.itemName}
                      className="w-20 h-20 rounded-xl object-cover border border-[#E8E2DC] shrink-0"
                    />
                  )}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#681D35] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E2DC]">
                        {report.category}
                      </span>
                      <h3 className="font-bold text-base text-[#282326]">
                        {report.itemName}
                      </h3>
                    </div>
                    <p className="text-xs text-[#777078] leading-relaxed">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#777078] pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#681D35]" />
                        Last seen: {report.locationLost}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#681D35]" />
                        Lost date: {report.dateLost}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tracking Step Progress */}
                <div className="pt-3 border-t border-[#E8E2DC]">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#777078] mb-1.5">
                    <span>Report Logged</span>
                    <span>Scanning Matches</span>
                    <span>Claim Verification</span>
                    <span>Returned</span>
                  </div>
                  <div className="w-full bg-[#E8E2DC] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#681D35] h-full rounded-full transition-all duration-500"
                      style={{
                        width:
                          report.status === 'Returned'
                            ? '100%'
                            : report.status === 'Approved'
                            ? '80%'
                            : report.status === 'Claim Pending'
                            ? '60%'
                            : report.status === 'Potential Match Found'
                            ? '40%'
                            : '20%'
                      }}
                    />
                  </div>
                </div>

                {/* If Match Found, Show Prompt */}
                {report.matchedItemId && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Staff registered a found item matching your description!</span>
                    </div>
                    <button
                      onClick={() => setSelectedItemId(report.matchedItemId)}
                      className="text-xs font-bold text-[#681D35] hover:underline shrink-0"
                    >
                      View Match Details →
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Claims */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {userClaims.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2DC] shadow-sm">
              <ShieldCheck className="w-10 h-10 text-[#777078]/40 mx-auto mb-2" />
              <h3 className="font-bold text-base text-[#282326]">No Active Claims</h3>
              <p className="text-xs text-[#777078] mt-1 mb-4">
                You haven't submitted any ownership claims for found items yet.
              </p>
              <button
                onClick={() => setActivePage('browse')}
                className="px-5 py-2 rounded-xl bg-[#681D35] text-white text-xs font-bold"
              >
                Browse Found Catalog
              </button>
            </div>
          ) : (
            userClaims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-[#E8E2DC] p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E2DC]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#681D35] bg-[#F7F3EF] px-2.5 py-1 rounded-lg">
                      {claim.id}
                    </span>
                    <span className="text-xs text-[#777078] ml-2">Claimed on {claim.claimDate}</span>
                  </div>
                  <div>{getStatusBadge(claim.status)}</div>
                </div>

                <div className="flex items-start gap-4">
                  {claim.referencePhoto && (
                    <img
                      src={claim.referencePhoto}
                      alt="Claim Proof"
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E2DC] shrink-0"
                    />
                  )}
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-sm text-[#282326]">
                      {claim.itemTitle}
                    </h3>
                    <p className="text-xs text-[#777078]">
                      <strong>Your Identifying Characteristics:</strong> {claim.distinguishingCharacteristics}
                    </p>
                    <p className="text-xs text-[#777078]">
                      <strong>Verification Details Provided:</strong> {claim.verificationAnswer}
                    </p>
                  </div>
                </div>

                {/* If Approved, show Collection Office Instructions */}
                {claim.status === 'Approved' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Claim Approved by Campus Administration</span>
                    </div>
                    <p className="text-emerald-800 leading-relaxed">
                      {claim.pickupInstructions || 'Please collect your item from Administration Block Room 102 with student photo ID.'}
                    </p>
                  </div>
                )}

                {/* If Rejected */}
                {claim.status === 'Rejected' && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                    <strong className="block font-bold">Claim Verification Incomplete</strong>
                    <span>{claim.adminNote || 'Details did not match the recovered item. Please visit campus security desk with additional proof.'}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Potential Matches */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          {potentialMatches.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2DC] shadow-sm">
              <Sparkles className="w-10 h-10 text-amber-500/50 mx-auto mb-2" />
              <h3 className="font-bold text-base text-[#282326]">No Immediate Matches Detected</h3>
              <p className="text-xs text-[#777078] mt-1">
                Our matching algorithm continuously scans new found-item registrations and will alert you right away.
              </p>
            </div>
          ) : (
            potentialMatches.map(({ report, matches }) => (
              <div key={report.id} className="bg-white p-6 rounded-2xl border border-[#E8E2DC] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2DC]">
                  <div>
                    <span className="text-xs font-bold text-[#681D35]">For Your Report: {report.itemName}</span>
                    <p className="text-[11px] text-[#777078]">Report ID: {report.id} • Category: {report.category}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {matches.length} Candidate(s) Found
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matches.map(({ item, score }) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DC] flex items-center gap-3.5 hover:border-[#681D35] transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover border border-[#E8E2DC] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            {score}% Match
                          </span>
                          <span className="text-[10px] text-[#777078]">{item.dateFound}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#282326] truncate mt-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#777078] truncate">
                          {item.locationFound}
                        </p>
                        <button
                          onClick={() => setSelectedItemId(item.id)}
                          className="mt-2 text-xs font-bold text-[#681D35] hover:underline flex items-center gap-1"
                        >
                          <span>Review &amp; Claim Item</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-[#E8E2DC] shadow-sm divide-y divide-[#E8E2DC]">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-[#777078] text-sm">
              <Bell className="w-8 h-8 mx-auto text-[#777078]/40 mb-2" />
              <p>No notifications.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="p-4 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#681D35]/10 text-[#681D35] flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#282326]">{notif.title}</h4>
                    <span className="text-[10px] text-[#777078]">{notif.date}</span>
                  </div>
                  <p className="text-xs text-[#777078] mt-0.5">{notif.message}</p>
                  {notif.linkItemId && (
                    <button
                      onClick={() => setSelectedItemId(notif.linkItemId)}
                      className="mt-1 text-xs font-bold text-[#681D35] hover:underline flex items-center gap-1"
                    >
                      <span>Open Item Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

