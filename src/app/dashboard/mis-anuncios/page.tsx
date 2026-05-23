import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteListingButton from "@/components/DeleteListingButton";

export const dynamic = "force-dynamic";

export default async function MisAnunciosPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mis anuncios</h1>
        <Link
          href="/dashboard/mis-anuncios/nuevo"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          Nuevo anuncio
        </Link>
      </div>

      {!listings || listings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No tienes anuncios publicados.</p>
          <Link
            href="/dashboard/mis-anuncios/nuevo"
            className="inline-block mt-4 text-sm text-black font-medium hover:underline"
          >
            Publicar tu primer anuncio
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
                    {listing.type === "ofrezco" ? "Ofrezco" : "Busco"}
                  </span>
                  <span className="text-sm font-medium">{listing.city}</span>
                </div>
                <p className="text-lg font-bold">{listing.price}€/mes</p>
                <p className="text-sm text-gray-500 line-clamp-1">{listing.description}</p>
              </div>
              <DeleteListingButton listingId={listing.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
