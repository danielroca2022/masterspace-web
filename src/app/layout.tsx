import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MasterSpace | Elevated Custom Interiors NYC",
  description: "Elevated interiors for New York living. Manhattan, Brooklyn, Queens & beyond. Free 3D Design, Precision Cutting, and Assembly.",
  keywords: ["MasterSpace", "Custom Interiors NYC", "Bespoke Kitchens New York", "Precision Millwork", "3D Architectural Design", "Manhattan Interior Design"],
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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#090a0c] text-[#f4f4f6] antialiased min-h-screen flex flex-col selection:bg-[#d4af37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
