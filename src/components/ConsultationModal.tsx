"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BOROUGH_OPTIONS, PROJECT_TYPE_OPTIONS } from "@/lib/constants";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    borough: "Manhattan",
    projectType: "Custom Kitchen",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save lead submission to Supabase DB
      await supabase.from("masterspace_leads").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          borough: formData.borough,
          project_type: formData.projectType,
          details: formData.details,
        },
      ]);
    } catch (err) {
      console.error("Error saving lead", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
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
            className="fixed inset-0 bg-linear-to-br from-espresso-900/90 via-espresso-950/92 to-espresso-800/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="coffee-panel relative w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-espresso-950/80 z-10 my-8 overflow-hidden"
          >
            {/* Halo superior de acento */}
            <div className="absolute -top-24 -right-16 w-72 h-72 coffee-glow blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-2 rounded-full coffee-ring text-latte-300 hover:text-latte-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="relative text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-mocha-200 to-mocha-700 text-espresso-950 flex items-center justify-center mb-6 shadow-lg shadow-mocha-700/40">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-gradient-coffee font-normal mb-3">
                  Consultation Requested
                </h3>
                <p className="text-latte-300 text-sm font-light max-w-md leading-relaxed mb-8">
                  Thank you, <span className="text-latte-50 font-medium">{formData.name}</span>. Our NYC design team will review your project details and respond within 24 hours to schedule your free 3D design session.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-coffee px-8 py-3 rounded-full font-semibold text-xs uppercase tracking-widest"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-mocha-300" />
                  <span className="eyebrow text-xs text-gradient-mocha">
                    Free 3D Design Session
                  </span>
                </div>
                <h3 className="font-display text-3xl text-gradient-coffee font-normal mb-2">
                  Book a Consultation
                </h3>
                <p className="text-latte-400 text-xs sm:text-sm font-light mb-6">
                  Transform your New York space with precision 3D modeling and bespoke millwork.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm placeholder:text-latte-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(212) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm placeholder:text-latte-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm placeholder:text-latte-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                        Location / Borough
                      </label>
                      <select
                        value={formData.borough}
                        onChange={(e) => setFormData({ ...formData, borough: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm"
                      >
                        {BOROUGH_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-espresso-800">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                        Project Interest
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm"
                      >
                        {PROJECT_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-espresso-800">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-latte-300 font-medium mb-1.5">
                      Project Notes / Timeline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your space, dimensions, or style preferences..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl coffee-field text-latte-100 text-sm placeholder:text-latte-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-coffee mt-2 w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <span>{submitting ? "Sending Request..." : "Request Free 3D Design"}</span>
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
