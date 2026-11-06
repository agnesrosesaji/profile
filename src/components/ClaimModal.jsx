'use client';

import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { X, ShieldCheck, Upload, AlertCircle, CheckCircle2, Lock, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function ClaimModal() {
  const { claimingItem, setClaimingItem, currentUser, submitClaim, setActivePage } = useCampus();

  const [formData, setFormData] = useState({
    claimantName: currentUser.name || '',
    claimantEmail: currentUser.email || '',
    claimantPhone: '',
    distinguishingCharacteristics: '',
    verificationAnswer: '',
    referencePhoto: ''
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!claimingItem) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, referencePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview('');
    setFormData(prev => ({ ...prev, referencePhoto: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.claimantName.trim()) errs.claimantName = 'Full name is required.';
    if (!formData.claimantEmail.trim() || !formData.claimantEmail.includes('@')) {
      errs.claimantEmail = 'Valid college email is required.';
    }
    if (!formData.distinguishingCharacteristics.trim() || formData.distinguishingCharacteristics.length < 10) {
      errs.distinguishingCharacteristics = 'Please describe identifying details (e.g. scratches, stickers, wallpaper, serial marks).';
    }
    if (!formData.verificationAnswer.trim()) {
      errs.verificationAnswer = 'Please state how you will verify ownership (e.g. unlock with PIN, matching receipt, or contents).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      submitClaim({
        itemId: claimingItem.id,
        itemTitle: claimingItem.title,
        ...formData,
        referencePhoto: photoPreview || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80'
      });
      setIsSubmitting(false);
      setClaimingItem(null);
      setActivePage('my-reports');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-modal border border-[#E8E2DC] max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8E2DC] flex items-center justify-between bg-[#F7F3EF]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#681D35] text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#282326]">Claim This Found Item</h3>
              <p className="text-xs text-[#777078]">Upload proof &amp; verify ownership with college staff</p>
            </div>
          </div>
          <button
            onClick={() => setClaimingItem(null)}
            className="p-2 rounded-full text-[#777078] hover:text-[#282326] hover:bg-black/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 overflow-y-auto space-y-6">
          
          {/* Comparison Preview: Found by College vs Your Uploaded Proof */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#681D35]">
                Item Verification Preview
              </span>
              <span className="text-[10px] text-[#777078] font-mono">ID: {claimingItem.id}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Photo 1: What was found by the college */}
              <div className="p-3 bg-white rounded-xl border border-[#E8E2DC] text-center space-y-2">
                <span className="text-[10px] font-bold text-[#777078] uppercase block">
                  1. Found by College Staff
                </span>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={claimingItem.image}
                    alt={claimingItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-bold text-[#282326] truncate">
                  {claimingItem.title}
                </p>
              </div>

              {/* Photo 2: What claimant uploads as their lost thing */}
              <div className="p-3 bg-white rounded-xl border border-dashed border-[#8C4058] text-center space-y-2 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-[#681D35] uppercase block">
                  2. Your Uploaded Proof Image
                </span>

                {photoPreview ? (
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 group">
                    <img
                      src={photoPreview}
                      alt="Your Proof"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="aspect-[4/3] rounded-lg border border-dashed border-[#E8E2DC] hover:border-[#681D35] bg-[#FAF8F5] flex flex-col items-center justify-center p-3 cursor-pointer transition-colors group">
                    <Upload className="w-6 h-6 text-[#8C4058] group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs font-bold text-[#681D35]">Upload Your Photo</span>
                    <span className="text-[10px] text-[#777078] mt-0.5">Old photo, receipt, or matching picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}

                <p className="text-[11px] text-[#777078] truncate">
                  {photoPreview ? 'Proof attached' : 'Click above to attach picture'}
                </p>
              </div>
            </div>
          </div>

          {/* Claimant Identity Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#282326] mb-1.5">
                Your Full Name <span className="text-[#681D35]">*</span>
              </label>
              <input
                type="text"
                value={formData.claimantName}
                onChange={(e) => setFormData({ ...formData, claimantName: e.target.value })}
                placeholder="e.g. Alex Mercer"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none ${
                  errors.claimantName ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                }`}
              />
              {errors.claimantName && <p className="text-[11px] text-red-500 mt-1">{errors.claimantName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#282326] mb-1.5">
                College Email Address <span className="text-[#681D35]">*</span>
              </label>
              <input
                type="email"
                value={formData.claimantEmail}
                onChange={(e) => setFormData({ ...formData, claimantEmail: e.target.value })}
                placeholder="student@college.edu"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none ${
                  errors.claimantEmail ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
                }`}
              />
              {errors.claimantEmail && <p className="text-[11px] text-red-500 mt-1">{errors.claimantEmail}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#282326] mb-1.5">
              Contact Phone (Optional - Confidential)
            </label>
            <input
              type="tel"
              value={formData.claimantPhone}
              onChange={(e) => setFormData({ ...formData, claimantPhone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DC] focus:border-[#681D35] text-xs sm:text-sm bg-white focus:outline-none"
            />
          </div>

          {/* Unique Identifying Characteristics */}
          <div>
            <label className="block text-xs font-bold text-[#282326] mb-1.5">
              Describe Why This Belonging Is Yours <span className="text-[#681D35]">*</span>
            </label>
            <p className="text-[11px] text-[#777078] mb-1.5">
              Explain identifying characteristics not shown in public listing (e.g. phone lock screen, scratches, stickers, internal pocket contents, markings).
            </p>
            <textarea
              rows={3}
              value={formData.distinguishingCharacteristics}
              onChange={(e) => setFormData({ ...formData, distinguishingCharacteristics: e.target.value })}
              placeholder="e.g. The case has a slight scratch on the bottom right and my initials are written inside the zipper."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none resize-none ${
                errors.distinguishingCharacteristics ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
              }`}
            />
            {errors.distinguishingCharacteristics && (
              <p className="text-[11px] text-red-500 mt-1">{errors.distinguishingCharacteristics}</p>
            )}
          </div>

          {/* Verification Answer */}
          <div>
            <label className="block text-xs font-bold text-[#282326] mb-1.5">
              How Will You Prove Ownership Upon Collection? <span className="text-[#681D35]">*</span>
            </label>
            <input
              type="text"
              value={formData.verificationAnswer}
              onChange={(e) => setFormData({ ...formData, verificationAnswer: e.target.value })}
              placeholder="e.g. I can unlock device with passcode / have matching student roll number / purchase receipt."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white focus:outline-none ${
                errors.verificationAnswer ? 'border-red-400' : 'border-[#E8E2DC] focus:border-[#681D35]'
              }`}
            />
            {errors.verificationAnswer && (
              <p className="text-[11px] text-red-500 mt-1">{errors.verificationAnswer}</p>
            )}
          </div>

          {/* Security policy note */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DC] flex items-center gap-3 text-xs text-[#777078]">
            <Lock className="w-4 h-4 text-[#8C4058] shrink-0" />
            <span>
              All claims are verified by campus administration before physical handover.
            </span>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E8E2DC]">
            <button
              type="button"
              onClick={() => setClaimingItem(null)}
              className="px-5 py-2.5 rounded-xl border border-[#E8E2DC] text-xs font-bold text-[#282326] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#681D35] hover:bg-[#501528] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Claim...' : 'Claim That This Is Mine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
