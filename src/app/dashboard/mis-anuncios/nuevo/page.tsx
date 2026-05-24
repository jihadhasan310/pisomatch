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
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [form, setForm] = useState({
    type: "ofrezco" as ListingType,
    city: "Madrid",
    price: 400,
    description: "",
    preferences: "",
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const totalImages = images.length + files.length;

    if (totalImages > 5) {
      setError("Máximo 5 fotos permitidas.");
      return;
    }

    setError("");
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
  }

  async function uploadImages(userId: string): Promise<string[]> {
    const urls: string[] = [];

    for (const file of images) {
      const ext = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        continue;
      }

      const { data } = supabase.storage
        .from("listing-images")
        .getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let imageUrls: string[] = [];
    if (images.length > 0) {
      imageUrls = await uploadImages(user.id);
    }

    const { error: insertError } = await supabase.from("listings").insert({
      user_id: user.id,
      type: form.type,
      city: form.city,
      price: form.price,
      description: form.description,
      preferences: form.preferences,
      images: imageUrls,
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
      <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-6">Nuevo anuncio</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">Tipo de anuncio</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "ofrezco" })}
              className={`flex-1 px-4 py-2.5 text-xs uppercase tracking-wider border ${
                form.type === "ofrezco"
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              Ofrezco habitación
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "busco" })}
              className={`flex-1 px-4 py-2.5 text-xs uppercase tracking-wider border ${
                form.type === "busco"
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              Busco habitación
            </button>
          </div>
        </div>

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

        <div>
          <label htmlFor="price" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Precio (€/mes)</label>
          <input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            min={0}
            required
            className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Descripción</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
            placeholder="Describe la habitación, el piso, la zona..."
          />
        </div>

        <div>
          <label htmlFor="preferences" className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-gray-500">Preferencias del compañero</label>
          <textarea
            id="preferences"
            value={form.preferences}
            onChange={(e) => setForm({ ...form, preferences: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
            placeholder="¿Qué buscas en un compañero de piso?"
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-xs font-medium mb-2 uppercase tracking-wider text-gray-500">
            Fotos del piso ({images.length}/5)
          </label>

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square">
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-xs flex items-center justify-center hover:bg-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < 5 && (
            <label className="block border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer hover:border-black">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Click para subir fotos
              </span>
              <span className="block text-xs text-gray-300 mt-1">
                JPG, PNG — máx. 5 fotos
              </span>
            </label>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white py-3 text-xs font-medium uppercase tracking-wider hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Publicando..." : "Publicar anuncio"}
        </button>
      </form>
    </div>
  );
}
