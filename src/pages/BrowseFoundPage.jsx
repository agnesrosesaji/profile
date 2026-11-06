'use client';

import React, { useState, useMemo } from 'react';
import { useCampus } from '../context/CampusContext';
import ItemCard from '../components/ItemCard';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { Search, Filter, SlidersHorizontal, Calendar, MapPin, X, RotateCcw } from 'lucide-react';

export default function BrowseFoundPage() {
  const { foundItems, setSelectedItemId } = useCampus();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return foundItems.filter((item) => {
      // 1. Search Query
      const matchesSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.locationFound.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // 3. Location
      const matchesLocation =
        selectedLocation === 'All' || item.locationFound.includes(selectedLocation.split('–')[0].trim());

      // 4. Status
      const matchesStatus =
        selectedStatus === 'All' || item.status === selectedStatus;

      // 5. Date
      const matchesDate = !selectedDate || item.dateFound === selectedDate;

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus && matchesDate;
    });
  }, [foundItems, searchTerm, selectedCategory, selectedLocation, selectedStatus, selectedDate]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedStatus('All');
    setSelectedDate('');
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== 'All' ||
    selectedLocation !== 'All' ||
    selectedStatus !== 'All' ||
    Boolean(selectedDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#681D35] to-[#8C4058] text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Campus Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Found Items Directory
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            All recovered items currently secured in the campus lost &amp; found inventory. Filter by category, location, or date to locate your belonging and submit an ownership claim.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E2DC] shadow-card space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#777078] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by item name (e.g. AirPods, Hydro Flask, Casio, Backpack, ID card)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-[#E8E2DC] focus:border-[#681D35] bg-[#FAF8F5] text-sm text-[#282326] focus:bg-white focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777078] hover:text-[#282326]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#777078] mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs font-semibold bg-white text-[#282326] focus:border-[#681D35] focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#777078] mb-1">
              Location Found
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs font-semibold bg-white text-[#282326] focus:border-[#681D35] focus:outline-none"
            >
              <option value="All">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#777078] mb-1">
              Availability Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs font-semibold bg-white text-[#282326] focus:border-[#681D35] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available to Claim</option>
              <option value="Claim Pending">Claim Under Review</option>
              <option value="Returned">Returned to Owner</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#777078] mb-1">
              Date Recovered
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2DC] text-xs font-semibold bg-white text-[#282326] focus:border-[#681D35] focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E2DC]">
          <span className="text-[#777078]">
            Showing <strong>{filteredItems.length}</strong> of {foundItems.length} found items
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 font-bold text-[#681D35] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2DC] shadow-sm max-w-xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F7F3EF] text-[#777078] flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-[#282326]">No Items Match Your Filters</h3>
          <p className="text-xs text-[#777078] leading-relaxed">
            We couldn't find any found item matching your current search terms or date. Try broadening your filter or report a lost item so we can alert you when it's found.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl border border-[#E8E2DC] text-xs font-bold hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

