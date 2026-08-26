import React from "react";

interface BrandLogoProps {
  /** Alto del lockup en clases Tailwind (el ancho se calcula solo). */
  className?: string;
  priority?: boolean;
}

/**
 * Lockup oficial MasterSpace (monograma MS + wordmark + "Interior Design").
 * El archivo vive en /public/images/masterspace-logo.svg — reemplazarlo ahi
 * (mismo nombre) actualiza el logo en toda la web sin tocar codigo.
 */
export default function BrandLogo({ className = "h-12 w-auto", priority }: BrandLogoProps) {
  return (
    <img
      src="/images/masterspace-logo.svg"
      alt="MasterSpace — Interior Design"
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
