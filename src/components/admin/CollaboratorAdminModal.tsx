"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Edit2, Loader2, Save } from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  role?: string;
  lattes?: string;
  linkedin?: string;
  image?: string;
}

export function CollaboratorAdminModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Collaborator>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) fetchCollaborators();
  }, [isOpen]);

  const fetchCollaborators = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collaborators");
      const data = await res.json();
      setCollaborators(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/collaborators/${editingId}` : "/api/collaborators";
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
      setFormData({});
      await fetchCollaborators();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir colaborador?")) return;
    try {
      await fetch(`/api/collaborators/${id}`, { method: "DELETE" });
      setCollaborators(collaborators.filter(c => c.id !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
        <div className="bg-brand-950 w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 my-auto">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Gerenciar Colaboradores</h2>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X size={24} /></button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-2">{editingId ? "Editar Colaborador" : "Novo Colaborador"}</h3>
              <input required placeholder="Nome do Colaborador" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="Link do Currículo Lattes" value={formData.lattes || ""} onChange={e => setFormData({ ...formData, lattes: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="Link do LinkedIn" value={formData.linkedin || ""} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <input placeholder="URL da Foto do Perfil (opcional)" value={formData.image || ""} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50" />
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 transition">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Salvar
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <h3 className="text-lg font-medium text-white mb-2">Colaboradores Existentes</h3>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white/50" /></div>
              ) : collaborators.length === 0 ? (
                <div className="text-white/50 text-center py-8">Nenhum colaborador cadastrado.</div>
              ) : (
                collaborators.map(c => (
                  <div key={c.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition">
                    <div>
                      <h4 className="font-semibold text-white">{c.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {c.lattes && <span className="text-xs px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded-full">Lattes</span>}
                        {c.linkedin && <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">LinkedIn</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(c.id); setFormData(c); }} className="p-2 text-white/50 hover:text-blue-400 bg-white/5 rounded-md"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-md"><Trash2 size={16} /></button>
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
