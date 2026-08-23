"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discovery & Free 3D Render",
    icon: Compass,
    description:
      "We begin with a deep dive into your space and layout requirements. Within 48 hours, you receive a photorealistic 3D visualization of your project.",
  },
  {
    step: "02",
    title: "Precision Cut & Millwork",
    icon: Cpu,
    description:
      "Using Swiss CNC machinery and hand-selected raw materials, every panel is machined to sub-millimeter precision for perfect architectural alignment.",
  },
  {
    step: "03",
    title: "White-Glove Installation",
    icon: ShieldCheck,
    description:
      "Our team of master craftsmen installs your project on-site with extreme care, dust protection, and immaculate attention to every joint and reveal.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#090a0c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
            Our Method
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight mb-4">
            Crafted with Intention
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light">
            A seamless three-step process designed to make high-end NYC interior customization stress-free and predictable.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-8 relative flex flex-col justify-between border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-4xl text-[#d4af37]/40 font-light">
                      {item.step}
                    </span>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#d4af37]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal mb-3">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#d4af37]">
                  <span>Step {item.step} of 03</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
