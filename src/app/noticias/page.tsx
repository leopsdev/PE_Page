import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import NewsPageContent from "./NewsPageContent";

export const revalidate = 0; // Ensures fresh data

export default async function NoticiasPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { screenshots: true }
  });

  const newsList = await prisma.clippingNews.findMany({
    orderBy: { publishedAt: "desc" }
  });

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar projects={projects as any[]} />

      <div className="flex-1 container mx-auto px-6 py-24 mb-10 pt-32">
        <div className="mt-8">
          <Link
            href="/#noticias"
            className="inline-flex items-center gap-2 text-foreground hover:text-brand-600 transition-colors mb-8 group font-medium"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Voltar
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            Mural de <span className="text-brand-500">Notícias</span>
          </h1>
          <p className="text-foreground/70 text-lg mt-2 font-medium">Acompanhe nossos destaques e clippings na mídia.</p>
        </div>

        {newsList.length === 0 ? (
          <div className="text-center py-20 bg-foreground/5 rounded-3xl border border-foreground/10">
            <h3 className="text-2xl font-bold text-foreground mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-foreground/60">Cadastre recortes no painel administrativo para velas aqui.</p>
          </div>
        ) : (
          <NewsPageContent initialNews={newsList} />
        )}

      </div>

      <Footer />
    </main>
  );
}
