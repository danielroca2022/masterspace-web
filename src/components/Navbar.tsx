"use client";

import React, { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { EASE_OUT } from "@/components/motion/motion-config";

/** Enlaces del menu. Los usan tanto el nav de escritorio como el cajon movil. */
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
] as const;

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
        scrolled
          ? "glass-nav py-3 shadow-2xl shadow-espresso-950/60"
          : "bg-linear-to-b from-espresso-950/85 via-espresso-900/45 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
        {/* Mobile Menu Button (izquierda en movil) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-latte-100 p-2 rounded-lg border border-mocha-500/25 bg-linear-to-br from-espresso-700/70 to-espresso-950/70 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links — entran escalonados al cargar la pagina */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE_OUT }}
              className="nav-link text-xs uppercase tracking-[0.2em] text-latte-300 hover:text-mocha-400 transition-colors duration-200 font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA + Logo, alineados a la derecha */}
        <div className="flex items-center gap-5 md:gap-7">
          <button
            onClick={onOpenConsultation}
            className="btn-coffee-ghost group hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-full text-latte-100 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <span>Book a Consultation</span>
            <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
          </button>

          {/* Logo oficial a la derecha de la navbar */}
          <a
            href="#"
            aria-label="MasterSpace — inicio"
            className="shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <BrandLogo
              priority
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-11 md:h-12" : "h-12 md:h-14"
              }`}
            />
          </a>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="md:hidden bg-linear-to-b from-espresso-800/97 via-espresso-900/97 to-espresso-950/97 backdrop-blur-xl border-b border-mocha-500/20 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: EASE_OUT }}
                  className="text-sm uppercase tracking-widest text-latte-300 hover:text-mocha-400"
                >
                  {link.label}
                </motion.a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="btn-coffee flex items-center justify-center gap-2 mt-2 w-full py-3 rounded-full font-semibold text-xs uppercase tracking-widest"
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
