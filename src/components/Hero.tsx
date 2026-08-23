"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Media Container with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="MasterSpace Luxury NYC Interior"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/60 to-[#090a0c]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#090a0c]/40 to-[#090a0c]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Top Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-black/50 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#f3e5ab] font-medium">
            NYC Architectural Millwork & Custom Interiors
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.08] mb-8"
        >
          The beauty is in <br className="hidden sm:block" />
          <span className="italic font-light text-neutral-200">the details.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed mb-10"
        >
          Elevated custom interiors for New York living. Serving Manhattan, Brooklyn, Queens & beyond with precision craft and photorealistic 3D vision.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#f3e5ab] hover:scale-[1.02] shadow-xl hover:shadow-[#d4af37]/25"
          >
            <span>Start Free 3D Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <a
            href="#portfolio"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Explore Projects
          </a>
        </motion.div>

        {/* Location badge bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 text-xs uppercase tracking-[0.3em] text-neutral-400 font-light flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-neutral-700"></span>
          <span>Manhattan • Brooklyn • Queens</span>
          <span className="w-8 h-[1px] bg-neutral-700"></span>
        </motion.div>
      </div>
    </section>
  );
}
