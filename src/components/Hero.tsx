"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";
import HeroCarousel from "@/components/HeroCarousel";
import RevealText from "@/components/motion/RevealText";
import { EASE_OUT } from "@/components/motion/motion-config";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  // El hero anima al montar, no al hacer scroll: cada bloque entra un poco
  // despues del anterior para que la mirada siga el orden de lectura.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section className="group/hero relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Carrusel de fondo con fundido cruzado y Ken Burns */}
      <HeroCarousel />

      {/* Halo calido tras el titular */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] coffee-glow blur-3xl pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center pointer-events-none">
        {/* Top Tag badge */}
        <motion.div
          {...enter(0)}
          className="coffee-chip inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-mocha-300" />
          <span className="eyebrow text-xs text-mocha-200">
            NYC Architectural Millwork &amp; Custom Interiors
          </span>
        </motion.div>

        {/* Titular: la onda de opacidad letra a letra */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.02em] leading-[1.08] mb-8">
          <RevealText
            as="span"
            text={"The beauty is in\nthe details."}
            onMount
            delay={0.25}
            stagger={0.042}
            duration={0.95}
            from={0.08}
            className="block text-gradient-coffee"
          />
        </h1>

        {/* Subtitle */}
        <RevealText
          as="p"
          text="Elevated custom interiors for New York living. Serving Manhattan, Brooklyn, Queens, Long Island & beyond with precision craft and photorealistic 3D vision."
          onMount
          delay={0.95}
          stagger={0.005}
          duration={0.5}
          from={0.1}
          className="text-base sm:text-lg md:text-xl text-latte-300 max-w-2xl font-light leading-relaxed mb-10"
        />

        {/* Call to Action Buttons */}
        <motion.div
          {...enter(1.25)}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto"
        >
          <button
            onClick={onOpenConsultation}
            className="btn-coffee w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-[0.2em] hover:scale-[1.02]"
          >
            <span>Start Free 3D Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="#portfolio"
            className="btn-coffee-ghost w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full backdrop-blur-md text-latte-100 font-medium text-xs uppercase tracking-[0.2em]"
          >
            Explore Projects
          </a>
        </motion.div>

        {/* Location badge bottom — las reglas se abren desde el centro */}
        <motion.div
          {...enter(1.5)}
          className="mt-16 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-latte-400 font-light flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4"
        >
          <motion.span
            className="hidden sm:block w-10 h-px bg-linear-to-r from-transparent to-mocha-600 origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.7, ease: EASE_OUT }}
          />
          <span className="text-center">{SERVICE_AREAS.join(" • ")}</span>
          <motion.span
            className="hidden sm:block w-10 h-px bg-linear-to-l from-transparent to-mocha-600 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.7, ease: EASE_OUT }}
          />
        </motion.div>
      </div>

      {/* Indicador de scroll: una brasa que recorre el hilo en bucle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:block"
      >
        <div className="w-px h-12 bg-linear-to-b from-transparent via-mocha-400/60 to-transparent overflow-hidden">
          <motion.div
            className="w-px h-4 bg-mocha-200"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
