"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/constants";
import { DURATION, EASE_SOFT } from "@/components/motion/motion-config";

const AUTOPLAY_MS = 6500;

/**
 * Fondo del hero al estilo Gensler: las fotos se relevan con fundido cruzado
 * mientras cada una hace su propio Ken Burns, y los controles solo aparecen
 * cuando el puntero esta sobre el hero.
 *
 * Va detras del titular, asi que los controles son el unico elemento que
 * recibe puntero — el resto lleva pointer-events-none para no comerse los CTA.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = HERO_SLIDES;

  // Guarda la direccion del ultimo salto para orientar el desplazamiento del
  // fundido; con el autoplay siempre es hacia delante.
  const directionRef = useRef(1);

  const goTo = useCallback(
    (next: number, direction: number) => {
      directionRef.current = direction;
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [next, paused, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.crossfade, ease: EASE_SOFT }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            /* El Ken Burns es CSS y no framer-motion: es una animacion larga en
               bucle sobre una capa fija, y el compositor la lleva sola. La
               media query de prefers-reduced-motion en globals.css la detiene. */
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-105 saturate-[0.75] sepia-[0.35] animate-ken-burns"
            /* La primera imagen es LCP: se carga sin esperar al scroll. */
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>

      {/* Capas de color cafe sobre la fotografia */}
      <div className="absolute inset-0 bg-linear-to-br from-mocha-800/45 via-espresso-800/30 to-espresso-950/60 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-espresso-950 via-espresso-900/65 to-espresso-900/85 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-espresso-900/45 to-espresso-950 pointer-events-none" />

      {slides.length > 1 && (
        <>
          {/* Flechas: invisibles hasta que el puntero entra en el hero */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="group/arrow absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-latte-100/70 opacity-0 -translate-x-2 hover:text-latte-50 focus-visible:opacity-100 focus-visible:translate-x-0 transition-all duration-500 [@media(hover:hover)]:group-hover/hero:opacity-100 [@media(hover:hover)]:group-hover/hero:translate-x-0 max-md:opacity-100 max-md:translate-x-0"
          >
            <ChevronLeft className="w-7 h-7 transition-transform duration-300 group-hover/arrow:-translate-x-1" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="group/arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-latte-100/70 opacity-0 translate-x-2 hover:text-latte-50 focus-visible:opacity-100 focus-visible:translate-x-0 transition-all duration-500 [@media(hover:hover)]:group-hover/hero:opacity-100 [@media(hover:hover)]:group-hover/hero:translate-x-0 max-md:opacity-100 max-md:translate-x-0"
          >
            <ChevronRight className="w-7 h-7 transition-transform duration-300 group-hover/arrow:translate-x-1" />
          </button>

          {/* Paginacion: la activa se alarga en vez de solo encenderse */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
            {slides.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === index
                    ? "w-8 bg-linear-to-r from-mocha-200 to-mocha-500"
                    : "w-1.5 bg-latte-100/35 hover:bg-latte-100/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
