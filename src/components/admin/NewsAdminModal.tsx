"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Edit2, Loader2, Save, DownloadCloud } from "lucide-react";

interface News {
  id: string;
  title: string;
  author: string;
  content: string;
  sourceUrl: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedAt?: string;
}

export function NewsAdminModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<News>>({});
  const [saving, setSaving] = useState(false);
  const [scraping, setScraping] = useState(false);

  useEffect(() => {
    if (isOpen) fetchNews();
  }, [isOpen]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    if (!formData.sourceUrl) {
      alert("Por favor, insira a URL da notícia primeiro.");
      return;
    }
    setScraping(true);
    try {
      const res = await fetch("/api/news/scrape", {
        method: "POST",
        body: JSON.stringify({ url: formData.sourceUrl }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao extrair dados");

      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        author: data.author || prev.author || "Redação",
        content: data.content || prev.content,
        imageUrl: data.imageUrl || prev.imageUrl,
        videoUrl: data.videoUrl || prev.videoUrl
      }));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setScraping(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/news/${editingId}` : "/api/news";
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
      setFormData({});
      await fetchNews();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta notícia do mural?")) return;
    try {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      setNews(news.filter(n => n.id !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
        <div className="bg-brand-950 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 my-auto max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
            <h2 className="text-xl font-bold text-white">Clipping de Notícias</h2>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X size={24} /></button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-2">{editingId ? "Editar Notícia" : "Nova Notícia"}</h3>

              <div className="flex gap-2">
                <input required placeholder="URL da Notícia Original" value={formData.sourceUrl || ""} onChange={e => setFormData({ ...formData, sourceUrl: e.target.value })} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2.5 text-white" />
                <button type="button" onClick={handleScrape} disabled={scraping} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 flex items-center justify-center transition disabled:opacity-50" title="Extrair dados via URL">
                  {scraping ? <Loader2 size={20} className="animate-spin" /> : <DownloadCloud size={20} />}
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <input required placeholder="Manchete / Título" value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white" />
                <input placeholder="Autor da Matéria (Ex: Redação / Nome)" value={formData.author || ""} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white" />
                <textarea required placeholder="Resumo / Conteúdo da Notícia" rows={4} value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white resize-none" />
                <div className="flex gap-4">
                  <input placeholder="URL da Capa (opcional)" value={formData.imageUrl || ""} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="flex-1 w-48 bg-black/20 border border-white/10 rounded-lg p-2.5 text-white" />
                  <input type="datetime-local" title="Data/Hora Exata da Publicação Original" value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ""} onChange={e => setFormData({ ...formData, publishedAt: new Date(e.target.value).toISOString() })} className="w-48 bg-black/20 border border-white/10 rounded-lg p-2.5 text-white/50" />
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 transition">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Salvar
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <h3 className="text-lg font-medium text-white mb-2">Notícias Publicadas</h3>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white/50" /></div>
              ) : news.length === 0 ? (
                <div className="text-white/50 text-center py-8">Nenhum clipping cadastrado.</div>
              ) : (
                news.map(n => (
                  <div key={n.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition">
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-white truncate">{n.title}</h4>
                      <p className="text-xs text-white/50 line-clamp-1 truncate mt-1">Fonte: {n.sourceUrl}</p>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button onClick={() => { setEditingId(n.id); setFormData(n); }} className="p-2 text-white/50 hover:text-blue-400 bg-white/5 rounded-md"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(n.id)} className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-md"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
