"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 mt-auto border-t border-brand-500/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6 relative w-48 h-12 group">
              <span className="absolute inset-0 flex items-center text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-logo to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                EFICIÊNCIA
              </span>
              <Image
                src="/img/Logo-Horizontal.svg"
                alt="Programa Eficiência Logo"
                width={192}
                height={48}
                className="object-contain filter invert brightness-0 group-hover:opacity-0 transition-opacity duration-300"
                style={{ objectFit: "contain", objectPosition: "center" }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    const fallback = e.currentTarget.parentElement.querySelector('span');
                    if (fallback) fallback.classList.replace('opacity-0', 'opacity-100');
                  }
                }}
              />
            </Link>
            <p className="text-background/70 max-w-sm font-medium leading-relaxed">
              O Programa Eficiência busca transformar desafios em oportunidades reais de inovação e escalabilidade.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-400">Links Rápidos</h4>
            <ul className="space-y-4 font-medium text-background/80">
              <li><Link href="#sobre" className="hover:text-brand-300 transition-colors">Sobre Nós</Link></li>
              <li><Link href="#projetos" className="hover:text-brand-300 transition-colors">Nossos Projetos</Link></li>
              <li><Link href="#instagram" className="hover:text-brand-300 transition-colors">Feed do Instagram</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-400">Contato</h4>
            <ul className="space-y-4 font-medium text-background/80">
              <li className="flex items-center gap-3 hover:text-brand-300 transition-colors cursor-pointer">
                <Link href="mailto:[EMAIL_ADDRESS]">
                  <Mail size={20} className="text-brand-500" />
                </Link>
                [EMAIL_ADDRESS]
              </li>
              <li className="flex items-center gap-3 hover:text-brand-300 transition-colors cursor-pointer">
                <Link href="https://www.instagram.com/programa.eficiencia/">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
                </Link>
                @programa.eficiencia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50 font-medium">
          <p>&copy; {new Date().getFullYear()} Programa Eficiência. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-400 transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-brand-400 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
