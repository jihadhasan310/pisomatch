"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-[family-name:var(--font-playfair)] font-bold text-black">
          PisoMatch
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#como-funciona" className="text-sm text-gray-500 hover:text-black">
            Cómo funciona
          </Link>
          <Link href="/#precios" className="text-sm text-gray-500 hover:text-black">
            Precios
          </Link>
          <Link href="/login" className="text-sm text-gray-500 hover:text-black">
            Entrar
          </Link>
          <Link
            href="/registro"
            className="text-sm bg-black text-white px-5 py-2 hover:bg-gray-800 uppercase tracking-wider text-xs font-medium"
          >
            Empieza gratis
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/#como-funciona" className="block text-sm text-gray-500">Cómo funciona</Link>
          <Link href="/#precios" className="block text-sm text-gray-500">Precios</Link>
          <Link href="/login" className="block text-sm text-gray-500">Entrar</Link>
          <Link href="/registro" className="block text-sm bg-black text-white px-4 py-2 text-center uppercase tracking-wider text-xs font-medium">
            Empieza gratis
          </Link>
        </div>
      )}
    </nav>
  );
}
