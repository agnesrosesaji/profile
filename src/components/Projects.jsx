import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectData } from '../data/portfolio';
import { Github, ExternalLink, Code2, Sparkles, FolderGit2, Info } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Development', 'App Development', 'Programming'];

  const filteredProjects = filter === 'All'
    ? projectData
    : projectData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Background soft pink blur */}
      <div className="absolute top-1/4 -right-36 w-96 h-96 bg-[#FFF7FA] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DF86A8] bg-[#FFF7FA] px-3.5 py-1.5 rounded-full border border-[#F1E7EC] shadow-sm mb-3 inline-block">
              Project Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252127] tracking-tight">
              Things I'm Building
            </h2>
            <p className="text-[#777078] text-base mt-2 max-w-xl">
              A curated space for active web applications, academic lab repositories, and upcoming software experiments.
            </p>
            <div className="w-12 h-1 bg-[#F2A3BE] rounded-full mt-3" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#FFF7FA] p-1.5 rounded-full border border-[#F1E7EC] self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  filter === cat
                    ? 'bg-white text-[#252127] shadow-sm border border-[#F1E7EC]'
                    : 'text-[#777078] hover:text-[#252127]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Note on Editable Placeholders */}
        <div className="mb-10 p-4 rounded-2xl bg-[#FFF7FA] border border-[#F1E7EC] flex items-start sm:items-center gap-3 text-xs text-[#777078]">
          <Info className="w-4 h-4 text-[#DF86A8] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong>Developer Note:</strong> Project cards are configured in <code>src/data/portfolio.js</code> with slots for title, description, tags, GitHub repository, and live demo links as you create new builds.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-white rounded-3xl border border-[#F1E7EC] hover:border-[#E8B5C8] p-7 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF7FA] border border-[#F1E7EC] group-hover:border-[#E8B5C8] flex items-center justify-center text-[#DF86A8] transition-colors shadow-sm">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#777078] bg-[#FFF7FA] px-2.5 py-0.5 rounded-full border border-[#F1E7EC]">
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-bold text-white bg-[#DF86A8] px-2.5 py-0.5 rounded-full shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold text-[#DF86A8] uppercase tracking-wider block mb-1">
                  {project.subtitle}
                </span>

                <h3 className="text-xl font-bold text-[#252127] mb-2.5 group-hover:text-[#DF86A8] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[#777078] text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-[#F1E7EC]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#FFF7FA] text-[#252127] border border-[#F1E7EC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#252127] hover:text-[#DF86A8] transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DF86A8] hover:text-[#252127] transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-medium text-[#777078]">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

