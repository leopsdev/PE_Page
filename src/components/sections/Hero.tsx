"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-background dark:from-brand-950 dark:to-background z-0" />
      
      {/* Background Image / Banner placeholder */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 animate-pulse-slow">
        <Image 
          src="/img/banner.jpg"
          alt="Banner Programa Eficiência"
          fill
          className="object-cover object-center"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold text-sm mb-6 uppercase tracking-wider shadow-sm">
            Bem-vindo ao
          </div>
          {/* <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
            Programa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">
              Eficiência
            </span>
          </h1> */}
          <Image 
            src="/Logo-Horizontal.svg"
            className="mx-auto md:mx-10 mb-6 w-full max-w-md"
            alt="Programa Eficiência Logo"
            width={500}
            height={100}
          />
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
            Projeto de Gestão Baseada em Dados para otimizar rotinas, aprimorar a qualidade do trabalho e incentivar o desenvolvimento contínuo de novas soluções.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a 
              href="#projetos"
              className="px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-nowrap"
            >
              Conheça as Iniciativas
            </a>
            <a 
              href="#sobre"
              className="px-8 py-4 rounded-full border border-foreground/10 hover:border-brand-500 text-foreground font-bold transition-all hover:bg-brand-50 dark:hover:bg-brand-950/20 whitespace-nowrap"
            >
              Saiba Mais
            </a>
          </div>

          {/* Decorative floating element */}
          {/* <div className="absolute -bottom-6 -right-6 bg-background dark:bg-foreground/5 p-6 rounded-2xl shadow-xl border border-foreground/5 dark:border-white/10 glass hidden sm:block animate-bounce">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Inovação</p>
                <p className="text-xs text-foreground/60">+ 100 Projetos Concluídos</p>
              </div>
            </div>
          </div> */}
        </motion.div>

        
      </div>
    </section>
  );
}
