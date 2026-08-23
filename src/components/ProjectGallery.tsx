"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Manhattan Sky Penthouse",
    category: "Kitchens",
    location: "Upper East Side, NYC",
    image: "/images/hero-bg.jpg",
    details: "Obsidian oak cabinetry, waterfall marble island & integrated Miele appliances.",
  },
  {
    id: 2,
    title: "Brooklyn Brownstone Millwork",
    category: "Wardrobes",
    location: "Brooklyn Heights",
    image: "/images/service-cutting.jpg",
    details: "Full architectural wardrobe system with soft leather lining and brushed brass accents.",
  },
  {
    id: 3,
    title: "Tribeca Loft Entertainment Wall",
    category: "Living Spaces",
    location: "Tribeca, NYC",
    image: "/images/service-3d.jpg",
    details: "Floating geometric wall paneling with acoustic dampening and hidden storage.",
  },
  {
    id: 4,
    title: "Long Island City Master Suite",
    category: "Wardrobes",
    location: "Queens, NYC",
    image: "/images/service-assembly.jpg",
    details: "Seamless walk-in dressing space with automated indirect backlight illumination.",
  },
];

const categories = ["All", "Kitchens", "Wardrobes", "Living Spaces"];

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = portfolioItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <section id="portfolio" className="py-24 bg-[#0c0e12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
              Selected Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
              Featured Interiors
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-semibold"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden glass-card aspect-[16/10] flex flex-col justify-end p-8 border border-white/10"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-85"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                      {item.location} • {item.category}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-white font-normal mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-neutral-300 font-light line-clamp-2">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
