"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Sliders, Wrench, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "3d-design",
    title: "Free 3D Design",
    description: "See your new space before a single cut is made. Photorealistic 3D visualization tailored to your exact NYC floor plan.",
    image: "/images/service-3d.jpg",
    icon: Box,
    highlights: ["Photorealistic 3D Renders", "Floor Plan Integration", "Material & Color Selection"],
  },
  {
    id: "precision-cutting",
    title: "Precision Cutting",
    description: "Every panel is cut to exacting specifications for a seamless fit. CNC technology combined with artisanal woodcraft.",
    image: "/images/service-cutting.jpg",
    icon: Sliders,
    highlights: ["Micron CNC Precision", "Custom Obsidian Panels", "Seamless Joint Engineering"],
  },
  {
    id: "assembly",
    title: "Assembly & Installation",
    description: "Our craftsmen bring the vision home, down to the final detail. White-glove installation executed with zero compromise.",
    image: "/images/service-assembly.jpg",
    icon: Wrench,
    highlights: ["White-Glove Delivery", "Master Craftsmen On-Site", "Lifetime Structural Integrity"],
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-[#090a0c] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
              Craftsmanship & Engineering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
              Bespoke End-to-End Solutions
            </h2>
          </div>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-md mt-4 md:mt-0">
            From initial concept render to the final screw, we control every step of custom interior creation.
          </p>
        </div>

        {/* 3-Column Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-[#d4af37]/40"
              >
                {/* Top Image Container (Occupying Top Half) */}
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-black/30" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 right-4 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#d4af37]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
                    {service.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
