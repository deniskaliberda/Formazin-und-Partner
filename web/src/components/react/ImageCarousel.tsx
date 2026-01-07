import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraint, setDragConstraint] = useState(-1000);
  const x = useMotionValue(0);

  // Calculate drag constraint on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDragConstraint(-(images.length * 500 - window.innerWidth + 100));
    }
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <h2 className="font-['Archivo'] text-sm uppercase tracking-wider text-gray-500 mb-2">
          Wie wir arbeiten
        </h2>
        <p className="font-['Archivo'] text-lg text-gray-700">
          Ein Einblick in unseren Arbeitsalltag
        </p>
      </div>

      {/* Carousel Container */}
      <motion.div
        className="flex gap-4 cursor-grab active:cursor-grabbing px-6 lg:px-8"
        drag="x"
        dragConstraints={{
          left: dragConstraint,
          right: 0,
        }}
        dragElastic={0.1}
        style={{ x }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            style={{
              width: '500px',
              height: '350px',
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-gray-200">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                draggable="false"
                style={{
                  pointerEvents: isDragging ? 'none' : 'auto',
                }}
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="font-['Archivo_Narrow'] text-sm text-white">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Hint */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-6">
        <p className="font-['Archivo_Narrow'] text-sm text-gray-500 uppercase tracking-wider">
          ← Ziehen zum Durchblättern →
        </p>
      </div>
    </div>
  );
}
