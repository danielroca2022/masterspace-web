"use client";

import React, { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-4 shadow-2xl" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-white font-semibold transition-colors duration-300 group-hover:text-[#d4af37]">
            masterspace
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            Portfolio
          </a>
          <a
            href="#process"
            className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            Process
          </a>
          <a
            href="#about"
            className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            About
          </a>
        </nav>

        {/* CTA Consultation Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-black text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/20"
          >
            <span>Book a Consultation</span>
            <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-lg border border-white/10 bg-black/40 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#090a0c]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-5">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-300 hover:text-[#d4af37]"
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-300 hover:text-[#d4af37]"
              >
                Portfolio
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-300 hover:text-[#d4af37]"
              >
                Process
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-300 hover:text-[#d4af37]"
              >
                About
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="flex items-center justify-center gap-2 mt-2 w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest"
              >
                <span>Book a Consultation</span>
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
