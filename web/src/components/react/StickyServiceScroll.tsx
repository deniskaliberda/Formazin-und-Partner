'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Service {
  number: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
}

interface StickyServiceScrollProps {
  services: Service[];
}

export default function StickyServiceScroll({ services }: StickyServiceScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5, // Aktiviert wenn 50% sichtbar
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Linke Spalte: Scrollbarer Content */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.number}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-index={index}
              className="min-h-[80vh] flex flex-col justify-center py-16 md:py-20 border-b border-gray-200 last:border-b-0"
            >
              {/* Mobile: Bild oben */}
              <div className="md:hidden mb-8 aspect-[4/3] overflow-hidden border border-gray-200">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nummer & Titel */}
              <div className="flex items-start gap-6 lg:gap-8 mb-8">
                <div className="font-black text-6xl lg:text-7xl text-din-blue leading-none">
                  {service.number}
                </div>
                <div className="flex-1 pt-2">
                  <h2 className="font-bold text-3xl lg:text-4xl text-construction-grey mb-4">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Beschreibung */}
              <div className="space-y-6 max-w-xl">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                {/* SEO Keywords */}
                <div className="pt-4">
                  <p className="font-narrow text-xs uppercase tracking-wider text-signal-grey">
                    {service.keywords}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rechte Spalte: Sticky Image (nur Desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-24 h-[80vh]">
            <div className="relative w-full h-full overflow-hidden border border-gray-200">
              {services.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.05,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="font-narrow text-xs uppercase tracking-wider text-white/80">
                      {service.number} / {service.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
