'use client';

import React from 'react';
import { useCampus } from '../context/CampusContext';
import ItemCard from '../components/ItemCard';
import { Search, PlusCircle, AlertCircle, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export default function HomePage() {
  const { foundItems, stats, setActivePage, setSelectedItemId } = useCampus();

  // Get recently found items (latest 4)
  const recentItems = [...foundItems]
    .sort((a, b) => new Date(b.dateFound) - new Date(a.dateFound))
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20 bg-gradient-to-b from-[#F7F3EF] via-[#FAF8F5] to-white border-b border-[#E8E2DC]">
        {/* Soft background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#8C4058]/8 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2DC] shadow-sm text-xs font-bold text-[#681D35]">
                <ShieldCheck className="w-4 h-4 text-[#8C4058]" />
                <span>Verified University Lost &amp; Found System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#282326] font-serif leading-[1.15] tracking-tight">
                Lost Something? <br />
                <span className="text-[#681D35] italic">Let's Find It.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#777078] max-w-xl leading-relaxed">
                A smarter way to reconnect lost belongings with their owners. Report, discover, and reclaim your belongings securely within our campus community.
              </p>

              {/* Two Prominent CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActivePage('report-lost')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>I Lost Something</span>
                </button>

                <button
                  onClick={() => setActivePage('report-found')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#681D35] border border-[#E8E2DC] hover:border-[#681D35] font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>I Found Something</span>
                </button>

                <button
                  onClick={() => setActivePage('browse')}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-bold text-[#777078] hover:text-[#681D35] transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Browse Found Catalog →</span>
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="pt-4 flex items-center gap-4 text-xs text-[#777078]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Human Verified Handover
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  College Email Protected
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#681D35]/10 via-[#F7F3EF] to-[#8C4058]/15 border border-[#E8E2DC] p-6 shadow-card flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
                  alt="Recovered campus belongings"
                  className="w-full h-full object-cover rounded-2xl shadow-sm"
                />

                {/* Floating Status Pill */}
                <div className="absolute bottom-10 left-8 right-8 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E2DC] shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#282326]">Recent Handover</p>
                      <p className="text-[11px] text-[#777078]">Casio Scientific Calculator • Lab 304</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Returned
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATISTICS SECTION (From Database) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E2DC] p-8 shadow-card">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#681D35]">
              Campus Impact &amp; Activity
            </span>
            <h2 className="text-2xl font-bold text-[#282326] font-serif mt-1">
              Live Recovery Statistics
            </h2>
            <p className="text-xs text-[#777078] mt-1">
              Live metrics automatically computed from our verified database.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2DC]">
            <div className="p-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#681D35] font-serif mb-1">
                {stats.totalFound}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#282326] block">
                Total Items Found
              </span>
              <span className="text-[11px] text-[#777078]">Logged by security &amp; staff</span>
            </div>

            <div className="p-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-700 font-serif mb-1">
                {stats.successfullyReturned}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#282326] block">
                Successfully Returned
              </span>
              <span className="text-[11px] text-[#777078]">Reclaimed by rightful owners</span>
            </div>

            <div className="p-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#8C4058] font-serif mb-1">
                {stats.activeLostReports}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#282326] block">
                Active Lost Reports
              </span>
              <span className="text-[11px] text-[#777078]">Students currently seeking items</span>
            </div>

            <div className="p-4">
              <span className="block text-3xl sm:text-4xl font-extrabold text-amber-600 font-serif mb-1">
                {stats.awaitingClaims}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#282326] block">
                Items Awaiting Claims
              </span>
              <span className="text-[11px] text-[#777078]">Claims undergoing staff review</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECENTLY FOUND ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#681D35]">
              Campus Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#282326] font-serif mt-1">
              Recently Found Items
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] mt-0.5">
              Items recovered across library, lecture halls, and cafeteria within the last 72 hours.
            </p>
          </div>

          <button
            onClick={() => setActivePage('browse')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#681D35] hover:text-[#501528] bg-white px-4 py-2.5 rounded-xl border border-[#E8E2DC] hover:border-[#681D35] shadow-sm transition-all"
          >
            <span>See All {foundItems.length} Found Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. HOW CAMPUSFIND WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E8E2DC] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-[#282326] font-serif">
              How Campus Recovery Works
            </h3>
            <p className="text-xs sm:text-sm text-[#777078] mt-1.5">
              A transparent, safe process designed to protect personal property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-6 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-[#681D35]/10 text-[#681D35] font-bold flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="font-bold text-sm text-[#282326] mb-1">Report or Browse</h4>
              <p className="text-xs text-[#777078] leading-relaxed">
                Report something you lost, or search through items discovered by staff.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-[#681D35]/10 text-[#681D35] font-bold flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="font-bold text-sm text-[#282326] mb-1">Smart Matching</h4>
              <p className="text-xs text-[#777078] leading-relaxed">
                Our algorithm highlights potential matches based on keywords, date, and building.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-[#681D35]/10 text-[#681D35] font-bold flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="font-bold text-sm text-[#282326] mb-1">Submit Claim</h4>
              <p className="text-xs text-[#777078] leading-relaxed">
                Provide identifying details and security answers to prove legitimate ownership.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E8E2DC] shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-[#681D35]/10 text-[#681D35] font-bold flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h4 className="font-bold text-sm text-[#282326] mb-1">Secure Pickup</h4>
              <p className="text-xs text-[#777078] leading-relaxed">
                After administrator review, collect your belonging from the campus desk.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

