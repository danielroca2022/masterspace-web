"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Recorrido total en px a lo largo de la travesia por el viewport. */
  distance?: number;
};

/**
 * Deriva vertical ligada al scroll. Se mantiene por debajo de ~80px: mas que
 * eso y el desfase se lee como error de maquetacion, no como profundidad.
 */
export default function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
