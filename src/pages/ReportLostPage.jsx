'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { PlusCircle, Upload, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function ReportLostPage() {
  const { currentUser, submitLostReport, setSelectedItemId, setActivePage } = useCampus();

  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Electronics',
    description: '',
    dateLost: new Date().toISOString().split('T')[0],
    locationLost: CAMPUS_LOCATIONS[0],
    distinguishingFeatures: '',
    reporterName: currentUser.name || '',
    reporterEmail: currentUser.email || '',
    reporterPhone: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null); // { reportId, matches }
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
    if (!formData.itemName.trim()) errs.itemName = 'Item name is required.';
    if (!formData.description.trim() || formData.description.length < 10) {
      errs.description = 'Please provide a detailed description (at least 10 characters).';
    }
    if (!formData.dateLost) errs.dateLost = 'Date lost is required.';
    if (!formData.reporterName.trim()) errs.reporterName = 'Your name is required.';
    if (!formData.reporterEmail.trim() || !formData.reporterEmail.includes('@')) {
      errs.reporterEmail = 'Valid college email is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Default placeholder image if no photo uploaded
      const finalImage = imagePreview || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80';

      const result = submitLostReport({
        ...formData,
        image: finalImage
      });

      setSubmissionResult(result);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* If successfully submitted */}
      {submissionResult ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Success Banner */}
          <div className="p-8 rounded-3xl bg-white border border-[#E8E2DC] shadow-card text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h2 className="text-3xl font-bold text-[#282326] font-serif">
              Lost Report Registered!
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E2DC] font-mono text-sm font-bold text-[#681D35]">
              Report ID: {submissionResult.reportId}
            </div>
            <p className="text-sm text-[#777078] max-w-lg mx-auto leading-relaxed">
              Your lost item has been cataloged in our university registry. Our automated system continuously scans new found-item listings registered by campus staff.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActivePage('my-reports')}
                className="px-6 py-2.5 rounded-xl bg-[#681D35] text-white text-xs font-bold hover:bg-[#501528] shadow-sm"
              >
                Track in My Reports Dashboard →
              </button>
              <button
                onClick={() => setSubmissionResult(null)}
                className="px-6 py-2.5 rounded-xl border border-[#E8E2DC] text-xs font-bold text-[#282326] hover:bg-gray-50"
              >
                Submit Another Report
              </button>
            </div>
          </div>

          {/* SMART MATCHING DETECTED ALERT */}
          {submissionResult.matches && submissionResult.matches.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">
                    Possible Match Found in Campus Registry!
                  </h3>
                  <p className="text-xs text-amber-800">
                    Our system detected an existing found item that closely resembles your report.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {submissionResult.matches.slice(0, 2).map(({ item, score }) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E2DC] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {score}% Match Confidence
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
                        <span>View Details &amp; Claim Item</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular Form */
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#681D35] bg-white px-3 py-1 rounded-full border border-[#E8E2DC]">
              Student &amp; Faculty Service
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#282326] font-serif">
              Lost Something? Report It Here.
            </h1>
            <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
              Provide thorough details about your missing belonging. Our platform automatically scans newly found items and alerts you as soon as a potential match is registered.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="bg-white p-7 sm:p-10 rounded-3xl border border-[#E8E2DC] shadow-card space-y-6">
            
            {/* 1. Item Core Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#681D35] pb-2 border-b border-[#E8E2DC]">
                1. Item Characteristics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Item Name <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    placeholder="e.g. Black North Face Backpack / AirPods Pro"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none ${
                      errors.itemName ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                    }`}
                  />
                  {errors.itemName && <p className="text-[11px] text-red-500 mt-1">{errors.itemName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Item Category <span className="text-[#681D35]">*</span>
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
                  Detailed Description <span className="text-[#681D35]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe color, brand, model, condition, contents, stickers, or attachments..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none resize-none ${
                    errors.description ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                  }`}
                />
                {errors.description && <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#282326] mb-1.5">
                  Distinguishing Features (Private Security Note)
                </label>
                <p className="text-[11px] text-[#777078] mb-1.5">
                  Private information that only you know (e.g. passcode pattern, engraving, item serial number, internal contents). This is never shown publicly.
                </p>
                <input
                  type="text"
                  value={formData.distinguishingFeatures}
                  onChange={(e) => setFormData({ ...formData, distinguishingFeatures: e.target.value })}
                  placeholder="e.g. Engraved initials 'AM'; lockscreen is a golden retriever; small tear inside lining"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                />
              </div>

              {/* Photo Upload Facility */}
              <div>
                <label className="block text-xs font-bold text-[#282326] mb-1.5">
                  Photograph of the Lost Item (Past picture, box photo, or similar image)
                </label>
                <p className="text-[11px] text-[#777078] mb-2">
                  Uploading an image allows campus staff and students to visually confirm your lost belonging.
                </p>

                {imagePreview ? (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DC] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Lost Item Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-[#E8E2DC] shadow-sm"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#282326] block">Photograph Attached</span>
                        <span className="text-[11px] text-emerald-600 font-medium">Ready for comparison scanning</span>
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
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#8C4058]/50 hover:border-[#681D35] bg-[#FAF8F5] hover:bg-white cursor-pointer transition-all group text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#681D35]/10 text-[#681D35] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#681D35]">
                      Click to upload an image of your lost belonging
                    </span>
                    <span className="text-xs text-[#777078] mt-1">
                      PNG, JPG, or WEBP from your phone or computer
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

            {/* 2. Loss Time & Location */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2DC]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#681D35] pb-2 border-b border-[#E8E2DC]">
                2. When &amp; Where Was It Last Seen?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Date Lost <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateLost}
                    onChange={(e) => setFormData({ ...formData, dateLost: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Location Last Seen <span className="text-[#681D35]">*</span>
                  </label>
                  <select
                    value={formData.locationLost}
                    onChange={(e) => setFormData({ ...formData, locationLost: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  >
                    {CAMPUS_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Claimant Contact Information (Private) */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2DC]">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2DC]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#681D35]">
                  3. Your Contact Information
                </h3>
                <span className="text-[11px] text-[#777078] flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Protected &amp; Confidential
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Full Name <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.reporterName}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    placeholder="Alex Mercer"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none ${
                      errors.reporterName ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                    }`}
                  />
                  {errors.reporterName && <p className="text-[11px] text-red-500 mt-1">{errors.reporterName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    College Email <span className="text-[#681D35]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.reporterEmail}
                    onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                    placeholder="name@college.edu"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none ${
                      errors.reporterEmail ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                    }`}
                  />
                  {errors.reporterEmail && <p className="text-[11px] text-red-500 mt-1">{errors.reporterEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#282326] mb-1.5">
                    Phone Number (Private)
                  </label>
                  <input
                    type="tel"
                    value={formData.reporterPhone}
                    onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DC] text-sm bg-white focus:border-[#681D35] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E8E2DC] flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Registering Report...' : 'Submit Lost Report'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
