'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  PlusCircle,
  FileCheck,
  Search,
  ExternalLink,
  Users,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    currentUser,
    stats,
    foundItems,
    lostReports,
    claims,
    approveClaim,
    rejectClaim,
    markItemReturned,
    deleteFoundItem,
    setActivePage,
    setSelectedItemId
  } = useCampus();

  const [adminTab, setAdminTab] = useState('claims'); // 'claims' | 'found' | 'lost' | 'users'
  const [selectedClaimForReview, setSelectedClaimForReview] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [pickupOfficeInput, setPickupOfficeInput] = useState('Central Administration Block, Room 102');

  const pendingClaims = claims.filter(c => c.status === 'Pending Verification');

  const handleOpenReview = (claim) => {
    setSelectedClaimForReview(claim);
    setAdminNoteInput('');
  };

  const handleApprove = () => {
    if (!selectedClaimForReview) return;
    approveClaim(selectedClaimForReview.id, adminNoteInput, pickupOfficeInput);
    setSelectedClaimForReview(null);
  };

  const handleReject = () => {
    if (!selectedClaimForReview) return;
    rejectClaim(selectedClaimForReview.id, adminNoteInput || 'Identifying features did not match the recovered item.');
    setSelectedClaimForReview(null);
  };

  const handleMarkReturned = (claimId) => {
    markItemReturned(claimId);
    if (selectedClaimForReview?.id === claimId) {
      setSelectedClaimForReview(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="p-8 rounded-3xl bg-[#681D35] text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-0.5 rounded-full border border-white/20">
              Campus Security &amp; Administration
            </span>
          </div>
          <h1 className="text-3xl font-extrabold font-serif">
            Administrative Control Center
          </h1>
          <p className="text-xs text-white/80 max-w-xl">
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.department}). Review ownership claims, verify item details, and manage campus custody.
          </p>
        </div>

        <button
          onClick={() => setActivePage('report-found')}
          className="px-5 py-3 rounded-xl bg-white text-[#681D35] hover:bg-[#F7F3EF] font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Found Item</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2DC] shadow-sm">
          <span className="text-xs font-bold text-[#777078] uppercase">Pending Claims</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-amber-600 font-serif">
              {stats.awaitingClaims}
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Action Required
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2DC] shadow-sm">
          <span className="text-xs font-bold text-[#777078] uppercase">Total Found Items</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-[#681D35] font-serif">
              {stats.totalFound}
            </span>
            <span className="text-[11px] text-[#777078]">
              {stats.availableItems} Available
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2DC] shadow-sm">
          <span className="text-xs font-bold text-[#777078] uppercase">Active Lost Reports</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-[#8C4058] font-serif">
              {stats.activeLostReports}
            </span>
            <span className="text-[11px] text-[#777078]">
              From Students
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2DC] shadow-sm">
          <span className="text-xs font-bold text-[#777078] uppercase">Successfully Returned</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-emerald-700 font-serif">
              {stats.successfullyReturned}
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Handover Verified
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm">
        <button
          onClick={() => setAdminTab('claims')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'claims'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Claims Verification Queue ({pendingClaims.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('found')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'found'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Found Items Catalog ({foundItems.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('lost')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'lost'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <span>Lost Reports Registry ({lostReports.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'users'
              ? 'bg-[#681D35] text-white shadow-sm'
              : 'text-[#777078] hover:text-[#282326] hover:bg-[#F7F3EF]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Directory &amp; Permissions</span>
        </button>
      </div>

      {/* TAB 1: CLAIMS VERIFICATION QUEUE */}
      {adminTab === 'claims' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8E2DC] shadow-card overflow-hidden">
            <div className="p-5 border-b border-[#E8E2DC] bg-[#FAF8F5] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#282326]">Claims Review Queue</h3>
                <p className="text-xs text-[#777078]">Compare submitted claimant details against official security notes before approving custody handover.</p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                {claims.length} Total Claims Submitted
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#282326]">
                <thead className="bg-[#F7F3EF] border-b border-[#E8E2DC] text-[#777078] uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Claim ID</th>
                    <th className="py-3 px-4">Claimant</th>
                    <th className="py-3 px-4">Target Item</th>
                    <th className="py-3 px-4">Date Claimed</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2DC]">
                  {claims.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-[#777078]">
                        No claims in the system yet.
                      </td>
                    </tr>
                  ) : (
                    claims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#681D35]">
                          {claim.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold block text-[#282326]">{claim.claimantName}</span>
                          <span className="text-[11px] text-[#777078]">{claim.claimantEmail}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold block text-[#282326] truncate max-w-xs">{claim.itemTitle}</span>
                          <span className="text-[10px] text-[#777078] font-mono">Ref: {claim.itemId}</span>
                        </td>
                        <td className="py-3.5 px-4 text-[#777078]">{claim.claimDate}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            claim.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : claim.status === 'Pending Verification'
                              ? 'bg-amber-100 text-amber-800'
                              : claim.status === 'Returned'
                              ? 'bg-gray-200 text-gray-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenReview(claim)}
                            className="px-3 py-1.5 rounded-lg bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold transition-all"
                          >
                            Review &amp; Verify
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal / Side-by-side verification dialog when an admin clicks Review */}
          {selectedClaimForReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-modal border border-[#E8E2DC] max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 border-b border-[#E8E2DC] bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#282326]">
                      Claim Security Verification: {selectedClaimForReview.id}
                    </h3>
                    <p className="text-xs text-[#777078]">Compare photographs &amp; ownership answers</p>
                  </div>
                  <button
                    onClick={() => setSelectedClaimForReview(null)}
                    className="p-2 rounded-full hover:bg-black/5"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                  {/* SIDE-BY-SIDE PHOTOGRAPHS */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#681D35] mb-3">
                      Photographic Comparison
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Found Item Official Image */}
                      <div className="p-3.5 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC]">
                        <span className="block text-[11px] font-bold text-[#282326] mb-2 flex items-center justify-between">
                          <span>Official Found Item Image</span>
                          <span className="text-[10px] text-[#777078]">Campus Registry</span>
                        </span>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5">
                          <img
                            src={foundItems.find(f => f.id === selectedClaimForReview.itemId)?.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80'}
                            alt="Found Item"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[11px] font-semibold text-[#282326] mt-2">
                          {selectedClaimForReview.itemTitle}
                        </p>
                      </div>

                      {/* Claimant Uploaded Reference Photo */}
                      <div className="p-3.5 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC]">
                        <span className="block text-[11px] font-bold text-[#282326] mb-2 flex items-center justify-between">
                          <span>Claimant Submitted Reference</span>
                          <span className="text-[10px] text-[#777078]">Proof / Receipt</span>
                        </span>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5">
                          <img
                            src={selectedClaimForReview.referencePhoto || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80'}
                            alt="Claimant Proof"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[11px] text-[#777078] mt-2 italic">
                          Submitted by {selectedClaimForReview.claimantName} ({selectedClaimForReview.claimantEmail})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Claimant Stated Features */}
                  <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DC] text-xs">
                    <div>
                      <strong className="block text-[#282326] font-bold">Claimant's Identifying Characteristics:</strong>
                      <p className="text-[#777078] mt-0.5 leading-relaxed bg-white p-3 rounded-xl border border-[#E8E2DC]">
                        {selectedClaimForReview.distinguishingCharacteristics}
                      </p>
                    </div>

                    <div>
                      <strong className="block text-[#282326] font-bold">Proof of Ownership / Security Answer:</strong>
                      <p className="text-[#777078] mt-0.5 leading-relaxed bg-white p-3 rounded-xl border border-[#E8E2DC]">
                        {selectedClaimForReview.verificationAnswer}
                      </p>
                    </div>

                    {/* Security registry notes registered when found */}
                    <div>
                      <strong className="block text-[#681D35] font-bold">Original Internal Security Note (from finder log):</strong>
                      <p className="text-[#282326] mt-0.5 font-medium bg-[#681D35]/5 p-2.5 rounded-xl border border-[#681D35]/20">
                        {foundItems.find(f => f.id === selectedClaimForReview.itemId)?.additionalNotes || 'No extra note registered.'}
                      </p>
                    </div>
                  </div>

                  {/* Admin Decision Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#282326] mb-1">
                        Admin Note / Instruction to Claimant
                      </label>
                      <input
                        type="text"
                        value={adminNoteInput}
                        onChange={(e) => setAdminNoteInput(e.target.value)}
                        placeholder="e.g. Identity and serial number verified against student portal."
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#282326] mb-1">
                        Collection Office
                      </label>
                      <input
                        type="text"
                        value={pickupOfficeInput}
                        onChange={(e) => setPickupOfficeInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Decision Actions */}
                <div className="p-5 border-t border-[#E8E2DC] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedClaimForReview(null)}
                    className="px-4 py-2 rounded-xl border border-[#E8E2DC] text-xs font-bold hover:bg-white"
                  >
                    Back to Queue
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReject}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Reject Claim
                    </button>

                    <button
                      onClick={handleApprove}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Claim &amp; Authorize Pickup</span>
                    </button>

                    {selectedClaimForReview.status === 'Approved' && (
                      <button
                        onClick={() => handleMarkReturned(selectedClaimForReview.id)}
                        className="px-4 py-2.5 rounded-xl bg-[#282326] text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Confirm Handed Over
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FOUND ITEMS CATALOG */}
      {adminTab === 'found' && (
        <div className="bg-white rounded-3xl border border-[#E8E2DC] shadow-card overflow-hidden">
          <div className="p-5 border-b border-[#E8E2DC] bg-[#FAF8F5] flex items-center justify-between">
            <h3 className="font-bold text-base text-[#282326]">Found Items Inventory Management</h3>
            <span className="text-xs text-[#777078] font-bold">{foundItems.length} registered items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#282326]">
              <thead className="bg-[#F7F3EF] border-b border-[#E8E2DC] text-[#777078] uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Found Date</th>
                  <th className="py-3 px-4">Logged By</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2DC]">
                {foundItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#E8E2DC] shrink-0"
                      />
                      <div>
                        <span className="font-bold text-[#282326] block truncate max-w-[200px]">{item.title}</span>
                        <span className="font-mono text-[10px] text-[#777078]">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4 text-[#777078] truncate max-w-[150px]">{item.locationFound}</td>
                    <td className="py-3 px-4 text-[#777078]">{item.dateFound}</td>
                    <td className="py-3 px-4 text-[#777078]">{item.registeredBy}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Claim Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedItemId(item.id)}
                          className="p-1.5 rounded-lg text-[#681D35] hover:bg-[#681D35]/10"
                          title="View public listing"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFoundItem(item.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LOST REPORTS REGISTRY */}
      {adminTab === 'lost' && (
        <div className="bg-white rounded-3xl border border-[#E8E2DC] shadow-card overflow-hidden">
          <div className="p-5 border-b border-[#E8E2DC] bg-[#FAF8F5] flex items-center justify-between">
            <h3 className="font-bold text-base text-[#282326]">Student Lost Reports Registry</h3>
            <span className="text-xs text-[#777078] font-bold">{lostReports.length} reports logged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#282326]">
              <thead className="bg-[#F7F3EF] border-b border-[#E8E2DC] text-[#777078] uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date Lost</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2DC]">
                {lostReports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#681D35]">{report.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold block text-[#282326]">{report.reporterName}</span>
                      <span className="text-[11px] text-[#777078]">{report.reporterEmail}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#282326]">{report.itemName}</td>
                    <td className="py-3 px-4">{report.category}</td>
                    <td className="py-3 px-4 text-[#777078]">{report.dateLost}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F5] text-[#681D35] border border-[#E8E2DC]">
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: STAFF & PERMISSIONS */}
      {adminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-[#E8E2DC] shadow-card p-6 space-y-6">
          <div>
            <h3 className="font-bold text-base text-[#282326]">Campus Roles &amp; Permissions</h3>
            <p className="text-xs text-[#777078]">Access levels strictly enforced across student reports and official found registrations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC] space-y-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">Student / Faculty</span>
              <h4 className="text-sm font-bold text-[#282326]">Reporter &amp; Claimant</h4>
              <ul className="text-xs text-[#777078] space-y-1 list-disc pl-4">
                <li>Submit lost item reports</li>
                <li>Browse found items catalog</li>
                <li>Submit secure ownership claims</li>
                <li>Receive automated matching alerts</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC] space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Security &amp; Staff</span>
              <h4 className="text-sm font-bold text-[#282326]">Inventory Custodian</h4>
              <ul className="text-xs text-[#777078] space-y-1 list-disc pl-4">
                <li>Register &amp; catalog found items</li>
                <li>Record initial security notes</li>
                <li>Manage physical locker storage</li>
                <li>Scan matching lost reports</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC] space-y-2">
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">Administrator</span>
              <h4 className="text-sm font-bold text-[#282326]">Verification Authority</h4>
              <ul className="text-xs text-[#777078] space-y-1 list-disc pl-4">
                <li>Full claims review &amp; photographic audit</li>
                <li>Approve or reject ownership claims</li>
                <li>Issue physical collection notes</li>
                <li>Confirm official item handover</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

