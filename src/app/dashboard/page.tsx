import { createServerSupabaseClient } from "@/lib/supabase/server";
import { rankListings } from "@/lib/matching";
import { UserProfile, Listing } from "@/lib/types";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { isDemoMode, mockCurrentUser, mockListings } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let profile: UserProfile | null = null;
  let listings: (Listing & { user: UserProfile })[] = [];

  if (isDemoMode()) {
    profile = mockCurrentUser;
    listings = mockListings;
  } else {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profileData } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = profileData as UserProfile | null;

    if (profile) {
      const { data: listingsData } = await supabase
        .from("listings")
        .select("*, user:users(*)")
        .neq("user_id", user.id);

      listings = (listingsData || []) as (Listing & { user: UserProfile })[];

      await supabase
        .from("users")
        .update({ last_active: new Date().toISOString() })
        .eq("id", user.id);
    }
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Completa tu perfil</h1>
        <p className="text-gray-500 mb-6">Para ver matches necesitas completar tu perfil primero.</p>
        <Link href="/dashboard/perfil" className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
          Completar perfil
        </Link>
      </div>
    );
  }

  const rankedListings = rankListings(profile, listings);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Tus matches</h1>
          <p className="text-sm text-gray-500 mt-1">Anuncios ordenados por compatibilidad contigo</p>
        </div>
        <Link href="/dashboard/mis-anuncios/nuevo" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
          Publicar anuncio
        </Link>
      </div>

      {isDemoMode() && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">
          Modo demo — datos de ejemplo. Configura Supabase en <code className="bg-yellow-100 px-1 rounded">.env.local</code> para datos reales.
        </div>
      )}

      {rankedListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No hay anuncios disponibles todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} currentUserPremium={profile!.premium} />
          ))}
        </div>
      )}
    </div>
  );
}
