"use client";

import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-foreground/[0.02] border-t border-white/5 relative overflow-hidden">
      {/* Background gradients for aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">Fale Conosco</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Entre em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">Contato</span>
            </h3>
            <p className="text-lg text-foreground/70 font-medium">
              Tem alguma dúvida, proposta ou quer saber mais sobre o projeto? Preencha o formulário abaixo e retornaremos o mais breve possível.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-foreground/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Note: Substitua "seu-email@exemplo.com" pelo email real que vai receber as mensagens */}
          <form action="https://formsubmit.co/seu-email@exemplo.com" method="POST" className="space-y-6">
            
            {/* FormSubmit Configurations */}
            <input type="hidden" name="_subject" value="Novo contato do site - Programa Eficiência!" />
            <input type="hidden" name="_captcha" value="false" /> {/* Desativa o captcha pesado do FormSubmit se preferir, ou mude para true */}
            <input type="hidden" name="_template" value="box" />

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-white/40" />
                </div>
                <input 
                  type="text" 
                  name="nome" 
                  required 
                  placeholder="Seu Nome Completo" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-white/40" />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Seu E-mail" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MessageSquare size={20} className="text-white/40" />
                </div>
                <input 
                  type="text" 
                  name="assunto" 
                  required 
                  placeholder="Assunto" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                />
              </div>

              <div className="relative">
                <textarea 
                  name="mensagem" 
                  required 
                  rows={4}
                  placeholder="Como podemos ajudar você hoje?" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all resize-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-500/20"
            >
              <Send size={20} />
              Enviar Mensagem
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
