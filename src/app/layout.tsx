import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "PisoMatch — Encuentra tu compañero de piso ideal",
  description:
    "PisoMatch es la plataforma de matching inteligente para encontrar compañeros de piso en España.",
  keywords:
    "compartir piso, compañero de piso, piso compartido, Madrid, Barcelona, Valencia, Sevilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-[family-name:var(--font-inter)] antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
