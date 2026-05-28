"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Partners({ partners = [] }: { partners?: any[] }) {
  if (partners.length === 0) return null;

  return (
    <section id="parceiros" className="py-24 bg-foreground/[0.02]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">Parcerias</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">Parceiros</span>
            </h3>
            <p className="text-lg text-foreground/70 font-medium">
              Unidos por um propósito comum, nossos parceiros são essenciais para o sucesso e impacto dos nossos projetos. Conheça as organizações e instituições que colaboram conosco para transformar ideias em realidade.
            </p>
          </motion.div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }
          .animate-carousel {
            animation: scroll 40s linear infinite;
            width: max-content;
          }
          .animate-carousel:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative overflow-hidden w-full flex select-none">
          {/* Fading Gradients (optional for a cool effect) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="animate-carousel flex gap-6 items-center">
            {/* Duplicating the array multiple times to ensure enough items */}
            {[...partners, ...partners, ...partners, ...partners].map((partner: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-foreground/5 shadow-lg shadow-black/20 hover:bg-foreground/10 transition-all w-[240px] md:w-[280px] shrink-0"
              >
                {/* Photo area */}
                <div className="w-60 h-60 md:h-60 flex-shrink-0 bg-transparent rounded-xl relative overflow-hidden flex items-center justify-center">
                  {partner.image ? (
                    <Image src={partner.image} alt={partner.name} fill className="object-cover rounded-lg" />
                  ) : (
                    <span className="text-gray-400 font-bold text-xl uppercase tracking-widest">Logo</span>
                  )}
                </div>

                {/* Info area */}
                <div className="flex flex-col justify-center text-center w-full px-2">
                  <h3 className="text-base md:text-lg font-medium text-white/90 tracking-wide truncate">
                    {partner.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
