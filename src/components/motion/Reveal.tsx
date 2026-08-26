"use client";

import React from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./motion-config";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Desplazamiento inicial en px. Negativo = entra desde arriba. */
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  /** Escala inicial, para tarjetas que deben "asentarse" al entrar. */
  scale?: number;
  as?: keyof typeof motion;
};

/**
 * Entrada estandar al hacer scroll: fade + un empujon corto hacia arriba.
 * Se usa para todo lo que no es tipografia grande (tarjetas, botones, chips).
 *
 * Bajo "reducir movimiento" el MotionConfig de la landing desactiva el
 * desplazamiento y deja solo el fundido, sin cambiar el DOM.
 */
export default function Reveal({
  children,
  className,
  y = 24,
  x = 0,
  delay = 0,
  duration = DURATION.base,
  scale,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
