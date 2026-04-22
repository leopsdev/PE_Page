"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Calendar } from "lucide-react";

export default function NewsPageContent({ initialNews = [] }: { initialNews?: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter based on search
  const filteredSearchNews = initialNews.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // For the exact UI matching wireframe:
  // If we are searching, we just show the remaining list for simplicity or we can maintain the full structure.
  // The wireframe requested: Top is the VERY latest (1), then next 3, THEN search bar, THEN remaining list.
  // We will pull out the fixed Top 4 from the UNFILTERED list (always highlights the absolute latest top 4).
  // The search bar only filters the list below it ("lista com ultimas noticias a partir das já mencionadas").

  const topNews = initialNews.length > 0 ? initialNews[0] : null;
  const nextThree = initialNews.slice(1, 4);
  const remainingNews = initialNews.slice(4);

  // Now apply search ONLY to the remaining news (which is what makes logical sense for "search older news")
  // Or actually, if they search, they might want to find the top news too.
  // Let's apply search to all news, but if search is active, hide the Destaque layout and show a pure list.
  // If search is empty, show Wireframe 2 layout.

  const isSearching = searchTerm.trim().length > 0;

  // What list to paginate? 
  // If searching: all filtered. If not: just remainingNews
  const listToPaginate = isSearching ? filteredSearchNews : remainingNews;

  const totalPages = Math.ceil(listToPaginate.length / itemsPerPage);
  const paginatedList = listToPaginate.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-10">

      {!isSearching && topNews && (
        <>
          {/* Última Notícia */}
          <Link href={topNews.sourceUrl} target="_blank" className="block group">
            <div className="w-full rounded-3xl bg-foreground/[0.02] border border-foreground/5 overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-brand-500/20 transition-all duration-300">
              <div className="md:w-1/2 relative h-64 md:h-[594px]">
                <Image
                  src={topNews.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070"}
                  alt={topNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-brand-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                  Manchete Principal
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
                  {topNews.title}
                </h2>
                <p className="text-foreground/70 text-lg line-clamp-3 mb-6">
                  {topNews.content}
                </p>
                <div className="mt-auto flex items-center justify-between text-brand-400 font-medium">
                  <span className="flex items-center gap-2 rounded-full bg-brand-400/10 px-4 py-2 text-sm"><ExternalLink size={16} /> Ler matéria completa</span>
                  <span className="text-sm text-foreground/50">{new Date(topNews.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Wireframe 2: BLUE BOXES (Últimas 3 Notícias) */}
          {nextThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextThree.map((news) => (
                <Link href={news.sourceUrl} target="_blank" key={news.id} className="group">
                  <div className="bg-foreground/[0.02] border border-foreground/5 h-full rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image src={news.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2000"} alt={news.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-foreground/60 text-sm line-clamp-3 mb-4">
                        {news.content}
                      </p>
                      <div className="mt-auto pt-4 border-t border-black/5 flex justify-between items-center text-xs text-foreground/40 font-medium">
                        <span className="flex items-center gap-1"><ExternalLink size={14} className="text-blue-400" /> Acessar</span>
                        <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* Wireframe 2: BLACK BOX (Barra de Pesquisa) */}
      <div className="w-full max-w-2xl mx-auto my-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-foreground/40" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar em recortes antigos..."
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full bg-foreground/[0.02] border border-foreground/5 rounded-xl py-4 pl-12 pr-4 text-foreground text-lg focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-shadow shadow-sm"
        />
      </div>

      {/* Wireframe 2: DARK RED BOXES (Lista Vertical de Últimas Notícias antigas) */}
      <div className="flex flex-col gap-4">
        {paginatedList.length === 0 ? (
          <div className="text-center py-12 text-foreground/50">Nenhuma notícia encontrada nesta visão.</div>
        ) : (
          paginatedList.map(news => (
            <Link href={news.sourceUrl} target="_blank" key={news.id} className="group">
              <div className="bg-foreground/[0.02] border border-foreground/5 p-6 rounded-2xl flex flex-col md:flex-row gap-6 shadow-md hover:shadow-xl transition-shadow items-center min-h-[120px]">
                <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden shrink-0">
                  <Image src={news.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80"} alt={news.title} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-brand-400 mb-2 uppercase tracking-wide">
                    <Calendar size={14} /> {new Date(news.createdAt).toLocaleDateString()}
                    {news.author && news.author !== "Redação" && <span className="px-2 py-0.5 bg-brand-50 text-brand-400 rounded-full">{news.author}</span>}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-brand-400 transition-colors">{news.title}</h3>
                  <p className="text-foreground/60 text-sm mt-1 line-clamp-2">{news.content}</p>
                </div>
                <div className="md:px-6 md:border-l border-black/10 shrink-0 text-brand-500 group-hover:-rotate-12 transition-transform">
                  <ExternalLink size={24} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Wireframe 2: Pagination (Bottom Box) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border-2 border-foreground rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground hover:text-background transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 border-2 rounded-lg font-bold transition-colors ${currentPage === idx + 1
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 text-foreground/50 hover:border-foreground"
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border-2 border-foreground rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground hover:text-background transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
}
