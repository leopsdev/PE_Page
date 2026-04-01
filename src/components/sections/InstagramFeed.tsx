"use client";

import { motion } from "framer-motion";

export default function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 bg-brand-950/80">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Acompanhe o <span className="text-brand-500">Feed</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto font-medium">
            Fique por dentro das últimas novidades e projetos do Programa Eficiência diretamente no nosso Instagram.
          </p>

          <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-background border border-foreground/10 p-4 md:p-8 min-h-[600px] flex items-center justify-center relative">
            
            {/* Behold.so Widget Placeholder */}
            {/* INSTRUÇÃO: Substitua a URL abaixo pelo link real do seu feed no Behold.so */}
            <iframe 
              src="https://services.behold.so/link/cSkuR" 
              className="w-full h-full min-h-[500px] border-none rounded-2xl"
              title="Instagram Feed by Behold.so"
              loading="lazy"
            />
            
            {/* Fallback overlay in dev se o iframe falhar ou for placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-400 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <p className="font-bold text-xl text-foreground">Widget Behold.so</p>
              <p className="text-foreground/60 mt-2 font-medium">Insira o link real no arquivo InstagramFeed.tsx</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
