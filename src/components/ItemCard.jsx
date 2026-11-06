'use client';

import React from 'react';
import { useCampus } from '../context/CampusContext';
import { MapPin, Calendar, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function ItemCard({ item, onViewDetails }) {
  const { setSelectedItemId } = useCampus();

  const handleOpen = () => {
    if (onViewDetails) {
      onViewDetails(item);
    } else {
      setSelectedItemId(item.id);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available to Claim
          </span>
        );
      case 'Claim Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Claim Under Review
          </span>
        );
      case 'Claim Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            Awaiting Pickup
          </span>
        );
      case 'Returned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            <CheckCircle2 className="w-3 h-3 text-gray-500" />
            Returned to Owner
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E8E2DC] overflow-hidden shadow-card hover:shadow-card-hover hover:border-[#8C4058]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Item Image with Category Badge & Status Overlay */}
      <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 text-[#681D35] shadow-sm backdrop-blur-md">
            {item.category}
          </span>
          <div>{getStatusBadge(item.status)}</div>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#777078] mb-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#8C4058]" />
            <span>Found on {item.dateFound}</span>
          </div>

          <h3 className="text-base font-bold text-[#282326] leading-snug line-clamp-2 mb-2 group-hover:text-[#681D35] transition-colors">
            {item.title}
          </h3>

          <p className="text-xs text-[#777078] line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        <div>
          <div className="flex items-start gap-1.5 text-xs text-[#282326] font-medium pt-3 border-t border-[#E8E2DC] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#681D35] shrink-0 mt-0.5" />
            <span className="truncate">{item.locationFound}</span>
          </div>

          <button
            onClick={handleOpen}
            className="w-full py-2.5 px-4 rounded-xl bg-[#F7F3EF] hover:bg-[#681D35] text-[#681D35] hover:text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

