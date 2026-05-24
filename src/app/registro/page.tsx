"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/perfil");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <Link href="/" className="text-xs text-gray-400 uppercase tracking-wider hover:text-black">
            ← Inicio
          </Link>
        </div>
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-black">PisoMatch</Link>
          <p className="text-gray-500 text-sm mt-3 tracking-wide uppercase">Crea tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs font-medium mb-1.5 text-gray-700 uppercase tracking-wide">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-sm text-black focus:outline-none focus:border-black placeholder:text-gray-300"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium mb-1.5 text-gray-700 uppercase tracking-wide">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-sm text-black focus:outline-none focus:border-black placeholder:text-gray-300"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-1.5 text-gray-700 uppercase tracking-wide">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-sm text-black focus:outline-none focus:border-black placeholder:text-gray-300"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-none py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 disabled:opacity-50 mt-8"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-black font-medium hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
