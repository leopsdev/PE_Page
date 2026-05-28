"use client";

import { motion, Variants } from "framer-motion";
import { Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Target size={32} />,
    title: "Foco no Resultado",
    description: "Identificar os principais gargalos dos macroprocessos operacionais e de gestão."
  },
  {
    icon: <Users size={32} />,
    title: "Integração",
    description: "Padronizar e integrar os principais macroprocessos."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Planejamento",
    description: "Fornecer ferramenta de análise estruturada de dados para os gestores em tempo real."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-3">Sobre o Programa</h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6">Mais do que ideias, <br />entregamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-400">resultados</span></h3>
            <p className="text-lg text-foreground/70 font-medium">
              O Programa Eficiência tem como objetivo qualificar a gestão municipal em processos e tomada de decisão guiada por dados e evidências, proporcionada pela integração de sistemas de informações das secretarias municipais de Juazeiro do Norte.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-200 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-foreground/5 border border-foreground/10 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
              <p className="text-foreground/70 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
