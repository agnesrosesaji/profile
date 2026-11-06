import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories, explorationTechnologies } from '../data/portfolio';
import { Layout, Smartphone, Code2, BrainCircuit, Sparkles, Compass } from 'lucide-react';

const iconMap = {
  Layout: Layout,
  Smartphone: Smartphone,
  Code2: Code2,
  BrainCircuit: BrainCircuit,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#FFF7FA] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DF86A8] bg-[#FFF7FA] px-3.5 py-1.5 rounded-full border border-[#F1E7EC] shadow-sm mb-3">
            Core Interests &amp; Learning
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252127] tracking-tight">
            What I'm Exploring
          </h2>
          <p className="text-[#777078] text-base mt-2 max-w-xl">
            As a student developer, my focus is on understanding foundational concepts, experimenting with modern tools, and continuously broadening my technical horizon.
          </p>
          <div className="w-12 h-1 bg-[#F2A3BE] rounded-full mt-3" />
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code2;

            return (
              <motion.div
                key={category.id}
                className="group p-8 rounded-3xl bg-[#FFF7FA]/60 hover:bg-white border border-[#F1E7EC] hover:border-[#E8B5C8] hover:shadow-card transition-all duration-300 relative flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#F1E7EC] group-hover:border-[#DF86A8]/40 group-hover:bg-[#F2A3BE]/10 flex items-center justify-center text-[#DF86A8] transition-colors shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#777078] bg-white px-3 py-1 rounded-full border border-[#F1E7EC]">
                      {category.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#252127] mb-2 group-hover:text-[#DF86A8] transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-[#777078] text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-bold text-[#777078] mb-2.5">
                    Suggested Exploration Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.suggestedTech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-[#F1E7EC] text-[#252127] group-hover:border-[#E8B5C8] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centralized Technology Suggestions Banner */}
        <motion.div
          className="p-8 rounded-3xl bg-gradient-to-r from-[#FFF7FA] via-white to-[#FFF7FA] border border-[#F1E7EC] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DF86A8] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technology Workspace</span>
            </div>
            <h4 className="text-lg font-bold text-[#252127] mb-1">
              Active Learning &amp; Suggested Tools
            </h4>
            <p className="text-xs text-[#777078] leading-relaxed">
              Curated technologies and environments currently in active coursework or personal exploration. Editable centrally via <code>portfolio.js</code>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-xl">
            {explorationTechnologies.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#F1E7EC] text-xs font-bold text-[#252127] shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF86A8]" />
                {tech.name}
                <span className="text-[10px] text-[#777078] font-normal">({tech.category})</span>
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

