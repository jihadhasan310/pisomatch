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

export default function MatchFilters({ listings, children }: MatchFiltersProps) {
  const [city, setCity] = useState("Todas");
  const [type, setType] = useState("todos");
  const [priceMax, setPriceMax] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = city !== "Todas" || type !== "todos" || priceMax < 2000;

  const filtered = listings.filter((listing) => {
    if (city !== "Todas" && listing.city !== city) return false;
    if (type !== "todos" && listing.type !== type) return false;
    if (listing.price > priceMax) return false;
    return true;
  });

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* City pills */}
        <div className="flex gap-1">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider border ${
                city === c
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Type pills */}
        <div className="flex gap-1">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider border ${
                type === t.value
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* More filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1.5 text-[10px] uppercase tracking-wider border border-gray-200 text-gray-400 hover:border-black hover:text-black flex items-center gap-1"
        >
          + Filtros
          {hasActiveFilters && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
        </button>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={() => { setCity("Todas"); setType("todos"); setPriceMax(2000); }}
            className="text-[10px] text-gray-400 hover:text-black uppercase tracking-wider underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div className="border border-gray-200 p-4 mb-6 bg-gray-50 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400">Máx €/mes</label>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-32 accent-black"
            />
            <span className="text-xs font-mono w-12">{priceMax}€</span>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {children(filtered)}
    </div>
  );
}
