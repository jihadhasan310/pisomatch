"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lifestyle } from "@/lib/types";

const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla"];
const lifestyles: { value: Lifestyle; label: string }[] = [
  { value: "quiet", label: "Tranquilo" },
  { value: "social", label: "Social" },
  { value: "party", label: "Fiestero" },
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
        // Pre-fill name from auth metadata
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
      setMessage("Error al guardar: " + error.message);
    } else {
      setMessage("Perfil guardado correctamente");
    }
    setSaving(false);
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tu perfil</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget_min" className="block text-sm font-medium mb-1">Presupuesto mín (€)</label>
            <input
              id="budget_min"
              type="number"
              value={form.budget_min}
              onChange={(e) => setForm({ ...form, budget_min: Number(e.target.value) })}
              min={0}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="budget_max" className="block text-sm font-medium mb-1">Presupuesto máx (€)</label>
            <input
              id="budget_max"
              type="number"
              value={form.budget_max}
              onChange={(e) => setForm({ ...form, budget_max: Number(e.target.value) })}
              min={0}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estilo de vida</label>
          <div className="flex gap-3">
            {lifestyles.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setForm({ ...form, lifestyle: l.value })}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  form.lifestyle === l.value
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.smoking}
              onChange={(e) => setForm({ ...form, smoking: e.target.checked })}
              className="rounded border-gray-300"
            />
            Fumador
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.pets}
              onChange={(e) => setForm({ ...form, pets: e.target.checked })}
              className="rounded border-gray-300"
            />
            Mascotas
          </label>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Sobre ti</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Cuéntanos un poco sobre ti..."
          />
        </div>

        {message && (
          <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar perfil"}
        </button>
      </form>
    </div>
  );
}
