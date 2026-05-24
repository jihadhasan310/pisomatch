import { createServerSupabaseClient } from "@/lib/supabase/server";
import { rankListings } from "@/lib/matching";
import { UserProfile, Listing } from "@/lib/types";
import Link from "next/link";
import MatchResults from "@/components/MatchResults";
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
      <div className="text-center py-16">
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-4">Completa tu perfil</h1>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Para ver matches y publicar anuncios necesitas completar tu perfil primero.
        </p>
        <Link href="/dashboard/perfil" className="bg-black text-white px-6 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gray-800">
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
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold">Tus matches</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ordenados por compatibilidad</p>
        </div>
        <Link
          href="/dashboard/mis-anuncios/nuevo"
          className="bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-gray-800"
        >
          Publicar anuncio
        </Link>
      </div>

      {isDemoMode() && (
        <div className="mb-6 border border-gray-200 px-4 py-3 text-xs text-gray-500">
          Modo demo — datos de ejemplo.
        </div>
      )}

      <MatchResults listings={rankedListings} currentUserPremium={profile.premium} />
    </div>
  );
}
