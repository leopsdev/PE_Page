"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, LayoutList, BookUser, Handshake } from "lucide-react";
import Image from "next/image";

export function UserMenuFloat() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status !== "authenticated" || !session) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[120]" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 right-0 w-56 bg-brand-950/80 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700/50">
              <p className="text-sm font-semibold text-white truncate">{session.user?.name}</p>
              <p className="text-xs text-white/70 truncate">{session.user?.email}</p>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left">
                <LayoutList size={16} />
                Projetos
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left">
                <BookUser size={16} />
                Colaboradores
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left">
                <Handshake size={16} />
                Parceiros
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left">
                <Settings size={16} />
                Configurações
              </button>
              <div className="h-px bg-gray-700/50 my-1"></div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors text-left font-medium"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-950/80 backdrop-blur-md text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-white/20 focus:outline-none"
      >
        <Image src="Logoo.svg" alt="Logo" width={47} height={47} />
      </motion.button>
    </div>
  );
}
