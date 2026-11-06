import React from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/portfolio';
import { ArrowDown, Sparkles, MapPin, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Soft Pink Ambient Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-[#FFF7FA] via-[#F2A3BE]/18 to-[#E8B5C8]/25 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-[#F2A3BE]/12 blur-[90px] rounded-full" />
        <div className="absolute top-36 left-8 w-[320px] h-[320px] bg-[#E8B5C8]/14 blur-[80px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Hero Typography & Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7FA] border border-[#F1E7EC] text-[#DF86A8] text-[11px] font-extrabold uppercase tracking-widest mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DF86A8]" />
              <span>{personalData.eyebrow}</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#252127] tracking-tight leading-[1.12] mb-4">
              I'm <span className="relative inline-block text-[#252127]">
                {personalData.name}
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#F2A3BE]/40 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Professional Subtitle */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#DF86A8] tracking-tight mb-5">
              {personalData.shortRole}
            </h2>

            {/* Supporting Introduction */}
            <p className="text-[#777078] text-base sm:text-lg leading-relaxed max-w-xl mb-6">
              {personalData.heroIntroduction}
            </p>

            {/* Tagline Card */}
            <div className="w-full max-w-xl p-4 rounded-2xl bg-[#FFF7FA]/80 border border-[#F1E7EC] backdrop-blur-sm mb-8 flex items-center gap-3 shadow-soft">
              <div className="w-2 h-10 rounded-full bg-gradient-to-b from-[#F2A3BE] to-[#DF86A8]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#777078] font-semibold">Personal Tagline</p>
                <p className="text-sm sm:text-base font-bold text-[#252127] italic">
                  "{personalData.tagline}"
                </p>
              </div>
            </div>

            {/* CTAs & Quick Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#252127] hover:bg-[#3d3740] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore My Journey</span>
                <ChevronRight className="w-4 h-4 text-[#F2A3BE]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF7FA] text-[#252127] border border-[#F1E7EC] hover:border-[#E8B5C8] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Location & Status Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#777078] font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F1E7EC] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#DF86A8]" />
                {personalData.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F1E7EC] shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-[#DF86A8]" />
                {personalData.status}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Abstract Geometric Art (No Profile Photo) */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Layer 1: Outer Glass Composition Card */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-white/90 via-[#FFF7FA]/80 to-[#F2A3BE]/20 border border-[#F1E7EC] shadow-card backdrop-blur-xl -rotate-2" />

              {/* Layer 2: Geometric Centerpiece with Soft Pink Rings */}
              <motion.div
                className="relative z-10 w-72 h-72 rounded-full border border-[#E8B5C8]/40 bg-gradient-to-tr from-[#FFF7FA] via-white to-[#F2A3BE]/25 p-5 shadow-soft flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#DF86A8]/30 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#F2A3BE]/30 via-[#E8B5C8]/20 to-white/90 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#F1E7EC] shadow-sm flex items-center justify-center mb-2">
                        <span className="font-extrabold text-2xl text-[#252127]">AR<span className="text-[#DF86A8]">.</span></span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#777078]">
                        CS Student
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Minimal Detail Cards */}
              <motion.div
                className="absolute -top-3 -right-2 z-20 bg-white/90 backdrop-blur-md border border-[#F1E7EC] p-3.5 rounded-2xl shadow-hover flex items-center gap-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-center justify-center text-[#DF86A8]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#252127]">B.Tech CSE</p>
                  <p className="text-[10px] text-[#777078]">Class of 2026</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-3 z-20 bg-white/90 backdrop-blur-md border border-[#F1E7EC] p-3.5 rounded-2xl shadow-hover flex items-center gap-3"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-center justify-center text-[#DF86A8]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#252127]">Future Developer</p>
                  <p className="text-[10px] text-[#777078]">Amal Jyothi College</p>
                </div>
              </motion.div>

              {/* Decorative Geometric Rings */}
              <div className="absolute -z-10 w-96 h-96 rounded-full border border-[#F2A3BE]/25 scale-110 pointer-events-none" />
              <div className="absolute -z-10 w-80 h-80 rounded-full border border-[#E8B5C8]/20 scale-125 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

