"use client";

import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { buildWhatsAppUrl, normalizeUrl } from "@/lib/site-settings";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.6 2.6 0 1 1-1.86-2.49V9.73a5.7 5.7 0 1 0 4.96 5.65V9.01a7.35 7.35 0 0 0 4.3 1.38V7.29a4.29 4.29 0 0 1-3.25-1.47Z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.79-.17-2 .03-2.87.19-.78 1.2-4.94 1.2-4.94s-.3-.61-.3-1.52c0-1.42.82-2.48 1.85-2.48.87 0 1.29.66 1.29 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.83 0 3.23-1.93 3.23-4.71 0-2.46-1.77-4.18-4.3-4.18-2.93 0-4.65 2.19-4.65 4.46 0 .88.34 1.83.76 2.35.09.1.1.19.07.29-.08.32-.25.99-.28 1.13-.05.19-.15.23-.35.14-1.3-.61-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.6 0 6.4 2.57 6.4 6 0 3.58-2.25 6.46-5.39 6.46-1.05 0-2.04-.55-2.38-1.2l-.65 2.47c-.23.9-.86 2.03-1.29 2.72A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

/** Iconos de redes de la landing; solo aparecen los que tengan URL cargada en /admin. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const settings = useSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(settings);

  const links = [
    { key: "instagram", label: "Instagram", href: normalizeUrl(settings.instagram), Icon: Instagram },
    { key: "facebook", label: "Facebook", href: normalizeUrl(settings.facebook), Icon: Facebook },
    { key: "tiktok", label: "TikTok", href: normalizeUrl(settings.tiktok), Icon: TikTokIcon },
    { key: "pinterest", label: "Pinterest", href: normalizeUrl(settings.pinterest), Icon: PinterestIcon },
    { key: "youtube", label: "YouTube", href: normalizeUrl(settings.youtube), Icon: Youtube },
    { key: "whatsapp", label: "WhatsApp", href: whatsappUrl ?? "", Icon: WhatsAppIcon },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="coffee-ring flex items-center justify-center w-10 h-10 rounded-full text-latte-300 hover:text-espresso-950 hover:bg-linear-to-br hover:from-mocha-200 hover:to-mocha-600 transition-all duration-300"
        >
          <Icon className="w-[18px] h-[18px]" />
        </a>
      ))}
    </div>
  );
}
