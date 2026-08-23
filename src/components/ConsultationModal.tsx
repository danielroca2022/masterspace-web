"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Sparkles } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    borough: "Manhattan",
    projectType: "Custom Kitchen",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds on success
      // setSubmitted(false);
    }, 4000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#12141a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-white font-normal mb-3">
                  Consultation Requested
                </h3>
                <p className="text-neutral-300 text-sm font-light max-w-md leading-relaxed mb-8">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Our NYC design team will review your project details and respond within 24 hours to schedule your free 3D design session.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f3e5ab] transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                    Free 3D Design Session
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white font-normal mb-2">
                  Book a Consultation
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-light mb-6">
                  Transform your New York space with precision 3D modeling and bespoke millwork.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(212) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                        Location / Borough
                      </label>
                      <select
                        value={formData.borough}
                        onChange={(e) => setFormData({ ...formData, borough: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        <option value="Manhattan" className="bg-[#12141a]">Manhattan</option>
                        <option value="Brooklyn" className="bg-[#12141a]">Brooklyn</option>
                        <option value="Queens" className="bg-[#12141a]">Queens</option>
                        <option value="Staten Island" className="bg-[#12141a]">Staten Island</option>
                        <option value="Bronx" className="bg-[#12141a]">Bronx</option>
                        <option value="Other NY / NJ" className="bg-[#12141a]">Other NY / NJ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                        Project Interest
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        <option value="Custom Kitchen" className="bg-[#12141a]">Custom Kitchen</option>
                        <option value="Wardrobe / Dressing Room" className="bg-[#12141a]">Wardrobe / Dressing Room</option>
                        <option value="Living Room Millwork" className="bg-[#12141a]">Living Room Millwork</option>
                        <option value="Full Apartment Renovation" className="bg-[#12141a]">Full Apartment Renovation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                      Project Notes / Timeline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your space, dimensions, or style preferences..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-neutral-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-4 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#f3e5ab] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
                  >
                    <span>Request Free 3D Design</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
