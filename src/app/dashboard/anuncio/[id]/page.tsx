import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isDemoMode, mockListings, mockUsers } from "@/lib/mock-data";
import { Listing, UserProfile } from "@/lib/types";
import ImageGallery from "@/components/ImageGallery";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnuncioDetallePage({ params }: PageProps) {
  const { id } = await params;
  let listing: (Listing & { user?: UserProfile }) | null = null;
  let currentUserPremium = false;

  if (isDemoMode()) {
    listing = mockListings.find((l) => l.id === id) || mockListings[0];
  } else {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("users")
      .select("premium")
      .eq("id", user.id)
      .single();

    currentUserPremium = profile?.premium || false;

    const { data } = await supabase
      .from("listings")
      .select("*, user:users(*)")
      .eq("id", id)
      .single();

    listing = data as (Listing & { user: UserProfile }) | null;
  }

  if (!listing) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Anuncio no encontrado.</p>
        <Link href="/dashboard" className="text-xs text-black uppercase tracking-wider hover:underline mt-4 inline-block">
          ← Volver
        </Link>
      </div>
    );
  }

  const user = listing.user;
  const hasImages = listing.images && listing.images.length > 0 && listing.images[0] !== "";

  const whatsappMessage = user
    ? encodeURIComponent(`Hola ${user.name}, vi tu anuncio en PisoMatch (${listing.city}, ${listing.price}€/mes) y me interesa.`)
    : "";

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/dashboard" className="text-xs text-gray-400 uppercase tracking-wider hover:text-black mb-6 inline-block">
        ← Volver a matches
      </Link>

      {/* Image gallery */}
      {hasImages && <ImageGallery images={listing.images} city={listing.city} />}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {/* Main info */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-1">
              {listing.type === "ofrezco" ? "Ofrezco habitación" : "Busco habitación"}
            </span>
            {user?.premium && (
              <span className="text-xs bg-black text-white px-2 py-1 uppercase tracking-wider">Premium</span>
            )}
          </div>

          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">
            {listing.city}
          </h1>
          <p className="text-3xl font-bold mb-6">
            {listing.price}€<span className="text-sm font-normal text-gray-400 ml-1">/mes</span>
          </p>

          {/* Description */}
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Descripción</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
          </div>

          {/* Preferences */}
          {listing.preferences && (
            <div className="border-t border-gray-100 pt-6 mb-6">
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Busco en un compañero</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{listing.preferences}</p>
            </div>
          )}

          {/* User details */}
          {user && (
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Sobre el anunciante</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Nombre</span>
                  <p className="font-medium mt-0.5">{user.name}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Estilo de vida</span>
                  <p className="font-medium mt-0.5 capitalize">{user.lifestyle}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Fumador</span>
                  <p className="font-medium mt-0.5">{user.smoking ? "Sí" : "No"}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Mascotas</span>
                  <p className="font-medium mt-0.5">{user.pets ? "Sí" : "No"}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Presupuesto</span>
                  <p className="font-medium mt-0.5">{user.budget_min}€ – {user.budget_max}€</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Ciudad</span>
                  <p className="font-medium mt-0.5">{user.city}</p>
                </div>
              </div>
              {user.description && (
                <p className="text-sm text-gray-500 mt-4 italic">&ldquo;{user.description}&rdquo;</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Contact */}
        <div className="md:col-span-1">
          <div className="border border-gray-200 p-6 sticky top-20">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Contactar</h3>

            {user && (
              <p className="text-sm font-medium mb-6">{user.name}</p>
            )}

            <div className="space-y-3">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#1da851]"
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#0088cc] text-white py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#006699]"
              >
                Telegram
              </a>
              {user && (
                <a
                  href={`mailto:${user.email}?subject=PisoMatch - ${listing.city} ${listing.price}€&body=Hola ${user.name}, vi tu anuncio en PisoMatch y me interesa.`}
                  className="block text-center border border-gray-200 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gray-50"
                >
                  Email
                </a>
              )}
            </div>

            {!currentUserPremium && (
              <p className="text-[10px] text-gray-300 text-center mt-4 uppercase tracking-wider">
                Premium = contactos ilimitados
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
