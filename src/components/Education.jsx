import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/portfolio';
import { GraduationCap, MapPin, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#FFF7FA]/50 relative overflow-hidden border-t border-[#F1E7EC]/60">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F2A3BE]/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DF86A8] bg-white px-3.5 py-1.5 rounded-full border border-[#F1E7EC] shadow-sm mb-3">
            Formal Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252127] tracking-tight">
            My Academic Journey
          </h2>
          <p className="text-[#777078] text-base mt-2 max-w-xl">
            Pursuing a rigorous engineering curriculum that provides the theoretical backbone and practical laboratory exercises for computer science.
          </p>
          <div className="w-12 h-1 bg-[#F2A3BE] rounded-full mt-3" />
        </div>

        {/* Education Timeline Card */}
        <div className="max-w-3xl mx-auto">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className="relative pl-8 sm:pl-10 before:absolute before:left-3 before:top-3 before:bottom-0 before:w-0.5 before:bg-[#F1E7EC]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#DF86A8] flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#DF86A8]" />
              </div>

              {/* Education Main Card */}
              <div className="bg-white p-8 rounded-3xl border border-[#F1E7EC] shadow-soft hover:shadow-card transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7FA] border border-[#F1E7EC] text-xs font-bold text-[#DF86A8]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Graduation Target: {item.academicYear}</span>
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#252127] text-white">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-center justify-center text-[#DF86A8] shrink-0 mt-1 shadow-sm">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#252127]">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#DF86A8]">
                      {item.department}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm text-[#777078] pb-6 border-b border-[#F1E7EC]">
                  <p className="font-semibold text-[#252127]">
                    {item.institution}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-[#777078]">
                    <MapPin className="w-3.5 h-3.5 text-[#DF86A8]" />
                    {item.location}
                  </p>
                </div>

                {/* Academic Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#DF86A8]" />
                    <span>Curricular Focus Areas</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-sm text-[#777078]">
                        <CheckCircle2 className="w-4 h-4 text-[#DF86A8] mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

