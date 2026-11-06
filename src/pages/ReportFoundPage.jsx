'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { ShieldCheck, Upload, AlertCircle, CheckCircle2, Lock, ArrowRight, UserCheck } from 'lucide-react';

export default function ReportFoundPage() {
  const { currentUser, switchRole, registerFoundItem, setActivePage, setSelectedItemId } = useCampus();

  const isAuthorized = currentUser.role === 'staff' || currentUser.role === 'admin';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    description: '',
    dateFound: new Date().toISOString().split('T')[0],
    locationFound: CAMPUS_LOCATIONS[0],
    additionalNotes: '',
    image: '',
    registeredBy: currentUser.name || 'Officer Rajesh Kumar'
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [registeredItem, setRegisteredItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Item title is required.';
    if (!formData.description.trim() || formData.description.length < 10) {
      errs.description = 'Please describe the item (at least 10 characters).';
    }
    if (!formData.registeredBy.trim()) errs.registeredBy = 'Staff member name is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const finalImage = imagePreview || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80';

      const item = registerFoundItem({
        ...formData,
        image: finalImage
      });

      setRegisteredItem(item);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* If Not Authorized as Staff/Admin, Show Campus Policy Notice */}
      {!isAuthorized ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2DC] shadow-card text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl">
            <Lock className="w-8 h-8 text-[#681D35]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#681D35]">
              Campus Custody Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#282326] font-serif">
              Found Something on Campus?
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
              To protect student property and maintain institutional chain of custody, <strong>only authorized campus security officers and department staff can officially publish found-item listings</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DC] text-left text-xs text-[#282326] space-y-2">
            <p className="font-bold text-[#681D35]">What to do if you found an item:</p>
            <ol className="list-decimal pl-5 space-y-1 text-[#777078]">
              <li>Please bring the item to the <strong>Campus Security Desk (Admin Block, Room 102)</strong> or the nearest <strong>Library Helpdesk</strong>.</li>
              <li>A staff officer will record your name as the finder and officially log the item into CampusFind.</li>
            </ol>
          </div>

          {/* Quick Switch for Reviewer / Demo */}
          <div className="pt-2 border-t border-[#E8E2DC] flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs text-[#777078]">Testing the platform?</span>
            <button
              onClick={() => switchRole('staff')}
              className="px-5 py-2.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold shadow-sm transition-all"
            >
              Switch to Staff Account (Officer Rajesh)
            </button>
          </div>
        </div>
      ) : registeredItem ? (
        /* Success Screen */
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2DC] shadow-card text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#282326] font-serif">
            Found Item Registered Successfully
          </h2>
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E2DC] font-mono text-sm font-bold text-[#681D35]">
            Item ID: {registeredItem.id}
          </div>
          <p className="text-xs sm:text-sm text-[#777078] max-w-lg mx-auto leading-relaxed">
            "{registeredItem.title}" has been published to the public catalog with status <strong>Available</strong>. Matching algorithms have scanned student reports, and any matching claimants have been alerted.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setSelectedItemId(registeredItem.id);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#681D35] text-white text-xs font-bold hover:bg-[#501528]"
            >
              View Catalog Listing →
            </button>
            <button
              onClick={() => {
                setRegisteredItem(null);
                setFormData({
                  title: '',
                  category: 'Electronics',
                  description: '',
                  dateFound: new Date().toISOString().split('T')[0],
                  locationFound: CAMPUS_LOCATIONS[0],
                  additionalNotes: '',
                  image: '',
                  registeredBy: currentUser.name
                });
                setImagePreview('');
              }}
              className="px-6 py-2.5 rounded-xl border border-[#E8E2DC] text-xs font-bold text-[#282326] hover:bg-gray-50"
            >
              Register Another Found Item
            </button>
          </div>
        </div>
      ) : (
        /* Staff Form */
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#681D35] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E8E2DC]">
              <ShieldCheck className="w-4 h-4 text-[#8C4058]" />
              <span>Authorized Staff &amp; Security Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#282326] font-serif">
              Register a Found Item
            </h1>
            <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
              Catalog a recovered belonging into the official college lost &amp; found registry. Automatic matching will cross-check pending student reports immediately.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E8E2DC] shadow-card space-y-6">
            
            {/* Staff Header Badge */}
            <div className="p-3.5 rounded-2xl bg-[#F7F3EF] border border-[#E8E2DC] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-[#681D35]" />
                <div>
                  <span className="text-xs font-bold text-[#282326] block">Logged Staff: {currentUser.name}</span>
                  <span className="text-[11px] text-[#777078]">{currentUser.department} ({currentUser.id})</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                Authorized
              </span>
            </div>

            {/* Core Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Item Title / Name <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Apple AirPods Pro (White Case)"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none ${
                      errors.title ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                    }`}
                  />
                  {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Category <span className="text-[#681D35]">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#282326] mb-1.5">
                  Public Description <span className="text-[#681D35]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the visible exterior condition, color, and location context..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none resize-none ${
                    errors.description ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                  }`}
                />
                {errors.description && <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Date Recovered <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateFound}
                    onChange={(e) => setFormData({ ...formData, dateFound: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Exact Location Found <span className="text-[#681D35]">*</span>
                  </label>
                  <select
                    value={formData.locationFound}
                    onChange={(e) => setFormData({ ...formData, locationFound: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  >
                    {CAMPUS_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#282326] mb-1.5">
                  Internal Verification Information (Held Privately for Claim Review)
                </label>
                <p className="text-[11px] text-[#777078] mb-1.5">
                  Keep details like device serial number, wallet contents, or subtle markings in this box. Administrators will compare this against claimant answers.
                </p>
                <input
                  type="text"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="e.g. Serial #GW89842; contains $15 cash; engraved with initials 'AM'"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                />
              </div>

              {/* Found Item Photograph Upload */}
              <div>
                <label className="block text-xs font-bold text-[#282326] mb-1.5">
                  Photograph of the Recovered Item <span className="text-[#681D35]">*</span>
                </label>
                <p className="text-[11px] text-[#777078] mb-2">
                  Take or upload a clear, high-resolution photo showing the item's front profile for the public catalog.
                </p>

                {imagePreview ? (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DC] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Found Item Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-[#E8E2DC] shadow-sm"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#282326] block">Official Image Loaded</span>
                        <span className="text-[11px] text-emerald-600 font-medium">Ready for public catalog listing</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#8C4058]/50 hover:border-[#681D35] bg-[#FAF8F5] hover:bg-white cursor-pointer transition-all group text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#681D35]/10 text-[#681D35] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#681D35]">
                      Click or tap to upload photograph of found item
                    </span>
                    <span className="text-xs text-[#777078] mt-1">
                      Clear picture ensures owners can identify their belonging
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2DC] flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing to Catalog...' : 'Publish Found Item to Catalog'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
