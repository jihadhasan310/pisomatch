"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lifestyle } from "@/lib/types";

const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla"];
const lifestyles: { value: Lifestyle; label: string; desc: string }[] = [
  { value: "quiet", label: "Tranquilo", desc: "Prefiero silencio y orden" },
  { value: "social", label: "Social", desc: "Me gusta compartir pero respeto espacios" },
  { value: "party", label: "Fiestero", desc: "Salgo mucho y me gusta el ambiente" },
];

export default function PerfilPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    city: "Madrid",
    budget_min: 300,
    budget_max: 600,
    lifestyle: "social" as Lifestyle,
    smoking: false,
    pets: false,
    description: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setForm({
          name: data.name || "",
          city: data.city || "Madrid",
          budget_min: data.budget_min || 300,
          budget_max: data.budget_max || 600,
          lifestyle: data.lifestyle || "social",
          smoking: data.smoking || false,
          pets: data.pets || false,
          description: data.description || "",
        });
      } else {
        setForm((prev) => ({
          ...prev,
          name: user.user_metadata?.name || "",
        }));
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      ...form,
      last_active: new Date().toISOString(),
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Perfil guardado");
    }
    setSaving(false);
  }

  if (loading) {
    return <div className="text-center py-16 text-gray-400 text-sm">Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">Tu perfil</h1>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-8">Estos datos se usan para calcular tu compatibilidad</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Nombre</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black"
            placeholder="Tu nombre"
          />
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="city" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Ciudad</label>
          <select
            id="city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Presupuesto */}
        <div>
          <label className="block text-xs font-medium mb-3 uppercase tracking-wider text-gray-500">Presupuesto mensual</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-gray-400 uppercase">Mínimo</span>
              <input
                type="number"
                value={form.budget_min}
                onChange={(e) => setForm({ ...form, budget_min: Number(e.target.value) })}
                min={0}
                step={50}
                className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase">Máximo</span>
              <input
                type="number"
                value={form.budget_max}
                onChange={(e) => setForm({ ...form, budget_max: Number(e.target.value) })}
                min={0}
                step={50}
                className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>
          <p className="text-[10px] text-gray-300 mt-2">Rango: {form.budget_min}€ – {form.budget_max}€/mes</p>
        </div>

        {/* Lifestyle */}
        <div>
          <label className="block text-xs font-medium mb-3 uppercase tracking-wider text-gray-500">Estilo de vida</label>
          <div className="space-y-2">
            {lifestyles.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setForm({ ...form, lifestyle: l.value })}
                className={`w-full text-left px-4 py-3 border text-sm ${
                  form.lifestyle === l.value
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-600 hover:border-black"
                }`}
              >
                <span className="font-medium">{l.label}</span>
                <span className="text-xs ml-2 opacity-60">{l.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferencias */}
        <div>
          <label className="block text-xs font-medium mb-3 uppercase tracking-wider text-gray-500">Preferencias</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.smoking}
                onChange={(e) => setForm({ ...form, smoking: e.target.checked })}
                className="w-4 h-4 border-gray-300 rounded-none accent-black"
              />
              Fumador
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.pets}
                onChange={(e) => setForm({ ...form, pets: e.target.checked })}
                className="w-4 h-4 border-gray-300 rounded-none accent-black"
              />
              Mascotas
            </label>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Sobre ti</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
            placeholder="Cuéntanos un poco sobre ti, qué haces, qué buscas..."
          />
          <p className="text-[10px] text-gray-300 mt-1">{form.description.length}/300 caracteres</p>
        </div>

        {/* Message */}
        {message && (
          <p className={`text-sm ${message.includes("Error") ? "text-red-600" : "text-green-700"}`}>
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white py-3 text-xs font-medium uppercase tracking-wider hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar perfil"}
        </button>
      </form>
    </div>
  );
}
