"use client";

import { useState } from "react";
import { ListingWithScore } from "@/lib/types";

interface MatchFiltersProps {
  listings: ListingWithScore[];
  children: (filtered: ListingWithScore[]) => React.ReactNode;
}

const cities = ["Todas", "Madrid", "Barcelona", "Valencia", "Sevilla"];
const types = [
  { value: "todos", label: "Todos" },
  { value: "ofrezco", label: "Ofrezco" },
  { value: "busco", label: "Busco" },
];
const lifestyles = [
  { value: "todos", label: "Todos" },
  { value: "quiet", label: "Tranquilo" },
  { value: "social", label: "Social" },
  { value: "party", label: "Fiestero" },
];

export default function MatchFilters({ listings, children }: MatchFiltersProps) {
  const [city, setCity] = useState("Todas");
  const [type, setType] = useState("todos");
  const [lifestyle, setLifestyle] = useState("todos");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2000);
  const [onlyPremium, setOnlyPremium] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = listings.filter((listing) => {
    if (city !== "Todas" && listing.city !== city) return false;
    if (type !== "todos" && listing.type !== type) return false;
    if (listing.price < priceMin || listing.price > priceMax) return false;
    if (lifestyle !== "todos" && listing.user?.lifestyle !== lifestyle) return false;
    if (onlyPremium && !listing.user?.premium) return false;
    return true;
  });

  return (
    <div>
      {/* Toggle filters */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-xs uppercase tracking-wider text-gray-400 hover:text-black mb-4 flex items-center gap-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros {showFilters ? "▲" : "▼"}
        {(city !== "Todas" || type !== "todos" || lifestyle !== "todos" || onlyPremium) && (
          <span className="ml-2 bg-black text-white text-[10px] px-1.5 py-0.5">activos</span>
        )}
      </button>

      {showFilters && (
        <div className="border border-gray-200 p-5 mb-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Ciudad */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Ciudad</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-b border-gray-200 bg-transparent text-sm py-1.5 focus:outline-none focus:border-black"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border-b border-gray-200 bg-transparent text-sm py-1.5 focus:outline-none focus:border-black"
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Lifestyle */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Estilo de vida</label>
              <select
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                className="w-full border-b border-gray-200 bg-transparent text-sm py-1.5 focus:outline-none focus:border-black"
              >
                {lifestyles.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Precio min */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Precio mín</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                min={0}
                step={50}
                className="w-full border-b border-gray-200 bg-transparent text-sm py-1.5 focus:outline-none focus:border-black"
              />
            </div>

            {/* Precio max */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Precio máx</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                min={0}
                step={50}
                className="w-full border-b border-gray-200 bg-transparent text-sm py-1.5 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Premium filter + reset */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyPremium}
                onChange={(e) => setOnlyPremium(e.target.checked)}
                className="rounded-none border-gray-300"
              />
              Solo Premium
            </label>
            <button
              onClick={() => {
                setCity("Todas");
                setType("todos");
                setLifestyle("todos");
                setPriceMin(0);
                setPriceMax(2000);
                setOnlyPremium(false);
              }}
              className="text-xs text-gray-400 hover:text-black uppercase tracking-wider"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-4 font-mono">
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Render filtered listings */}
      {children(filtered)}
    </div>
  );
}
