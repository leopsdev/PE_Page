"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Edit2, Loader2, Save } from "lucide-react";

interface Project {
  id: string;
  title: string;
  nickname?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  link: string;
  technologies: string;
  themeSecondary: string;
  themeLight: string;
  screenshots?: any[];
}

export function ProjectAdminModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project> & { screenshots?: string[] }>({});
  const [saving, setSaving] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState("");

  useEffect(() => {
    if (isOpen) fetchProjects();
  }, [isOpen]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedia = () => {
    if (!newMediaUrl.trim()) return;
    const current = formData.screenshots || [];
    setFormData({ ...formData, screenshots: [...current, newMediaUrl.trim()] });
    setNewMediaUrl("");
  };

  const handleRemoveMedia = (index: number) => {
    const current = formData.screenshots || [];
    setFormData({ ...formData, screenshots: current.filter((_: any, i: number) => i !== index) });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";
      const techArray = typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map(s => s.trim())
        : [];

      const payload = { ...formData, technologies: techArray };

      await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
      setFormData({});
      await fetchProjects();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir projeto?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p.id !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4 h-screen overflow-y-auto">
        <div className="bg-brand-950 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 my-auto">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Gerenciar Projetos</h2>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X size={24} /></button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulário */}
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-2">{editingId ? "Editar Projeto" : "Novo Projeto"}</h3>
              <input required placeholder="Título" value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="Apelido / Sigla (Ex: SIMEC)" value={formData.nickname || ""} onChange={e => setFormData({ ...formData, nickname: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input required placeholder="Descrição Curta" value={formData.shortDescription || ""} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <textarea placeholder="Descrição Completa" value={formData.fullDescription || ""} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white h-24 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="URL da Logo / Imagem de Capa" value={formData.image || ""} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="Link do Site / Acesso Oficial" value={formData.link || ""} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="Tecnologias (separadas por vírgula)" value={formData.technologies || ""} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />

              <div className="pt-4 border-t border-white/10 space-y-3">
                <h3 className="text-md font-medium text-white mb-2">Galeria (Mídias do Projeto)</h3>

                <div className="flex gap-2">
                  <input placeholder="URL da Foto ou Vídeo" value={newMediaUrl} onChange={e => setNewMediaUrl(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
                  <button type="button" onClick={handleAddMedia} className="px-4 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition"><Plus size={16} /></button>
                </div>

                {formData.screenshots && formData.screenshots.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 mt-2 max-h-32 overflow-y-auto">
                    {formData.screenshots.map((url: string, index: number) => (
                      <div key={index} className="relative group bg-black/30 rounded-md p-2 border border-white/5 flex items-center justify-between gap-2">
                        <div className="flex-1 truncate text-xs text-white/60">{url}</div>
                        <button type="button" onClick={() => handleRemoveMedia(index)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md transition"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditingId(null); setFormData({}); setNewMediaUrl(""); }} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 transition">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Salvar
                </button>
              </div>
            </form>

            {/* Listagem */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <h3 className="text-lg font-medium text-white mb-2">Projetos Existentes</h3>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white/50" /></div>
              ) : projects.length === 0 ? (
                <div className="text-white/50 text-center py-8">Nenhum projeto cadastrado.</div>
              ) : (
                projects.map(p => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition">
                    <div>
                      <h4 className="font-semibold text-white">{p.title}</h4>
                      <p className="text-sm text-white/50 line-clamp-1">{p.shortDescription}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => {
                        let techs = "";
                        try { techs = JSON.parse(p.technologies).join(", "); } catch (e) { techs = p.technologies; }
                        setEditingId(p.id);
                        setFormData({
                          ...p,
                          technologies: techs,
                          screenshots: p.screenshots?.map((s: any) => s.url) || []
                        });
                      }} className="p-2 text-white/50 hover:text-blue-400 bg-white/5 rounded-md"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-md"><Trash2 size={16} /></button>
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
