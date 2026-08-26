"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, ShieldCheck } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import { EASE_OUT, VIEWPORT } from "@/components/motion/motion-config";

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
    <section id="process" className="py-24 section-roast relative overflow-hidden">
      {/* Halo ambiental de café tostado */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60rem] h-[35rem] coffee-glow blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal y={12} duration={0.6}>
            <span className="eyebrow text-xs text-gradient-mocha block mb-3">
              Our Method
            </span>
          </Reveal>
          <RevealText
            as="h2"
            text="Crafted with Intention"
            stagger={0.028}
            duration={0.8}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient-coffee font-normal tracking-[0.02em] mb-4"
          />
          <RevealText
            as="p"
            text="A seamless three-step process designed to make high-end NYC interior customization stress-free and predictable."
            stagger={0.005}
            duration={0.5}
            delay={0.25}
            className="text-latte-400 text-sm md:text-base font-light"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Hilo que enlaza los tres pasos: se traza al entrar la seccion y
              deja claro que el proceso es una secuencia, no tres bloques. */}
          <motion.div
            aria-hidden="true"
            className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-px origin-left bg-linear-to-r from-mocha-500/0 via-mocha-400/45 to-mocha-500/0 pointer-events-none"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.4, delay: 0.35, ease: EASE_OUT }}
          />
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-8 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <motion.span
                      className="font-display text-5xl font-light bg-linear-to-b from-mocha-300/70 to-mocha-700/20 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.25, ease: EASE_OUT }}
                    >
                      {item.step}
                    </motion.span>
                    <motion.div
                      className="coffee-ring p-3 rounded-xl text-mocha-200"
                      initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.35, ease: EASE_OUT }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>

                  <RevealText
                    as="h3"
                    text={item.title}
                    stagger={0.018}
                    delay={index * 0.2 + 0.3}
                    className="font-display text-2xl text-latte-50 font-normal mb-3"
                  />

                  <RevealText
                    as="p"
                    text={item.description}
                    stagger={0.004}
                    duration={0.5}
                    delay={index * 0.2 + 0.5}
                    className="text-latte-300 text-sm font-light leading-relaxed"
                  />
                </div>

                <div className="mt-8 pt-4 relative flex items-center gap-2 text-[11px] uppercase tracking-widest text-mocha-300">
                  <div className="absolute top-0 inset-x-0 coffee-hairline" />
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
