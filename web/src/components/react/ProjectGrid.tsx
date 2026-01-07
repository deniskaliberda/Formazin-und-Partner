'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  location: string;
  description: string;
  image: string;
  size?: 'small' | 'medium' | 'large';
}

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className={cn(
              'relative cursor-pointer group overflow-hidden bg-white border border-gray-200',
              'hover:border-din-blue transition-colors duration-200',
              // Bento-Grid: Unterschiedliche Größen
              project.size === 'large' && 'md:col-span-2 md:row-span-2',
              project.size === 'medium' && 'md:row-span-1',
            )}
          >
            {/* Bild */}
            <motion.div
              className={cn(
                'relative overflow-hidden',
                project.size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'
              )}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Hover Overlay mit DIN-Blau */}
              <motion.div
                className="absolute inset-0 bg-din-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span className="font-narrow text-white text-sm uppercase tracking-wider">
                  Projekt ansehen →
                </span>
              </motion.div>
            </motion.div>

            {/* Card Content */}
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-xl text-construction-grey">
                {project.title}
              </h3>
              
              <div className="font-narrow text-xs uppercase tracking-wider text-signal-grey space-x-2">
                <span>{project.category}</span>
                <span>|</span>
                <span>{project.year}</span>
                <span>|</span>
                <span>{project.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 z-40"
            />

            {/* Expanded Card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`project-${selectedProject.id}`}
                className="relative max-w-4xl w-full bg-white overflow-hidden pointer-events-auto"
                style={{
                  maxHeight: '90vh',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-colors border border-gray-200"
                >
                  <X className="w-5 h-5 text-construction-grey" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
                  {/* Hero Image */}
                  <motion.div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 25 }}
                    className="p-8 lg:p-12 space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="font-bold text-3xl lg:text-4xl text-construction-grey">
                        {selectedProject.title}
                      </h2>
                      
                      <div className="font-narrow text-sm uppercase tracking-wider text-signal-grey space-x-3">
                        <span>{selectedProject.category}</span>
                        <span>|</span>
                        <span>{selectedProject.year}</span>
                        <span>|</span>
                        <span>{selectedProject.location}</span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Platzhalter für weitere Details */}
                    <div className="grid md:grid-cols-2 gap-6 pt-6">
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-construction-grey">
                          Leistungen
                        </h4>
                        <ul className="text-gray-600 space-y-1 text-sm">
                          <li>• Tragwerksplanung</li>
                          <li>• Bauphysik</li>
                          <li>• Brandschutzkonzept</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-construction-grey">
                          Bauherr
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Vertraulich
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
