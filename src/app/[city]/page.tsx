import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const cityData: Record<string, { name: string; description: string }> = {
  "madrid-compartir-piso": {
    name: "Madrid",
    description:
      "Encuentra compañeros de piso en Madrid. Pisos compartidos en Malasaña, Lavapiés, Chamberí, Salamanca y más barrios.",
  },
  "barcelona-compartir-piso": {
    name: "Barcelona",
    description:
      "Encuentra compañeros de piso en Barcelona. Pisos compartidos en Gràcia, Eixample, Born, Raval y más barrios.",
  },
  "valencia-compartir-piso": {
    name: "Valencia",
    description:
      "Encuentra compañeros de piso en Valencia. Pisos compartidos en Ruzafa, El Carmen, Benimaclet y más barrios.",
  },
  "sevilla-compartir-piso": {
    name: "Sevilla",
    description:
      "Encuentra compañeros de piso en Sevilla. Pisos compartidos en Triana, Alameda, Nervión y más barrios.",
  },
};

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = cityData[city];
  if (!data) return {};

  return {
    title: `Compartir piso en ${data.name} — PisoMatch`,
    description: data.description,
    openGraph: {
      title: `Compartir piso en ${data.name} — PisoMatch`,
      description: data.description,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const data = cityData[city];

  if (!data) notFound();

  let listings: { id: string; type: string; price: number; description: string }[] = [];
  let count = 0;

  try {
    const supabase = await createServerSupabaseClient();
    const result = await supabase
      .from("listings")
      .select("*", { count: "exact" })
      .ilike("city", data.name)
      .limit(6);

    listings = result.data || [];
    count = result.count || 0;
  } catch {
    // Supabase not configured yet
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Compartir piso en {data.name}
        </h1>
        <p className="text-gray-500 mb-8 max-w-2xl">{data.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-100 rounded-xl p-5">
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-sm text-gray-500">Anuncios activos</p>
          </div>
          <div className="border border-gray-100 rounded-xl p-5">
            <p className="text-2xl font-bold">
              {listings.length > 0
                ? Math.round(listings.reduce((acc, l) => acc + l.price, 0) / listings.length)
                : "—"}
              €
            </p>
            <p className="text-sm text-gray-500">Precio medio</p>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Últimos anuncios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <div key={listing.id} className="border border-gray-100 rounded-xl p-5 bg-white">
                  <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
                    {listing.type === "ofrezco" ? "Ofrezco" : "Busco"}
                  </span>
                  <p className="text-lg font-bold mt-2">{listing.price}€/mes</p>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{listing.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            ¿Buscas piso en {data.name}?
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Crea tu perfil gratis y encuentra compañeros compatibles.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Empieza gratis
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
