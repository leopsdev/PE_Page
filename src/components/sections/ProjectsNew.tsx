"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsNew({ projects = [] }: { projects?: any[] }) {
  if (projects.length === 0) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    })
  };

  return (
    <section className="py-24 bg-foreground/[0.02]" id="projetos">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">Modelos de Soluções</h2>
          <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">Projetos</span>
          </h3>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-12 flex flex-col items-center">

        {/* Main Card Container conforming to Wireframe 1 */}
        <div className="w-full max-w-6xl relative h-auto min-h-[450px]">
          <div className="w-full h-full border border-foreground/5 bg-foreground/[0.02] rounded-3xl p-6 md:p-8 flex flex-col relative group overflow-hidden">

            {/* Left Arrow */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 md:left-4 top-1/3 md:top-1/2 -translate-y-1/2 z-20 p-2 bg-background/50 backdrop-blur-md hover:bg-blue-logo/30 rounded-full text-white/80 hover:text-brand-500 transition-all border border-foreground/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Voltar"
            >
              <ChevronLeft size={32} strokeWidth={2} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
              className="absolute right-2 md:right-4 top-1/3 md:top-1/2 -translate-y-1/2 z-20 p-2 bg-background/50 backdrop-blur-md hover:bg-blue-logo/30 rounded-full text-white/80 hover:text-white transition-all border border-foreground/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Avançar"
            >
              <ChevronRight size={32} strokeWidth={2} />
            </button>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="flex flex-col md:flex-row gap-8 items-stretch flex-1 px-8 md:px-16 lg:px-24 py-2 w-full"
              >

                {/* Left side: Logo */}
                <div className="w-full md:w-1/3 shrink-0 flex items-center justify-center border-2 border-foreground/10 rounded-2xl bg-white aspect-square md:aspect-auto overflow-hidden relative shadow-inner">
                  {currentProject.image ? (
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                      unoptimized={currentProject.image.startsWith('http')}
                    />
                  ) : (
                    <span className="text-foreground/30 font-bold tracking-widest uppercase">Logo</span>
                  )}
                </div>

                {/* Right side: Description */}
                <div className="flex-1 flex flex-col justify-center gap-4 border-2 border-transparent">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground">{currentProject.title}</h3>
                    {currentProject.nickname && (
                      <h4 className="text-xl md:text-2xl font-semibold text-blue-logo mt-1">{currentProject.nickname}</h4>
                    )}
                  </div>

                  <p className="text-lg md:text-m text-foreground/70 leading-relaxed font-light line-clamp-6">
                    {currentProject.fullDescription || currentProject.shortDescription}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions: Dots & Ver Mais */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 z-10 px-8 md:px-16 lg:px-24 pt-6 border-t border-foreground/5">

              {/* Dots Indicator */}
              <div className="flex items-center gap-4">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${idx === currentIndex
                      ? "bg-blue-logo scale-125 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
                      : "bg-foreground/20 hover:bg-foreground/40"
                      }`}
                    aria-label={`Ir para o projeto ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Botão Ver Mais */}
              <Link
                href={`/projetos/${currentProject.id}`}
                className="px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-nowrap"
              >
                Ver mais
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
