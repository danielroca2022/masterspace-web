"use client";

import React from "react";
import { Phone, ArrowUp, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import SocialLinks from "@/components/SocialLinks";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";

interface FooterProps {
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const settings = useSiteSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-linear-to-b from-espresso-800 via-espresso-900 to-espresso-950 pt-20 pb-12 text-latte-400">
      <div className="absolute top-0 inset-x-0 coffee-hairline" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 relative">
          <div className="absolute bottom-0 inset-x-0 coffee-hairline" />
          {/* Brand & Regional Tagline */}
          <Reveal className="lg:col-span-6" y={28}>
            <a
              href="#"
              className="inline-block mb-5 transition-transform duration-500 ease-out hover:scale-[1.03]"
              aria-label="MasterSpace — inicio"
            >
              <BrandLogo className="h-20 md:h-24 w-auto" />
            </a>
            <RevealText
              as="p"
              text="Elevated interiors for New York living. Manhattan, Brooklyn, Queens, Long Island & beyond."
              stagger={0.006}
              duration={0.5}
              className="text-latte-300 text-sm md:text-base font-light max-w-md leading-relaxed mb-6"
            />
            <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-mocha-300 uppercase mb-8">
              <span>Precision Millwork</span>
              <span>•</span>
              <span>3D Visualization</span>
              <span>•</span>
              <span>White-Glove</span>
            </div>

            {/* Redes sociales — se administran desde /admin > Contacto & Redes */}
            <SocialLinks />
          </Reveal>

          {/* Quick Links */}
          <Reveal className="lg:col-span-3" y={28} delay={0.12}>
            <h4 className="text-xs uppercase tracking-[0.25em] text-latte-50 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href="#services" className="hover:text-mocha-400 transition-colors">
                  Services (3D, Cutting, Assembly)
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-mocha-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-mocha-400 transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-mocha-400 transition-colors text-left">
                  Request Consultation
                </button>
              </li>
            </ul>
          </Reveal>

          {/* Contact Action */}
          <Reveal className="lg:col-span-3 flex flex-col justify-between" y={28} delay={0.24}>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-latte-50 font-semibold mb-4">
                Consultations
              </h4>
              <p className="text-xs text-latte-400 font-light mb-4">
                Ready to transform your NYC apartment? Schedule a free 3D design session today.
              </p>

              <div className="flex flex-col gap-2 text-xs font-light mb-6">
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 hover:text-mocha-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0 text-mocha-400" />
                    <span>{settings.phone}</span>
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 hover:text-mocha-400 transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-mocha-400" />
                    <span>{settings.email}</span>
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="btn-coffee-ghost group flex items-center justify-between px-6 py-3.5 rounded-full text-latte-100 text-xs uppercase tracking-[0.18em] font-semibold"
            >
              <span>Book a Consultation</span>
              <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>
          </Reveal>
        </div>

        {/* Bottom Bar matching screenshot exact text */}
        <Reveal
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-latte-400"
          y={16}
          duration={0.6}
        >
          <p className="tracking-widest uppercase">
            © 2026 MASTERSPACE NYC — CRAFTED WITH INTENTION.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-latte-400 hover:text-latte-50 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </Reveal>
      </div>
    </footer>
  );
}
