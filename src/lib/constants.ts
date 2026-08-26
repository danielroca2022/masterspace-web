/** Categorias disponibles para el portafolio (admin + filtros de la landing). */
export const PROJECT_CATEGORIES = [
  "Kitchens",
  "Wardrobes",
  "Living Spaces",
  "Bathroom",
  "Living Room",
  "Walk-in Closet",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** Zonas de servicio que se muestran en hero, footer y metadata. */
export const SERVICE_AREAS = ["Manhattan", "Brooklyn", "Queens", "Long Island"] as const;

/** Opciones del selector de zona en el formulario de consulta. */
export const BOROUGH_OPTIONS = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Long Island",
  "Staten Island",
  "Bronx",
  "Other NY / NJ",
] as const;

/** Tipos de proyecto del formulario de consulta. */
export const PROJECT_TYPE_OPTIONS = [
  "Custom Kitchen",
  "Wardrobe / Dressing Room",
  "Walk-in Closet",
  "Bathroom",
  "Living Room Millwork",
  "Full Apartment Renovation",
] as const;

/**
 * Slides del carrusel del hero. Se recorren en bucle con fundido cruzado y
 * cada una hace su propio Ken Burns, asi que conviene usar fotos amplias:
 * el zoom recorta ~10% de los bordes.
 */
export const HERO_SLIDES = [
  { src: "/images/hero-bg.jpg", alt: "Custom kitchen millwork in a Manhattan apartment" },
  { src: "/images/service-3d.jpg", alt: "Photorealistic 3D render of a bespoke interior" },
  { src: "/images/service-cutting.jpg", alt: "Precision CNC cutting of custom cabinetry panels" },
  { src: "/images/service-assembly.jpg", alt: "Master craftsmen installing custom millwork on site" },
] as const;
