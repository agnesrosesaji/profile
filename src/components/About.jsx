import React from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/portfolio';
import { User, MapPin, GraduationCap, Briefcase, Sparkles, Compass } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#FFF7FA]/50 relative overflow-hidden border-y border-[#F1E7EC]/60">
      {/* Subtle organic pink shape in background */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#F2A3BE]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DF86A8] bg-white px-3.5 py-1.5 rounded-full border border-[#F1E7EC] shadow-sm mb-3">
            Background &amp; Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252127] tracking-tight">
            A Little About Me
          </h2>
          <div className="w-12 h-1 bg-[#F2A3BE] rounded-full mt-3" />
        </div>

        {/* Sophisticated Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Column */}
          <motion.div
            className="lg:col-span-7 space-y-5 text-[#252127]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-3xl border border-[#F1E7EC] shadow-sm space-y-4 leading-relaxed">
              {personalData.aboutStory.map((paragraph, index) => (
                <p key={index} className="text-[#777078] text-base sm:text-[17px] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-[#F1E7EC] flex items-center gap-3 text-xs font-semibold text-[#DF86A8]">
                <Sparkles className="w-4 h-4 text-[#DF86A8]" />
                <span>Driven by curiosity, consistency, and an eagerness to learn.</span>
              </div>
            </div>
          </motion.div>

          {/* Personal Information Panel */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white p-7 rounded-3xl border border-[#F1E7EC] shadow-soft space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#F1E7EC]">
                <div className="w-10 h-10 rounded-xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-center justify-center text-[#DF86A8]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#252127]">Quick Facts</h3>
                  <p className="text-xs text-[#777078]">Profile at a glance</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-[#777078]">Full Name</span>
                    <span className="font-bold text-[#252127]">{personalData.name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-[#777078]">Education</span>
                    <span className="font-bold text-[#252127] block">{personalData.degree}</span>
                    <span className="text-xs text-[#777078]">{personalData.department}</span>
                    <span className="block text-xs text-[#777078] mt-0.5">{personalData.college}</span>
                    <span className="inline-block mt-1 text-[11px] font-bold text-[#DF86A8] bg-[#FFF7FA] px-2 py-0.5 rounded border border-[#F1E7EC]">
                      Expected 2026
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-[#777078]">Location</span>
                    <span className="font-bold text-[#252127]">{personalData.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-[#DF86A8] mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-[#777078]">Professional Status</span>
                    <span className="font-bold text-[#252127]">{personalData.experienceLevel}</span>
                    <p className="text-xs text-[#777078] mt-0.5">
                      {personalData.careerObjective}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1E7EC]">
                <a
                  href="#contact"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFF7FA] hover:bg-[#F2A3BE] hover:text-white text-[#252127] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-[#F1E7EC] hover:border-[#DF86A8] transition-all duration-200"
                >
                  <span>Connect With Agnes</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

