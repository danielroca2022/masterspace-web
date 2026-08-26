/**
 * Vocabulario de movimiento compartido por toda la landing.
 *
 * La referencia es gensler.com: curvas largas de salida, nada de rebotes y
 * texto que "se enciende" letra a letra en vez de deslizarse. Todo lo que
 * anima en la landing sale de estas constantes para que el ritmo sea uno solo.
 */

/** Salida exponencial: arranca rapido y frena muy largo. Es la curva base. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Curva mas suave para crossfades y opacidades puras. */
export const EASE_SOFT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/**
 * Disparo de scroll por defecto: la seccion empieza a animar cuando le falta
 * un 12% de viewport para entrar del todo, asi nunca se ve "ya animada".
 */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Igual que VIEWPORT pero mas tolerante, para bloques altos (galeria, footer). */
export const VIEWPORT_LOOSE = { once: true, margin: "0px 0px -5% 0px" } as const;

/** Duraciones en segundos, para no repetir numeros magicos por los componentes. */
export const DURATION = {
  fast: 0.45,
  base: 0.7,
  slow: 1.1,
  crossfade: 1.4,
} as const;
