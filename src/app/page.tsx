"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectGallery from "@/components/ProjectGallery";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  return (
    <main className="min-h-screen bg-[#090a0c] text-[#f4f4f6] relative selection:bg-[#d4af37] selection:text-black">
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
  );
}
