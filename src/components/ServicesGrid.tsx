"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Sliders, Wrench, CheckCircle2 } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import { EASE_OUT, VIEWPORT } from "@/components/motion/motion-config";

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
    <section id="services" className="py-24 section-roast relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 relative">
          {/* La linea se dibuja de izquierda a derecha al entrar la seccion */}
          <motion.div
            className="absolute bottom-0 inset-x-0 coffee-hairline origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          />
          <div>
            <Reveal y={12} duration={0.6}>
              <span className="eyebrow text-xs text-gradient-mocha block mb-3">
                Craftsmanship &amp; Engineering
              </span>
            </Reveal>
            <RevealText
              as="h2"
              text="Bespoke End-to-End Solutions"
              stagger={0.022}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient-coffee font-normal tracking-[0.02em]"
            />
          </div>
          <RevealText
            as="p"
            text="From initial concept render to the final screw, we control every step of custom interior creation."
            stagger={0.005}
            duration={0.5}
            delay={0.2}
            className="text-latte-400 text-sm md:text-base font-light max-w-md mt-4 md:mt-0"
          />
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
                className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              >
                {/* Top Image Container (Occupying Top Half) */}
                <RevealImage
                  src={service.image}
                  alt={service.title}
                  delay={index * 0.15 + 0.1}
                  className="relative h-64 overflow-hidden bg-espresso-800"
                  imgClassName="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07] filter brightness-[0.8] contrast-105 saturate-[0.8] sepia-[0.3]"
                >
                  {/* Tinte cafe sobre la fotografia */}
                  <div className="absolute inset-0 bg-linear-to-br from-mocha-700/40 to-espresso-900/50 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso-800 via-espresso-900/20 to-espresso-950/40" />

                  {/* Floating Icon Badge — gira un poco al pasar por la tarjeta */}
                  <div className="coffee-ring absolute top-4 right-4 p-3 rounded-full backdrop-blur-md text-mocha-200 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                </RevealImage>

                {/* Content Container */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-latte-100 font-normal mb-3 group-hover:text-mocha-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-latte-300 text-sm font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="pt-4 relative flex flex-col gap-2.5">
                    <div className="absolute top-0 inset-x-0 coffee-hairline" />
                    {service.highlights.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={VIEWPORT}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.15 + 0.45 + i * 0.09,
                          ease: EASE_OUT,
                        }}
                        className="flex items-center gap-2.5 text-xs text-latte-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-mocha-400 shrink-0" />
                        <span>{item}</span>
                      </motion.div>
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
