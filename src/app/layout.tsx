import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PisoMatch — Encuentra tu compañero de piso ideal",
  description:
    "PisoMatch es la plataforma de matching inteligente para encontrar compañeros de piso en España. Conectamos personas según compatibilidad de estilo de vida, presupuesto y ciudad.",
  keywords:
    "compartir piso, compañero de piso, piso compartido, Madrid, Barcelona, Valencia, Sevilla",
  openGraph: {
    title: "PisoMatch — Encuentra tu compañero de piso ideal",
    description:
      "Matching inteligente para vivir en España. Encuentra tu compañero de piso ideal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
