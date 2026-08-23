"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Trash2, Image as ImageIcon, Lock, LogOut, 
  Sparkles, Check, RefreshCw, FolderPlus, Users, Eye, ArrowLeft 
} from "lucide-react";

interface ProjectItem {
  id?: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  details: string;
}

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  borough: string;
  project_type: string;
  details: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<"projects" | "leads">("projects");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // New Project Form state
  const [newProject, setNewProject] = useState<ProjectItem>({
    title: "",
    category: "Kitchens",
    location: "Manhattan, NYC",
    image_url: "",
    details: "",
  });

  // Verify stored PIN login session
  useEffect(() => {
    const savedAuth = localStorage.getItem("masterspace_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or masterspace
    if (pinInput === "1234" || pinInput.toLowerCase() === "masterspace") {
      setIsAuthenticated(true);
      localStorage.setItem("masterspace_admin_auth", "true");
      setPinError(false);
      fetchData();
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("masterspace_admin_auth");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const { data: projData } = await supabase
        .from("masterspace_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projData) setProjects(projData);

      // Fetch leads
      const { data: leadData } = await supabase
        .from("masterspace_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (leadData) setLeads(leadData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject((prev) => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.image_url) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("masterspace_projects")
      .insert([newProject])
      .select();

    if (!error && data) {
      setProjects([data[0], ...projects]);
      setNewProject({
        title: "",
        category: "Kitchens",
        location: "Manhattan, NYC",
        image_url: "",
        details: "",
      });
      setSuccessMsg("¡Proyecto publicado con éxito!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    if (!confirm("¿Seguro que deseas eliminar este proyecto de la web?")) return;

    const { error } = await supabase.from("masterspace_projects").delete().eq("id", id);
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // PIN Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0c] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#12141a] border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6" />
          </div>

          <span className="font-serif text-3xl font-normal text-white block mb-1">
            masterspace
          </span>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-6">
            Panel de Administración CMS
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-left text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Ingresa el PIN de Acceso (Por defecto: 1234)
              </label>
              <input
                type="password"
                required
                placeholder="****"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 text-center text-xl font-mono tracking-widest rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#d4af37]"
              />
              {pinError && (
                <p className="text-red-400 text-xs mt-2">PIN incorrecto. Intenta con 1234.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#f3e5ab] transition-colors"
            >
              Ingresar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard UI
  return (
    <div className="min-h-screen bg-[#090a0c] text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#12141a] px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-neutral-400 hover:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Web Principal</span>
            </a>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-normal text-white">masterspace</span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#d4af37] text-black font-bold">
                CMS ADMIN
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-red-400 transition-colors"
          >
            <span>Cerrar Sesión</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Success Banner */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] text-[#f3e5ab] text-sm flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              activeTab === "projects"
                ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Gestor de Proyectos ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              activeTab === "leads"
                ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Solicitudes de Clientes ({leads.length})</span>
          </button>

          <button
            onClick={fetchData}
            className="ml-auto text-neutral-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
            title="Recargar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* TAB 1: PROJECTS CMS */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form: Add New Project */}
            <div className="lg:col-span-5 bg-[#12141a] border border-white/10 rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <h3 className="font-serif text-xl text-white font-normal">
                  Subir Trabajo Real
                </h3>
              </div>

              <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Título del Proyecto
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Penthouse Upper East Side"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Categoría
                    </label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Kitchens" className="bg-[#12141a]">Kitchens</option>
                      <option value="Wardrobes" className="bg-[#12141a]">Wardrobes</option>
                      <option value="Living Spaces" className="bg-[#12141a]">Living Spaces</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Ubicación (NYC)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Brooklyn Heights"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Upload Image Section */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Imagen del Trabajo Real
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#f3e5ab] cursor-pointer"
                    />
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest text-center">
                      — o Pega la URL de la foto —
                    </span>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/foto-real.jpg"
                      value={newProject.image_url}
                      onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Preview box */}
                  {newProject.image_url && (
                    <div className="mt-3 relative h-40 rounded-xl overflow-hidden border border-white/20">
                      <img src={newProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Descripción / Detalles
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalles sobre materiales, maderas u acabado..."
                    value={newProject.details}
                    onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#f3e5ab] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar en la Web Live</span>
                </button>
              </form>
            </div>

            {/* Right List: Active Projects */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-serif text-xl text-white font-normal mb-4">
                Trabajos Publicados en la Web ({projects.length})
              </h3>

              {projects.length === 0 ? (
                <div className="p-8 text-center bg-[#12141a] border border-white/10 rounded-2xl text-neutral-400 text-sm">
                  No hay proyectos dinámicos aún. ¡Agrega el primero a la izquierda!
                </div>
              ) : (
                projects.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#12141a] border border-white/10 hover:border-white/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 transition-all"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full sm:w-28 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#d4af37]">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                      <h4 className="font-serif text-lg text-white font-normal">{item.title}</h4>
                      <p className="text-xs text-neutral-400 font-light line-clamp-1">{item.details}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Eliminar de la web"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LEADS INBOX */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-white font-normal mb-4">
              Consultas Recibidas de Clientes ({leads.length})
            </h3>

            {leads.length === 0 ? (
              <div className="p-8 text-center bg-[#12141a] border border-white/10 rounded-2xl text-neutral-400 text-sm">
                Aún no has recibido consultas de clientes. Se mostrarán aquí automáticamente cuando llenen el formulario web.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="bg-[#12141a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] uppercase tracking-widest font-semibold">
                          {lead.borough} • {lead.project_type}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl text-white font-normal mb-1">{lead.name}</h4>
                      <div className="text-xs text-neutral-300 space-y-1 mb-4">
                        <p>📞 <span className="font-mono text-white">{lead.phone}</span></p>
                        <p>✉️ <span className="font-mono text-white">{lead.email}</span></p>
                      </div>

                      {lead.details && (
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-neutral-300 italic">
                          "{lead.details}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
