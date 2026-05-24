"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lifestyle, CleanLevel, SleepSchedule, GenderPref } from "@/lib/types";

const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla"];

const lifestyles: { value: Lifestyle; label: string; desc: string }[] = [
  { value: "quiet", label: "Tranquilo", desc: "Silencio y orden" },
  { value: "social", label: "Social", desc: "Compartir pero con respeto" },
  { value: "party", label: "Fiestero", desc: "Salir y buen ambiente" },
];

const cleanLevels: { value: CleanLevel; label: string }[] = [
  { value: "relaxed", label: "Relajado" },
  { value: "normal", label: "Normal" },
  { value: "strict", label: "Muy limpio" },
];

const sleepSchedules: { value: SleepSchedule; label: string }[] = [
  { value: "early", label: "Madrugador" },
  { value: "normal", label: "Normal" },
  { value: "late", label: "Noctámbulo" },
];

const genderPrefs: { value: GenderPref; label: string }[] = [
  { value: "any", label: "Indiferente" },
  { value: "male", label: "Hombre" },
  { value: "female", label: "Mujer" },
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
    clean_level: "normal" as CleanLevel,
    sleep_schedule: "normal" as SleepSchedule,
    work_from_home: false,
    guests_ok: true,
    couples_ok: true,
    gender_pref: "any" as GenderPref,
    age_min: 18,
    age_max: 99,
    age: 25,
    occupation: "",
    move_in_date: "",
    min_stay_months: 6,
    shared_meals: false,
    music_ok: true,
    lgbtq_friendly: true,
    vegan_vegetarian: false,
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("users").select("*").eq("id", user.id).single();

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
          clean_level: data.clean_level || "normal",
          sleep_schedule: data.sleep_schedule || "normal",
          work_from_home: data.work_from_home || false,
          guests_ok: data.guests_ok ?? true,
          couples_ok: data.couples_ok ?? true,
          gender_pref: data.gender_pref || "any",
          age_min: data.age_min || 18,
          age_max: data.age_max || 99,
          age: data.age || 25,
          occupation: data.occupation || "",
          move_in_date: data.move_in_date || "",
          min_stay_months: data.min_stay_months || 6,
          shared_meals: data.shared_meals || false,
          music_ok: data.music_ok ?? true,
          lgbtq_friendly: data.lgbtq_friendly ?? true,
          vegan_vegetarian: data.vegan_vegetarian || false,
        });
      } else {
        setForm((prev) => ({ ...prev, name: user.user_metadata?.name || "" }));
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

  if (loading) return <div className="text-center py-16 text-gray-400 text-sm">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">Tu perfil</h1>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-10">Cuantos más datos, mejor matching</p>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* === BÁSICO === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Información básica</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Nombre</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Edad</label>
                <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} min={18} max={99}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Ciudad</label>
                <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black">
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Ocupación</label>
                <input type="text" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  placeholder="Estudiante, diseñador, etc."
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
          </div>
        </section>

        {/* === PRESUPUESTO === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Presupuesto y disponibilidad</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Mín €/mes</label>
                <input type="number" value={form.budget_min} onChange={(e) => setForm({ ...form, budget_min: Number(e.target.value) })} min={0} step={50}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Máx €/mes</label>
                <input type="number" value={form.budget_max} onChange={(e) => setForm({ ...form, budget_max: Number(e.target.value) })} min={0} step={50}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Fecha de entrada</label>
                <input type="month" value={form.move_in_date} onChange={(e) => setForm({ ...form, move_in_date: e.target.value })}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Estancia mínima (meses)</label>
                <input type="number" value={form.min_stay_months} onChange={(e) => setForm({ ...form, min_stay_months: Number(e.target.value) })} min={1} max={36}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
          </div>
        </section>

        {/* === ESTILO DE VIDA === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Estilo de vida</h2>
          <div className="space-y-6">
            {/* Lifestyle */}
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">Ambiente general</label>
              <div className="grid grid-cols-3 gap-2">
                {lifestyles.map((l) => (
                  <button key={l.value} type="button" onClick={() => setForm({ ...form, lifestyle: l.value })}
                    className={`px-3 py-3 border text-xs text-center ${form.lifestyle === l.value ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"}`}>
                    <span className="block font-medium">{l.label}</span>
                    <span className="block text-[10px] opacity-60 mt-0.5">{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clean level */}
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">Nivel de limpieza</label>
              <div className="grid grid-cols-3 gap-2">
                {cleanLevels.map((c) => (
                  <button key={c.value} type="button" onClick={() => setForm({ ...form, clean_level: c.value })}
                    className={`px-3 py-2.5 border text-xs ${form.clean_level === c.value ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep schedule */}
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">Horario de sueño</label>
              <div className="grid grid-cols-3 gap-2">
                {sleepSchedules.map((s) => (
                  <button key={s.value} type="button" onClick={() => setForm({ ...form, sleep_schedule: s.value })}
                    className={`px-3 py-2.5 border text-xs ${form.sleep_schedule === s.value ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === PREFERENCIAS === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Preferencias de convivencia</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "smoking", label: "Fumador" },
              { key: "pets", label: "Mascotas" },
              { key: "work_from_home", label: "Teletrabajo" },
              { key: "guests_ok", label: "Invitados OK" },
              { key: "couples_ok", label: "Parejas OK" },
              { key: "shared_meals", label: "Comidas juntos" },
              { key: "music_ok", label: "Música en casa" },
              { key: "lgbtq_friendly", label: "LGBTQ+ friendly" },
              { key: "vegan_vegetarian", label: "Vegano/Vegetariano" },
            ].map((pref) => (
              <label key={pref.key} className="flex items-center gap-3 py-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={form[pref.key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [pref.key]: e.target.checked })}
                  className="w-4 h-4 accent-black"
                />
                {pref.label}
              </label>
            ))}
          </div>
        </section>

        {/* === COMPAÑERO IDEAL === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Compañero ideal</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">Género preferido</label>
              <div className="grid grid-cols-3 gap-2">
                {genderPrefs.map((g) => (
                  <button key={g.value} type="button" onClick={() => setForm({ ...form, gender_pref: g.value })}
                    className={`px-3 py-2.5 border text-xs ${form.gender_pref === g.value ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Edad mín</label>
                <input type="number" value={form.age_min} onChange={(e) => setForm({ ...form, age_min: Number(e.target.value) })} min={18} max={99}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Edad máx</label>
                <input type="number" value={form.age_max} onChange={(e) => setForm({ ...form, age_max: Number(e.target.value) })} min={18} max={99}
                  className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
          </div>
        </section>

        {/* === BIO === */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2 mb-6">Sobre ti</h2>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            maxLength={500}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
            placeholder="Cuéntanos quién eres, qué haces, qué buscas en un compañero de piso..."
          />
          <p className="text-[10px] text-gray-300 mt-1">{form.description.length}/500</p>
        </section>

        {/* Message */}
        {message && (
          <p className={`text-sm ${message.includes("Error") ? "text-red-600" : "text-green-700"}`}>{message}</p>
        )}

        {/* Submit */}
        <button type="submit" disabled={saving}
          className="w-full bg-black text-white py-3.5 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-800 disabled:opacity-50">
          {saving ? "Guardando..." : "Guardar perfil"}
        </button>
      </form>
    </div>
  );
}
