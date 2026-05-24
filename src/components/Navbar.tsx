"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-white border-b border-gray-100"}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo href="/" />

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#como-funciona" className="text-sm text-gray-500 hover:text-black transition-colors">
            Cómo funciona
          </Link>
          <Link href="/#precios" className="text-sm text-gray-500 hover:text-black transition-colors">
            Precios
          </Link>
          <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">
            Entrar
          </Link>
          <Link
            href="/registro"
            className="text-xs bg-black text-white px-5 py-2.5 hover:bg-gray-800 uppercase tracking-[0.15em] font-medium transition-colors"
          >
            Empieza gratis
          </Link>
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-4">
          <Link href="/#como-funciona" className="block text-sm text-gray-500" onClick={() => setMenuOpen(false)}>Cómo funciona</Link>
          <Link href="/#precios" className="block text-sm text-gray-500" onClick={() => setMenuOpen(false)}>Precios</Link>
          <Link href="/login" className="block text-sm text-gray-500" onClick={() => setMenuOpen(false)}>Entrar</Link>
          <Link href="/registro" className="block text-xs bg-black text-white px-4 py-2.5 text-center uppercase tracking-[0.15em] font-medium" onClick={() => setMenuOpen(false)}>
            Empieza gratis
          </Link>
        </div>
      )}
    </nav>
  );
}
