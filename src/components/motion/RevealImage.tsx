"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "./motion-config";

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Clases para el <img>: object-fit, filtros, hover del grupo, etc. */
  imgClassName?: string;
  delay?: number;
  /** Direccion desde la que se descubre la imagen. */
  direction?: "up" | "down" | "left" | "right";
  children?: React.ReactNode;
};

const CLOSED = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

const OPEN = "inset(0% 0% 0% 0%)";

const VIEWPORT_IMAGE = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Cortina: la imagen se descubre con un clip-path mientras baja de un ligero
 * zoom de entrada.
 *
 * Son tres capas a proposito: el clip en el contenedor, el zoom de entrada en
 * un div intermedio y el <img> desnudo al fondo. Asi la animacion de entrada y
 * el hover del padre viven en elementos distintos y ninguno pisa al otro,
 * aunque el hover pase algun dia de la propiedad scale a transform.
 */
export default function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  direction = "up",
  children,
}: RevealImageProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: CLOSED[direction] }}
      whileInView={{ clipPath: OPEN }}
      viewport={VIEWPORT_IMAGE}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT_IMAGE}
        transition={{ duration: 1.5, delay, ease: EASE_OUT }}
      >
        <img src={src} alt={alt} className={imgClassName} />
      </motion.div>
      {children}
    </motion.div>
  );
}
