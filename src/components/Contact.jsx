import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactDetails, personalData } from '../data/portfolio';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, Github, Linkedin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null); // 'drafted'

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct valid mailto URL with pre-filled fields
    const recipient = personalData.email;
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Agnes,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Trigger user's email client
    window.location.href = mailtoUrl;

    // Show transparent status (never falsely claims background server email delivery)
    setSubmittedStatus('drafted');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#FFF7FA]/50 relative overflow-hidden border-t border-[#F1E7EC]/60">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F2A3BE]/12 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DF86A8] bg-white px-3.5 py-1.5 rounded-full border border-[#F1E7EC] shadow-sm mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252127] tracking-tight">
            {contactDetails.heading}
          </h2>
          <p className="text-[#777078] text-base mt-2 max-w-xl">
            {contactDetails.copy}
          </p>
          <div className="w-12 h-1 bg-[#F2A3BE] rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Verified Details */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Direct Email Card */}
            <div className="bg-white p-7 rounded-3xl border border-[#F1E7EC] shadow-soft space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-center justify-center text-[#DF86A8] shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#777078] block">Direct Email</span>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="font-bold text-[#252127] hover:text-[#DF86A8] transition-colors text-base"
                  >
                    {personalData.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFF7FA] hover:bg-white text-[#252127] border border-[#F1E7EC] hover:border-[#E8B5C8] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied rose@gmail.com</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#DF86A8]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Academic & Geographic Information */}
            <div className="bg-white p-7 rounded-3xl border border-[#F1E7EC] shadow-soft space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#777078] block">Location</span>
                  <span className="font-bold text-[#252127]">{personalData.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F1E7EC]">
                <MessageSquare className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#777078] block">Opportunities</span>
                  <span className="font-bold text-[#252127] block">{personalData.status}</span>
                  <span className="text-xs text-[#777078]">{personalData.careerObjective}</span>
                </div>
              </div>

              {/* Social Media Placeholders */}
              <div className="pt-4 border-t border-[#F1E7EC]">
                <span className="text-xs font-semibold text-[#777078] block mb-3">Professional Profiles (Placeholders)</span>
                <div className="flex gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#FFF7FA] border border-[#F1E7EC] text-[#252127] hover:text-[#DF86A8] hover:border-[#E8B5C8] transition-colors"
                    title="GitHub Placeholder"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#FFF7FA] border border-[#F1E7EC] text-[#252127] hover:text-[#DF86A8] hover:border-[#E8B5C8] transition-colors"
                    title="LinkedIn Placeholder"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Transparent Mailto Engine */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#F1E7EC] shadow-soft">
              <h3 className="text-xl font-bold text-[#252127] mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-[#777078] mb-6">
                Fill in the details below to open a formatted message directly to Agnes' inbox.
              </p>

              {submittedStatus === 'drafted' && (
                <div className="mb-6 p-4 rounded-2xl bg-[#FFF7FA] border border-[#E8B5C8] flex items-start gap-3 text-xs text-[#252127]">
                  <CheckCircle2 className="w-4 h-4 text-[#DF86A8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#252127]">Email drafted successfully!</p>
                    <p className="text-[#777078] mt-0.5">
                      Your default mail application has been opened with your pre-filled message addressed to <strong>{personalData.email}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-[#252127] mb-1.5">
                      Your Name <span className="text-[#DF86A8]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Maya Chen"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#252127] placeholder:text-[#777078]/50 bg-[#FFF7FA]/50 focus:bg-white focus:outline-none transition-all ${
                        errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#F1E7EC] focus:border-[#DF86A8]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#252127] mb-1.5">
                      Your Email <span className="text-[#DF86A8]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#252127] placeholder:text-[#777078]/50 bg-[#FFF7FA]/50 focus:bg-white focus:outline-none transition-all ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#F1E7EC] focus:border-[#DF86A8]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-[#252127] mb-1.5">
                    Subject <span className="text-[#DF86A8]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Inquiry / Project Discussion"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#252127] placeholder:text-[#777078]/50 bg-[#FFF7FA]/50 focus:bg-white focus:outline-none transition-all ${
                      errors.subject ? 'border-red-400 focus:border-red-500' : 'border-[#F1E7EC] focus:border-[#DF86A8]'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#252127] mb-1.5">
                    Message <span className="text-[#DF86A8]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note or opportunity details here..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#252127] placeholder:text-[#777078]/50 bg-[#FFF7FA]/50 focus:bg-white focus:outline-none transition-all resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#F1E7EC] focus:border-[#DF86A8]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F2A3BE] hover:bg-[#DF86A8] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Compose &amp; Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

