import type { Metadata } from "next";
import { Poiret_One, Josefin_Sans } from "next/font/google";
import "./globals.css";

// Display Art Déco (marca, titulares, epígrafes). Peso único 400, sin cursiva.
const poiretOne = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poiret",
  display: "swap",
});

// Geométrica 1920s para cuerpo e interfaz. Variable 100–700 + cursivas.
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MasterSpace | Elevated Custom Interiors NYC",
  description: "Elevated interiors for New York living. Manhattan, Brooklyn, Queens, Long Island & beyond. Free 3D Design, Precision Cutting, and Assembly.",
  keywords: ["MasterSpace", "Custom Interiors NYC", "Bespoke Kitchens New York", "Precision Millwork", "3D Architectural Design", "Manhattan Interior Design", "Long Island Interior Design", "Custom Walk-in Closets Long Island"],
  openGraph: {
    title: "MasterSpace | Elevated Custom Interiors NYC",
    description: "The beauty is in the details. Elevated interiors for New York living.",
    url: "https://masterspace.nyc",
    siteName: "MasterSpace NYC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poiretOne.variable} ${josefinSans.variable} dark scroll-smooth`}
    >
      <body className="bg-espresso-900 text-latte-100 antialiased min-h-screen flex flex-col selection:bg-mocha-400 selection:text-espresso-950">
        {children}
      </body>
    </html>
  );
}
