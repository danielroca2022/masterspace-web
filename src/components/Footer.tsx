"use client";

import React from "react";
import { Phone, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060708] border-t border-white/10 pt-20 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Regional Tagline */}
          <div className="lg:col-span-6">
            <a href="#" className="inline-block mb-4">
              <span className="font-serif text-3xl md:text-4xl text-white font-normal tracking-tight">
                masterspace
              </span>
            </a>
            <p className="text-neutral-300 text-sm md:text-base font-light max-w-md leading-relaxed mb-6">
              Elevated interiors for New York living. Manhattan, Brooklyn, Queens & beyond.
            </p>
            <div className="flex items-center gap-4 text-xs tracking-widest text-[#d4af37] uppercase">
              <span>Precision Millwork</span>
              <span>•</span>
              <span>3D Visualization</span>
              <span>•</span>
              <span>White-Glove</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Services (3D, Cutting, Assembly)
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#d4af37] transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#d4af37] transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-[#d4af37] transition-colors text-left">
                  Request Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Action */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold mb-4">
                Consultations
              </h4>
              <p className="text-xs text-neutral-400 font-light mb-6">
                Ready to transform your NYC apartment? Schedule a free 3D design session today.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="group flex items-center justify-between px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-black text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md"
            >
              <span>Book a Consultation</span>
              <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>
          </div>
        </div>

        {/* Bottom Bar matching screenshot exact text */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-400">
          <p className="tracking-widest uppercase">
            © 2026 MASTERSPACE NYC — CRAFTED WITH INTENTION.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
