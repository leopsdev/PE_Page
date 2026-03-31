"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass backdrop-blur-sm py-3 shadow-lg" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative flex items-center gap-2 group">
          <div className="relative w-40 h-12 overflow-hidden items-center flex">
            <Image
              src="/Logo-Horizontal.svg"
              alt="Programa Eficiência Logo"
              width={210}
              height={50}
              className="object-contain"
              priority
              style={{ objectFit: "contain", objectPosition: "center" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  const fallback = e.currentTarget.parentElement.querySelector('span');
                  if (fallback) fallback.classList.replace('opacity-0', 'opacity-100');
                }
              }}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <Link href="/#sobre" className="text-foreground hover:text-blue-logo transition-colors">Sobre</Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-foreground hover:text-blue-logo transition-colors focus:outline-none py-2">
              Projetos <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top pt-2">
              <div className="bg-white rounded-md shadow-xl shadow-black/5 border border-border/10 overflow-hidden py-2 flex flex-col">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projetos/${project.id}`}
                    className="px-4 py-2.5 text-sm text-brand-800 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/#instagram" className="text-foreground hover:text-blue-logo transition-colors">Colaboradores</Link>
          <Link href="/#instagram" className="text-foreground hover:text-blue-logo transition-colors">Parceiros</Link>
          <Link href="/#instagram" className="text-foreground hover:text-blue-logo transition-colors">Novidades</Link>
          <Link href="/#contato" className="px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-blue-logo hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-md">
            Login
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-brand-950 border-t border-white/10"
        >
          <nav className="flex flex-col items-center py-6 gap-6 text-sm font-semibold">
            <Link onClick={() => setMobileMenuOpen(false)} href="/#sobre" className="text-foreground hover:text-blue-logo transition-colors">Sobre</Link>

            <div className="flex flex-col items-center gap-3 w-full px-8">
              <button
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className="flex items-center justify-center gap-1 text-foreground hover:text-blue-logo transition-colors focus:outline-none w-full"
              >
                Projetos <ChevronDown size={16} className={`transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileProjectsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col items-center overflow-hidden w-full bg-white/5 rounded-lg shadow-inner"
                >
                  <div className="flex flex-col items-center py-4 gap-4 w-full">
                    {projects.map((project) => (
                      <Link
                        key={project.id}
                        onClick={() => setMobileMenuOpen(false)}
                        href={`/projetos/${project.id}`}
                        className="text-foreground hover:text-white transition-colors text-sm text-center w-full"
                      >
                        {project.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <Link onClick={() => setMobileMenuOpen(false)} href="/#instagram" className="text-foreground hover:text-blue-logo transition-colors">Novidades</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/#contato" className="px-6 py-2 rounded-full bg-white text-brand-950 hover:bg-blue-logo hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-md">
              Contato
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
