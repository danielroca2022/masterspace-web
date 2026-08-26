"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus, Trash2, Lock, LogOut,
  Sparkles, Check, RefreshCw, FolderPlus, Users, ArrowLeft,
  Settings, Save, Phone, Mail
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import {
  DEFAULT_SITE_SETTINGS,
  buildWhatsAppUrl,
  fetchSiteSettings,
  normalizeWhatsAppNumber,
  saveSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";

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

const SOCIAL_FIELDS: { field: keyof SiteSettings; label: string; placeholder: string }[] = [
  { field: "instagram", label: "Instagram", placeholder: "https://instagram.com/masterspace.nyc" },
  { field: "facebook", label: "Facebook", placeholder: "https://facebook.com/masterspacenyc" },
  { field: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@masterspace.nyc" },
  { field: "pinterest", label: "Pinterest", placeholder: "https://pinterest.com/masterspacenyc" },
  { field: "youtube", label: "YouTube", placeholder: "https://youtube.com/@masterspacenyc" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<"projects" | "leads" | "settings">("projects");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Contacto & redes: se publican en la landing (footer + boton flotante)
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState("");

  // New Project Form state
  const [newProject, setNewProject] = useState<ProjectItem>({
    title: "",
    category: PROJECT_CATEGORIES[0],
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

      // Ajustes de contacto y redes
      setSettings(await fetchSiteSettings());
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
        category: PROJECT_CATEGORIES[0],
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

  const updateSetting = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsError("");

    const payload: SiteSettings = {
      ...settings,
      whatsappNumber: normalizeWhatsAppNumber(settings.whatsappNumber),
    };

    const { error } = await saveSiteSettings(payload);

    if (error) {
      setSettingsError("No se pudo guardar. Revisa tu conexion e intenta de nuevo.");
    } else {
      setSettings(payload);
      setSuccessMsg("Contacto y redes actualizados en la web live.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
    setSavingSettings(false);
  };

  const whatsappPreviewUrl = buildWhatsAppUrl(settings);
  const activeSocials = SOCIAL_FIELDS.filter(({ field }) => settings[field]);

  // PIN Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-espresso-800 via-espresso-900 to-espresso-950 text-latte-100 flex items-center justify-center p-6">
        <div className="relative w-full max-w-md coffee-panel rounded-3xl p-8 shadow-2xl shadow-espresso-950/70 text-center overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 coffee-glow blur-3xl pointer-events-none" />
          <div className="relative w-14 h-14 rounded-full bg-linear-to-br from-mocha-200 to-mocha-700 text-espresso-950 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-mocha-700/40">
            <Lock className="w-6 h-6" />
          </div>

          <BrandLogo priority className="relative h-24 w-auto mx-auto mb-3" />
          <p className="relative eyebrow text-xs text-gradient-mocha mb-6">
            Panel de Administración CMS
          </p>

          <form onSubmit={handleLogin} className="relative flex flex-col gap-4">
            <div>
              <label className="block text-left text-xs uppercase tracking-wider text-latte-400 mb-2">
                Ingresa el PIN de Acceso (Por defecto: 1234)
              </label>
              <input
                type="password"
                required
                placeholder="****"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 text-center text-xl font-mono tracking-widest rounded-xl coffee-field text-latte-100"
              />
              {pinError && (
                <p className="text-terracotta-400 text-xs mt-2">PIN incorrecto. Intenta con 1234.</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-coffee w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[0.2em]"
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
    <div className="min-h-screen bg-linear-to-b from-espresso-900 via-espresso-900 to-espresso-950 text-latte-100">
      {/* Top Header */}
      <header className="relative border-b border-mocha-500/20 bg-linear-to-b from-espresso-700 to-espresso-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-latte-400 hover:text-latte-50 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Web Principal</span>
            </a>
            <span className="text-latte-700">|</span>
            <div className="flex items-center gap-2">
              <BrandLogo priority className="h-11 w-auto" />
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-linear-to-r from-mocha-200 to-mocha-500 text-espresso-950 font-bold">
                CMS ADMIN
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-latte-400 hover:text-terracotta-400 transition-colors"
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
          <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-mocha-600/30 to-mocha-800/20 border border-mocha-400/45 text-mocha-100 text-sm flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="relative flex items-center gap-4 mb-8 pb-4">
          <div className="absolute bottom-0 inset-x-0 coffee-hairline" />
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              activeTab === "projects"
                ? "btn-coffee"
                : "bg-linear-to-b from-mocha-400/10 to-mocha-700/10 border border-mocha-500/20 text-latte-400 hover:text-latte-100 hover:border-mocha-400/40"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Gestor de Proyectos ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              activeTab === "leads"
                ? "btn-coffee"
                : "bg-linear-to-b from-mocha-400/10 to-mocha-700/10 border border-mocha-500/20 text-latte-400 hover:text-latte-100 hover:border-mocha-400/40"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Solicitudes de Clientes ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              activeTab === "settings"
                ? "btn-coffee"
                : "bg-linear-to-b from-mocha-400/10 to-mocha-700/10 border border-mocha-500/20 text-latte-400 hover:text-latte-100 hover:border-mocha-400/40"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Contacto &amp; Redes</span>
          </button>

          <button
            onClick={fetchData}
            className="ml-auto text-latte-400 hover:text-mocha-200 p-2 rounded-lg coffee-ring"
            title="Recargar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* TAB 1: PROJECTS CMS */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form: Add New Project */}
            <div className="lg:col-span-5 coffee-panel rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-mocha-300" />
                <h3 className="font-display text-xl text-gradient-coffee font-normal">
                  Subir Trabajo Real
                </h3>
              </div>

              <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                    Título del Proyecto
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Penthouse Upper East Side"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                      Categoría
                    </label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    >
                      {PROJECT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-espresso-800">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                      Ubicación (NYC)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Brooklyn Heights"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    />
                  </div>
                </div>

                {/* Upload Image Section */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                    Imagen del Trabajo Real
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="text-xs text-latte-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-mocha-500 file:text-espresso-950 hover:file:bg-mocha-300 cursor-pointer"
                    />
                    <span className="text-[10px] text-latte-500 uppercase tracking-widest text-center">
                      — o Pega la URL de la foto —
                    </span>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/foto-real.jpg"
                      value={newProject.image_url}
                      onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl coffee-field text-latte-100 text-xs"
                    />
                  </div>

                  {/* Preview box */}
                  {newProject.image_url && (
                    <div className="mt-3 relative h-40 rounded-xl overflow-hidden border border-mocha-400/25">
                      <img src={newProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                    Descripción / Detalles
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalles sobre materiales, maderas u acabado..."
                    value={newProject.details}
                    onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-coffee w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar en la Web Live</span>
                </button>
              </form>
            </div>

            {/* Right List: Active Projects */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display text-xl text-gradient-coffee font-normal mb-4">
                Trabajos Publicados en la Web ({projects.length})
              </h3>

              {projects.length === 0 ? (
                <div className="p-8 text-center coffee-panel rounded-2xl text-latte-400 text-sm">
                  No hay proyectos dinámicos aún. ¡Agrega el primero a la izquierda!
                </div>
              ) : (
                projects.map((item) => (
                  <div
                    key={item.id}
                    className="coffee-panel rounded-2xl hover:border-mocha-400/40 p-4 flex flex-col sm:flex-row items-center gap-4 transition-all"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full sm:w-28 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 eyebrow text-[11px] text-mocha-300">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                      <h4 className="font-display text-lg text-latte-50 font-normal">{item.title}</h4>
                      <p className="text-xs text-latte-400 font-light line-clamp-1">{item.details}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-2.5 rounded-xl bg-terracotta-500/10 border border-terracotta-500/20 text-terracotta-400 hover:bg-terracotta-500 hover:text-latte-50 transition-colors"
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
            <h3 className="font-display text-xl text-gradient-coffee font-normal mb-4">
              Consultas Recibidas de Clientes ({leads.length})
            </h3>

            {leads.length === 0 ? (
              <div className="p-8 text-center coffee-panel rounded-2xl text-latte-400 text-sm">
                Aún no has recibido consultas de clientes. Se mostrarán aquí automáticamente cuando llenen el formulario web.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="coffee-panel rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-linear-to-r from-mocha-500/25 to-mocha-800/20 border border-mocha-400/40 text-mocha-100 text-[10px] uppercase tracking-widest font-semibold">
                          {lead.borough} • {lead.project_type}
                        </span>
                        <span className="text-[10px] text-latte-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-display text-2xl text-latte-50 font-normal mb-1">{lead.name}</h4>
                      <div className="text-xs text-latte-300 space-y-1 mb-4">
                        <p>📞 <span className="font-mono text-latte-50">{lead.phone}</span></p>
                        <p>✉️ <span className="font-mono text-latte-50">{lead.email}</span></p>
                      </div>

                      {lead.details && (
                        <div className="p-3 rounded-xl bg-espresso-950/60 border border-mocha-500/12 text-xs text-latte-300 italic">
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

        {/* TAB 3: CONTACTO & REDES (se refleja en la landing) */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleSaveSettings} className="lg:col-span-8 coffee-panel rounded-2xl p-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Settings className="w-4 h-4 text-mocha-300" />
                  <h3 className="font-display text-xl text-gradient-coffee font-normal">
                    Contacto &amp; Redes Sociales
                  </h3>
                </div>
                <p className="text-xs text-latte-400 font-light">
                  Lo que guardes aqui aparece al instante en el footer y en el boton flotante de WhatsApp de la web.
                </p>
              </div>

              {/* WhatsApp */}
              <div className="pt-5 relative">
                <div className="absolute top-0 inset-x-0 coffee-hairline" />
                <h4 className="eyebrow text-[11px] text-mocha-300 mb-4">WhatsApp</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                      Numero (con codigo de pais)
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="1 212 555 0199"
                      value={settings.whatsappNumber}
                      onChange={(e) => updateSetting("whatsappNumber", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    />
                    <p className="text-[10px] text-latte-500 mt-1">
                      Solo digitos: 1 = USA. Dejalo vacio para ocultar el boton de WhatsApp.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                      Mensaje precargado
                    </label>
                    <input
                      type="text"
                      placeholder="Hello MasterSpace, I would like..."
                      value={settings.whatsappMessage}
                      onChange={(e) => updateSetting("whatsappMessage", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Contacto directo */}
              <div className="pt-5 relative">
                <div className="absolute top-0 inset-x-0 coffee-hairline" />
                <h4 className="eyebrow text-[11px] text-mocha-300 mb-4">Contacto directo</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-latte-400 mb-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Telefono</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(212) 555-0199"
                      value={settings.phone}
                      onChange={(e) => updateSetting("phone", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-latte-400 mb-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@masterspace.nyc"
                      value={settings.email}
                      onChange={(e) => updateSetting("email", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Redes */}
              <div className="pt-5 relative">
                <div className="absolute top-0 inset-x-0 coffee-hairline" />
                <h4 className="eyebrow text-[11px] text-mocha-300 mb-4">Redes sociales</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SOCIAL_FIELDS.map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label className="block text-xs uppercase tracking-wider text-latte-400 mb-1">
                        {label}
                      </label>
                      <input
                        type="url"
                        placeholder={placeholder}
                        value={settings[field]}
                        onChange={(e) => updateSetting(field, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl coffee-field text-latte-100 text-sm"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-latte-500 mt-3">
                  Deja en blanco las redes que no uses y su icono no se mostrara en la web.
                </p>
              </div>

              {settingsError && (
                <p className="text-terracotta-400 text-xs">{settingsError}</p>
              )}

              <button
                type="submit"
                disabled={savingSettings}
                className="btn-coffee w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? "Guardando..." : "Publicar en la Web Live"}</span>
              </button>
            </form>

            {/* Vista previa de lo que vera el cliente */}
            <div className="lg:col-span-4 coffee-panel rounded-2xl p-6 h-fit">
              <h3 className="font-display text-xl text-gradient-coffee font-normal mb-4">
                Vista Previa
              </h3>

              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <span className="eyebrow text-[10px] text-mocha-300 block mb-1">Boton WhatsApp</span>
                  {whatsappPreviewUrl ? (
                    <a
                      href={whatsappPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-latte-200 hover:text-mocha-300 break-all underline underline-offset-2"
                    >
                      {whatsappPreviewUrl}
                    </a>
                  ) : (
                    <span className="text-latte-500">Oculto &mdash; falta el numero.</span>
                  )}
                </div>

                <div className="pt-3 relative">
                  <div className="absolute top-0 inset-x-0 coffee-hairline" />
                  <span className="eyebrow text-[10px] text-mocha-300 block mb-1">
                    Iconos visibles en el footer
                  </span>
                  {activeSocials.length === 0 ? (
                    <span className="text-latte-500">Ninguno todavia.</span>
                  ) : (
                    <ul className="text-latte-200 space-y-1">
                      {activeSocials.map(({ field, label }) => (
                        <li key={field}>&bull; {label}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coffee-ghost mt-2 flex items-center justify-center px-4 py-2.5 rounded-full text-latte-100 text-[11px] uppercase tracking-[0.18em] font-semibold"
                >
                  Abrir la web
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
