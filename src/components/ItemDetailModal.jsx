'use client';

import React from 'react';
import { useCampus } from '../context/CampusContext';
import { X, MapPin, Calendar, UserCheck, Shield, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ItemDetailModal() {
  const { foundItems, selectedItemId, setSelectedItemId, setClaimingItem } = useCampus();

  if (!selectedItemId) return null;

  const item = foundItems.find(i => i.id === selectedItemId);
  if (!item) return null;

  const handleClaim = () => {
    setSelectedItemId(null);
    setClaimingItem(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-modal border border-[#E8E2DC] max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2DC] flex items-center justify-between bg-[#F7F3EF]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#681D35] bg-white px-3 py-1 rounded-full border border-[#E8E2DC]">
              {item.category}
            </span>
            <span className="text-xs font-mono text-[#777078]">Ref: {item.id}</span>
          </div>
          <button
            onClick={() => setSelectedItemId(null)}
            className="p-2 rounded-full text-[#777078] hover:text-[#282326] hover:bg-black/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image */}
          <div className="relative aspect-[16/10] bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E8E2DC]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                item.status === 'Available'
                  ? 'bg-emerald-600 text-white'
                  : item.status === 'Claim Pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#282326] font-serif mb-2">
              {item.title}
            </h2>
            <p className="text-[#777078] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#F7F3EF] border border-[#E8E2DC] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#681D35] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-[#777078] uppercase">Location Found</span>
                <span className="text-xs font-semibold text-[#282326]">{item.locationFound}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F3EF] border border-[#E8E2DC] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#681D35] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-[#777078] uppercase">Date Recovered</span>
                <span className="text-xs font-semibold text-[#282326]">{item.dateFound}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F3EF] border border-[#E8E2DC] flex items-start gap-3 sm:col-span-2">
              <UserCheck className="w-5 h-5 text-[#8C4058] shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-[#777078] uppercase">Registered By Campus Staff</span>
                <span className="text-xs font-semibold text-[#282326]">{item.registeredBy} ({item.staffId})</span>
                {item.additionalNotes && (
                  <p className="text-[11px] text-[#777078] mt-0.5 italic">
                    Security note: {item.additionalNotes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Secure Handover Warning */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Secure Verification Required</strong>
              <span>
                To protect student property, all claims undergo identity verification by campus administration. You will need to describe unique identifying marks or answer security questions before collection.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-[#E8E2DC] bg-[#FAF8F5] flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedItemId(null)}
            className="px-5 py-2.5 rounded-xl border border-[#E8E2DC] text-xs font-bold text-[#282326] hover:bg-white"
          >
            Cancel
          </button>

          {item.status === 'Available' ? (
            <button
              onClick={handleClaim}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Claim This Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 text-gray-500 text-xs font-bold cursor-not-allowed"
            >
              <span>Item Status: {item.status}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

