"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ListingType } from "@/lib/types";

const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla"];

export default function NuevoAnuncioPage() {
  const supabase = createClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    type: "ofrezco" as ListingType,
    city: "Madrid",
    price: 400,
    description: "",
    preferences: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error: insertError } = await supabase.from("listings").insert({
      user_id: user.id,
      type: form.type,
      city: form.city,
      price: form.price,
      description: form.description,
      preferences: form.preferences,
      images: [],
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/dashboard/mis-anuncios");
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nuevo anuncio</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de anuncio</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "ofrezco" })}
              className={`flex-1 px-4 py-2 rounded-lg text-sm border ${
                form.type === "ofrezco"
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              Ofrezco habitación
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "busco" })}
              className={`flex-1 px-4 py-2 rounded-lg text-sm border ${
                form.type === "busco"
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              Busco habitación
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">Ciudad</label>
          <select
            id="city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">Precio (€/mes)</label>
          <input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            min={0}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Describe la habitación, el piso, la zona..."
          />
        </div>

        <div>
          <label htmlFor="preferences" className="block text-sm font-medium mb-1">Preferencias del compañero</label>
          <textarea
            id="preferences"
            value={form.preferences}
            onChange={(e) => setForm({ ...form, preferences: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="¿Qué buscas en un compañero de piso?"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Publicando..." : "Publicar anuncio"}
        </button>
      </form>
    </div>
  );
}
