"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { collaborators } from "@/data/projects";

// Extraia colaboradores únicos de todos os projetos
const allCollaborators = collaborators;
const uniqueCollaborators = Array.from(new Map(allCollaborators.map(c => [c.name, c])).values());

export default function Collaborators() {
  if (uniqueCollaborators.length === 0) return null;

  return (
    <section id="colaboradores" className="py-24 bg-foreground/[0.02]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">Equipe</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">Colaboradores</span>
            </h3>
            <p className="text-lg text-foreground/70 font-medium">
              Conheça as pessoas incríveis por trás do desenvolvimento e sucesso dos nossos projetos.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueCollaborators.map((collab, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-6 p-5 rounded-2xl bg-foreground/5 border border-white/5 shadow-lg shadow-black/20 hover:border-white/10 hover:bg-foreground/10 transition-all group"
            >
              {/* Photo area */}
              <div className="w-24 h-24 flex-shrink-0 bg-[#d9d9d9] rounded-xl relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {collab.image ? (
                  <Image src={collab.image} alt={collab.name} fill className="object-cover" />
                ) : (
                  <span className="text-black/60 font-medium text-sm">Foto</span>
                )}
              </div>

              {/* Info area */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2">
                  {collab.name}
                </h3>
                <p className="text-white/80 font-medium text-sm md:text-base">
                  {collab.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
