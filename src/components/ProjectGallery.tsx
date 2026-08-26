"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronsRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import { EASE_OUT, VIEWPORT_LOOSE } from "@/components/motion/motion-config";
import { supabase } from "@/lib/supabase";
import { PROJECT_CATEGORIES } from "@/lib/constants";

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  location: string;
  image_url: string;
  details: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Manhattan Sky Penthouse",
    category: "Kitchens",
    location: "Upper East Side, NYC",
    image_url: "/images/hero-bg.jpg",
    details: "Obsidian oak cabinetry, waterfall marble island & integrated Miele appliances.",
  },
  {
    id: 2,
    title: "Brooklyn Brownstone Millwork",
    category: "Wardrobes",
    location: "Brooklyn Heights",
    image_url: "/images/service-cutting.jpg",
    details: "Full architectural wardrobe system with soft leather lining and brushed brass accents.",
  },
  {
    id: 3,
    title: "Tribeca Loft Entertainment Wall",
    category: "Living Spaces",
    location: "Tribeca, NYC",
    image_url: "/images/service-3d.jpg",
    details: "Floating geometric wall paneling with acoustic dampening and hidden storage.",
  },
  {
    id: 4,
    title: "Long Island City Master Suite",
    category: "Wardrobes",
    location: "Queens, NYC",
    image_url: "/images/service-assembly.jpg",
    details: "Seamless walk-in dressing space with automated indirect backlight illumination.",
  },
];

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState<PortfolioItem[]>(defaultPortfolioItems);

  useEffect(() => {
    async function loadSupabaseProjects() {
      try {
        const { data, error } = await supabase
          .from("masterspace_projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error("Using default portfolio items", err);
      }
    }
    loadSupabaseProjects();
  }, []);

  // Solo mostramos filtros que realmente tengan proyectos publicados; el orden
  // sigue a PROJECT_CATEGORIES y al final van categorias antiguas de la base.
  const categories = useMemo(() => {
    const used = new Set(items.map((item) => item.category).filter(Boolean));
    const known = PROJECT_CATEGORIES.filter((cat) => used.has(cat));
    const legacy = [...used].filter(
      (cat) => !(PROJECT_CATEGORIES as readonly string[]).includes(cat)
    );
    return ["All", ...known, ...legacy];
  }, [items]);

  // Si la categoria activa deja de existir tras recargar, caemos a "All" sin
  // tocar el estado: asi evitamos un render en cascada dentro de un efecto.
  const currentTab = categories.includes(activeTab) ? activeTab : "All";

  const filteredItems = items.filter(
    (item) => currentTab === "All" || item.category === currentTab
  );

  return (
    <section id="portfolio" className="py-24 section-crema relative">
      <div className="absolute top-0 inset-x-0 coffee-hairline" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Reveal y={12} duration={0.6}>
              <span className="eyebrow text-xs text-gradient-mocha block mb-3">
                Selected Works
              </span>
            </Reveal>
            <RevealText
              as="h2"
              text="Featured Interiors"
              stagger={0.024}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient-coffee font-normal tracking-[0.02em]"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_LOOSE}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE_OUT }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                  currentTab === cat
                    ? "btn-coffee font-semibold"
                    : "bg-linear-to-b from-mocha-400/10 to-mocha-700/10 border border-mocha-500/20 text-latte-400 hover:text-latte-100 hover:border-mocha-400/40"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_LOOSE}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.75, delay: (index % 2) * 0.12, ease: EASE_OUT }}
                className="group relative rounded-2xl overflow-hidden glass-card aspect-16/10 flex flex-col justify-end p-8"
              >
                {/* Background Image - se retira al pasar el puntero para dejar
                    sitio a la ficha, igual que las tarjetas de Gensler. */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:opacity-0 filter brightness-[0.8] saturate-[0.8] sepia-[0.3]"
                />

                {/* Coffee Gradient Overlays */}
                <div className="absolute inset-0 bg-linear-to-br from-mocha-700/40 to-espresso-900/45 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-t from-espresso-950 via-espresso-900/55 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-0" />

                {/* Ficha que ocupa el hueco de la foto al hacer hover */}
                <div className="absolute inset-0 z-10 coffee-panel flex flex-col justify-center gap-3 p-8 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                  <span className="eyebrow text-xs text-mocha-300">
                    {item.location} • {item.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-latte-50 font-normal">
                    {item.title}
                  </h3>
                  <p className="text-sm text-latte-300 font-light leading-relaxed max-w-md">
                    {item.details}
                  </p>
                  <ChevronsRight className="w-6 h-6 text-mocha-400 mt-2 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
                </div>

                {/* Rotulo en reposo - se aparta justo antes de que entre la ficha */}
                <div className="relative z-10 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="eyebrow text-xs text-mocha-300">
                      {item.location} • {item.category}
                    </span>
                    <div className="w-9 h-9 rounded-full coffee-ring backdrop-blur-md flex items-center justify-center text-mocha-100 group-hover:bg-linear-to-br group-hover:from-mocha-200 group-hover:to-mocha-600 group-hover:text-espresso-950 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-latte-50 font-normal mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-latte-300 font-light line-clamp-2">
                    {item.details}
                  </p>
                </div>

                {/* Filete de acento que se dibuja bajo la tarjeta en hover */}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 z-20 origin-left scale-x-0 bg-linear-to-r from-mocha-200 via-mocha-400 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
