"use client";

import React, { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { DURATION, EASE_SOFT, VIEWPORT } from "./motion-config";

type RevealTextProps = {
  /** Texto plano. Un "\n" fuerza salto de linea sin romper el escalonado. */
  text: string;
  /** Etiqueta semantica del contenedor (h1, h2, p...). Por defecto span. */
  as?: React.ElementType;
  className?: string;
  /** Opacidad de la que arranca cada letra antes de encenderse. */
  from?: number;
  /** Segundos entre el arranque de una letra y la siguiente. */
  stagger?: number;
  duration?: number;
  delay?: number;
  /** Anima al montar en lugar de esperar al scroll (util en el hero). */
  onMount?: boolean;
};

/**
 * El gesto tipografico de Gensler: el texto ya esta ahi, apenas visible, y una
 * onda lo recorre de izquierda a derecha subiendole la opacidad. No hay
 * desplazamiento — por eso no salta el layout ni se rompe el kerning.
 *
 * Los caracteres van en <span> aparte, asi que el contenedor lleva aria-label
 * con la frase entera y los fragmentos quedan ocultos al lector de pantalla.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className,
  from = 0.14,
  stagger = 0.016,
  duration = DURATION.base,
  delay = 0,
  onMount = false,
}: RevealTextProps) {
  // Indice global de caracter: el escalonado cruza palabras y lineas, si no la
  // onda se reiniciaria en cada palabra y el efecto se pierde.
  const lines = useMemo(() => {
    let index = 0;
    return text.split("\n").map((line) =>
      line.split(" ").map((word) => ({
        word,
        chars: Array.from(word).map((char) => ({ char, index: index++ })),
      }))
    );
  }, [text]);

  const charVariants: Variants = {
    hidden: { opacity: from },
    visible: (i: number) => ({
      opacity: 1,
      transition: { duration, delay: delay + i * stagger, ease: EASE_SOFT },
    }),
  };

  const activation = onMount
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: VIEWPORT };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span aria-hidden="true" initial="hidden" {...activation}>
        {lines.map((words, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {words.map(({ chars }, wordIndex) => (
              <React.Fragment key={`${lineIndex}-${wordIndex}`}>
                {/* La palabra entera es inline-block para que el navegador no
                    la parta entre caracteres al hacer wrap. */}
                <span className="inline-block whitespace-nowrap">
                  {chars.map(({ char, index }) => (
                    <motion.span key={index} custom={index} variants={charVariants}>
                      {char}
                    </motion.span>
                  ))}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
