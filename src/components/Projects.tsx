import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Globe, Shield, Wifi, X, Zap, Github, PlayCircle, FileText } from 'lucide-react';
import ThreeJSScene from './ThreeJSScene';
import type Project from '../types/project';
import project_data from '../data/projects.json'


const geometryOptions: Array<'torus' | 'octahedron' | 'icosahedron'> = ['torus', 'octahedron', 'icosahedron'];
const meshColors = [0x7b2cbf, 0xe0aaff, 0x00f5d4];
const iconPalette = [Zap, Shield, Wifi, Globe];

const projects: Project[] = project_data;

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeProject]);

  const openProject = (project: Project) => {
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-darkmatter py-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-nebula/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-quantum/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-16 text-center text-4xl font-bold text-plasma">
            <span className="text-quantum">/</span> Recent Projects <span className="text-quantum">/</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = iconPalette[index % iconPalette.length];
            const geometryType = geometryOptions[index % geometryOptions.length];
            const meshColor = meshColors[index % meshColors.length];
            const teaser = project.summary.length > 160 ? `${project.summary.slice(0, 160)}…` : project.summary;
            const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <motion.div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-nebula/30 bg-darkmatter/70 shadow-[0_0_25px_rgba(123,44,191,0.25)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,245,212,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quantum"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                role="button"
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 transition-opacity duration-500 group-hover:opacity-35`}></div>
                <div className="pointer-events-none absolute -bottom-20 -left-6 h-48 w-48 rounded-full bg-quantum/15 blur-3xl"></div>
                <div className="pointer-events-none absolute -top-24 -right-10 h-40 w-40 rounded-full bg-plasma/10 blur-3xl"></div>

                <div className="relative z-10 flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-quantum/10 p-3 ring-2 ring-quantum/30 shadow-[0_0_30px_rgba(0,245,212,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_45px_rgba(0,245,212,0.55)]">
                        <Icon className="h-6 w-6 text-quantum" />
                      </div>
                      <h3 className="text-2xl font-semibold text-plasma drop-shadow-[0_4px_18px_rgba(224,170,255,0.25)]">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-quantum/60">
                      expand
                    </span>
                  </div>
                    <ThreeJSScene
                      containerId={`${slug}-threejs`}
                      geometryType={geometryType}
                      modelUrl={project.model}
                      modelScale={5}
                      targetSize={8}
                      lightingPreset='dramatic'
                      color={meshColor}
                      className="threejs-container mb-4 rounded-xl border border-quantum/20"
                    />

                  <p className="text-sm leading-relaxed text-plasma/80 italic">
                    {teaser}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-quantum/30 bg-quantum/10 px-3 py-1 text-[11px] uppercase tracking-wide text-quantum shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-nebula/30 pt-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-plasma/60">
                      mission briefing
                    </span>
                    <ExternalLink className="h-4 w-4 text-quantum transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-darkmatter/80 backdrop-blur-2xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeProject.title + ' project details'}
              className="relative w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden rounded-3xl border border-nebula/40 bg-gradient-to-br from-darkmatter/95 via-cosmic/85 to-darkmatter/95 shadow-[0_0_80px_rgba(0,245,212,0.25)]"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-quantum/30 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-nebula/25 blur-3xl"></div>
              </div>
              <div className="relative z-10 flex h-full flex-col min-h-0">
                <div className="sticky top-0 z-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-nebula/30 bg-gradient-to-r from-darkmatter/90 via-cosmic/80 to-darkmatter/90 px-8 pt-6 pb-4 backdrop-blur-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-quantum/70">Recent Projects</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-bold text-plasma leading-tight">
                      {activeProject.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeProject}
                    className="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-quantum/40 bg-darkmatter/70 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-quantum transition hover:bg-quantum/10"
                  >
                    Close <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-8 pb-8 pt-6 space-y-8 scrollbar-thin scrollbar-thumb-quantum/40 scrollbar-track-transparent">
                  <div className={`grid gap-6 ${activeProject.image && activeProject.model ? 'md:grid-cols-2' : ''}`}>
                    {activeProject.image && (
                      <div className="relative overflow-hidden rounded-2xl border border-quantum/25 bg-black/40 aspect-video">
                        <img
                          src={new URL(`../assets/images/${activeProject.image}`, import.meta.url).href}
                          alt={`${activeProject.title} image preview`}
                          className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-darkmatter/10 to-quantum/10" />
                        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-quantum/40 bg-darkmatter/60 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-quantum/80 backdrop-blur-sm">image</span>
                      </div>
                    )}
                    {activeProject.model && (
                      <ThreeJSScene
                        containerId={`modal-${activeProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        geometryType={geometryOptions[0]}
                        modelUrl={activeProject.model}
                        modelScale={5}
                        targetSize={5}
                        color={0x00f5d4}
                        className={`threejs-container h-56 rounded-2xl border border-quantum/25 ${activeProject.image ? '' : 'md:col-span-2'}`}
                      />
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: 'Summary', content: activeProject.summary },
                      { label: 'My role', content: activeProject.role },
                      { label: 'Key features', content: activeProject.features },
                      { label: 'Tech stack', content: activeProject.tech },
                    ].map((section) => (
                      <div
                        key={section.label}
                        className="rounded-xl border border-nebula/30 bg-darkmatter/60 p-4 shadow-[0_0_25px_rgba(123,44,191,0.2)]"
                      >
                        <h4 className="mb-2 text-xs uppercase tracking-[0.3em] text-quantum">
                          {section.label}
                        </h4>
                        <p className="text-sm leading-relaxed text-plasma/85 whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-nebula/30 pt-4">
                    {activeProject.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-quantum/30 bg-quantum/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-quantum"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 border-t border-nebula/30 pt-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-plasma/60">
                      New Inovation Ahead • {activeProject.title}
                    </p>
                    {activeProject.links && activeProject.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {activeProject.links.map((link) => {
                          const label = link.label || 'Link';
                          const lower = label.toLowerCase();
                          const Icon = lower.includes('repo') || lower.includes('git') ? Github
                            : lower.includes('video') || lower.includes('demo') ? PlayCircle
                            : lower.includes('doc') ? FileText
                            : lower.includes('site') || lower.includes('live') || lower.includes('app') ? Globe
                            : ExternalLink;
                          return (
                            <a
                              key={label + link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-quantum/40 bg-quantum/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-quantum transition hover:bg-quantum/20 hover:shadow-[0_0_18px_rgba(0,245,212,0.4)]"
                            >
                              <Icon className="h-4 w-4" /> {label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;