import { supabase } from "@/lib/supabase";

/** Ajustes de contacto editables desde /admin y reflejados en la landing. */
export interface SiteSettings {
  whatsappNumber: string;
  whatsappMessage: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  pinterest: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  whatsappNumber: "12125550199",
  whatsappMessage:
    "Hello MasterSpace, I would like to inquire about a custom interior 3D design.",
  phone: "",
  email: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  youtube: "",
  pinterest: "",
};

const SETTINGS_TABLE = "masterspace_settings";
const SETTINGS_KEY = "site";

/** Deja el numero solo en digitos, como lo exige wa.me. */
export function normalizeWhatsAppNumber(raw: string): string {
  return (raw || "").replace(/\D/g, "");
}

/** URL de WhatsApp lista para usar, o null si no hay numero configurado. */
export function buildWhatsAppUrl(settings: SiteSettings): string | null {
  const number = normalizeWhatsAppNumber(settings.whatsappNumber);
  if (!number) return null;

  const message = settings.whatsappMessage?.trim();
  return message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`;
}

/** Antepone https:// a un handle o dominio pegado sin protocolo. */
export function normalizeUrl(raw: string): string {
  const value = (raw || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}

function coerce(raw: unknown): SiteSettings {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_SITE_SETTINGS };

  const source = raw as Record<string, unknown>;
  const merged = { ...DEFAULT_SITE_SETTINGS };

  (Object.keys(DEFAULT_SITE_SETTINGS) as (keyof SiteSettings)[]).forEach((field) => {
    const value = source[field];
    if (typeof value === "string") merged[field] = value;
  });

  return merged;
}

/** Lee los ajustes publicados; ante cualquier fallo devuelve los valores por defecto. */
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();

    if (error || !data) return { ...DEFAULT_SITE_SETTINGS };
    return coerce(data.value);
  } catch {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

/** Guarda (upsert) los ajustes en la fila unica `site`. */
export async function saveSiteSettings(settings: SiteSettings) {
  return supabase
    .from(SETTINGS_TABLE)
    .upsert({ key: SETTINGS_KEY, value: settings }, { onConflict: "key" });
}
