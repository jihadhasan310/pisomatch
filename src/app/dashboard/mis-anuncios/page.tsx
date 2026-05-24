import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteListingButton from "@/components/DeleteListingButton";
import { isDemoMode, mockMyListings } from "@/lib/mock-data";
import { Listing } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MisAnunciosPage() {
  let listings: Listing[] = [];
  let hasProfile = true;

  if (isDemoMode()) {
    listings = mockMyListings;
  } else {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Check if profile exists
    const { data: profile } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      hasProfile = false;
    } else {
      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      listings = (data || []) as Listing[];
    }
  }

  if (!hasProfile) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-4">Primero completa tu perfil</h1>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Necesitas un perfil para publicar anuncios. Así otros usuarios podrán ver tu compatibilidad.
        </p>
        <Link href="/dashboard/perfil" className="bg-black text-white px-6 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gray-800">
          Crear perfil
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold">Mis anuncios</h1>
        <Link
          href="/dashboard/mis-anuncios/nuevo"
          className="bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-gray-800"
        >
          Nuevo anuncio
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 border border-gray-200">
          <p className="text-gray-400 text-sm">No tienes anuncios publicados.</p>
          <Link
            href="/dashboard/mis-anuncios/nuevo"
            className="inline-block mt-4 text-xs text-black font-medium uppercase tracking-wider hover:underline"
          >
            Publicar tu primer anuncio
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white border border-gray-200 p-5 flex items-center justify-between hover:border-black"
            >
              <div className="flex items-center gap-4">
                {listing.images && listing.images.length > 0 && (
                  <img
                    src={listing.images[0]}
                    alt=""
                    className="w-16 h-16 object-cover border border-gray-100"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {listing.type === "ofrezco" ? "Ofrezco" : "Busco"}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-sm font-medium">{listing.city}</span>
                  </div>
                  <p className="text-lg font-bold">{listing.price}€/mes</p>
                  <p className="text-sm text-gray-400 line-clamp-1">{listing.description}</p>
                </div>
              </div>
              {!isDemoMode() && <DeleteListingButton listingId={listing.id} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
