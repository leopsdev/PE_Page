"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsCarousel({ projects = [] }: { projects?: any[] }) {
  // Configura fallbacks se a screenshot estiver nula pra ter banners high-quality
  const fallbackImages = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
    "/screenshots/Banner-equipe.png",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
  ];

  const carouselData = projects.map((p, idx) => ({
    ...p,
    bannerImage: (p.screenshots && p.screenshots.length > 0) ? p.screenshots[0].url : fallbackImages[idx % fallbackImages.length]
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Auto-play every 5s
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentProject = carouselData[currentIndex];

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

  return (
    <section className="w-full relative bg-brand-950 py-24 overflow-hidden" id="carrossel-projetos">
      <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold text-brand-400 tracking-widest uppercase mb-3">Portfólio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
            Conheça nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-400">Projetos</span>
          </h3>
          <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">
            Descubra as iniciativas e sistemas que desenvolvemos para otimizar processos e gerar resultados inovadores.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">

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
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentProject.bannerImage}
                alt={currentProject.title}
                fill
                unoptimized={currentProject.bannerImage.startsWith('http')}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />

              {/* Gradient Overlay mapping to the provided screenshot style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none" />

              {/* Text Content */}
              <div className="absolute bottom-16 md:bottom-20 left-0 w-full px-8 md:px-16 lg:px-24">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link href={`/projetos/${currentProject.id}`} className="inline-block group/link">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-xl group-hover/link:text-blue-logo transition-colors">
                      {currentProject.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl drop-shadow-md">
                      {currentProject.shortDescription}
                    </p>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-transparent backdrop-blur-md hover:bg-blue-logo/30 rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Voltar"
          >
            <ChevronLeft size={36} strokeWidth={2} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-transparent backdrop-blur-md hover:bg-blue-logo/30 rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Avançar"
          >
            <ChevronRight size={36} strokeWidth={2} />
          </button>

          {/* Dots Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
            {carouselData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${idx === currentIndex
                  ? "bg-blue-logo scale-125 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
                  : "bg-white/40 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
