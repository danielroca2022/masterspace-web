"use client";

import React, { useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectGallery from "@/components/ProjectGallery";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  return (
    /* reducedMotion="user" hace que framer-motion desactive por su cuenta los
       desplazamientos y escalas cuando el sistema pide menos movimiento, sin
       que ningun componente tenga que renderizar un DOM distinto (lo que
       romperia la hidratacion). Los fundidos se conservan. */
    <MotionConfig reducedMotion="user">
      <SiteSettingsProvider>
        <main className="min-h-screen text-latte-100 relative z-10 selection:bg-mocha-400 selection:text-espresso-950">
          {/* Navigation Header */}
          <Navbar onOpenConsultation={handleOpenConsultation} />

          {/* Hero Section */}
          <Hero onOpenConsultation={handleOpenConsultation} />

          {/* Services Grid (Free 3D Design, Precision Cutting, Assembly) */}
          <ServicesGrid />

          {/* Portfolio Showcase */}
          <ProjectGallery />

          {/* Process & Methodology */}
          <ProcessSection />

          {/* Footer */}
          <Footer onOpenConsultation={handleOpenConsultation} />

          {/* Floating WhatsApp Widget */}
          <WhatsAppButton />

          {/* Consultation Booking Modal */}
          <ConsultationModal
            isOpen={consultationOpen}
            onClose={handleCloseConsultation}
          />
        </main>
      </SiteSettingsProvider>
    </MotionConfig>
  );
}
