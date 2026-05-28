"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  url: string;
}

export default function ProjectMediaCarousel({ media = [] }: { media?: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!media || media.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.05
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const currentMedia = media[currentIndex];

  const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-black/30">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {isYouTube(currentMedia.url) ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(currentMedia.url)}?autoplay=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : isVideo(currentMedia.url) ? (
            <video
              src={currentMedia.url}
              className="w-full h-full object-contain"
              controls
              autoPlay
              loop
              muted
            />
          ) : (
            <Image
              src={currentMedia.url}
              alt={`Media ${currentIndex + 1}`}
              fill
              unoptimized={currentMedia.url.startsWith('http')}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (only if more than 1 item) */}
      {media.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/50 backdrop-blur-md hover:bg-blue-logo/80 rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Voltar"
          >
            <ChevronLeft size={36} strokeWidth={2} />
          </button>

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/50 backdrop-blur-md hover:bg-blue-logo/80 rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Avançar"
          >
            <ChevronRight size={36} strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDotClick(idx); }}
                aria-label={`Ir para a mídia ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-md ${idx === currentIndex
                  ? "bg-blue-logo scale-125 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
                  : "bg-white/40 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
