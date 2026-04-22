"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    // Carrega o script do Behold.so apenas no client-side
    const d = document;
    if (!d.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const s = d.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      d.head.append(s);
    }
  }, []);
  return (
    <section id="novidades" className="py-24 bg-brand-950/80">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Acompanhe o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">Feed</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto font-medium">
            Fique por dentro das últimas novidades e projetos do Programa Eficiência diretamente no nosso Instagram.
          </p>

          <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-background border border-foreground/10 p-4 md:p-8 min-h-[600px] flex items-center justify-center relative">

            {/* Behold.so Widget */}
            <div
              className="border-none rounded-2xl"
              style={{ width: '100%' }}
              dangerouslySetInnerHTML={{ __html: '<behold-widget feed-id="wYnKsWIB6GBDnZSzBhYq"></behold-widget>' }}
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
}
