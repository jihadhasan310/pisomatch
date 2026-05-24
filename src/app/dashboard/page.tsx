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
      <div className="text-center py-20">
        <span className="text-5xl mb-6 block">👋</span>
        <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-3">Bienvenido a PisoMatch</h1>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Completa tu perfil para que podamos encontrar compañeros de piso compatibles contigo.
        </p>
        <Link href="/dashboard/perfil" className="bg-black text-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-800 inline-block">
          Completar perfil
        </Link>
      </div>
    );
  }

  const rankedListings = rankListings(profile, listings);

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-100">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Dashboard</p>
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold">Tus matches</h1>
        </div>
        <Link
          href="/dashboard/mis-anuncios/nuevo"
          className="bg-black text-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gray-800 flex items-center gap-2"
        >
          <span className="text-sm">+</span> Publicar
        </Link>
      </div>

      {isDemoMode() && (
        <div className="mb-6 border border-dashed border-gray-300 px-4 py-3 text-xs text-gray-400 text-center">
          Modo demo — datos de ejemplo
        </div>
      )}

      <MatchResults listings={rankedListings} currentUserPremium={profile.premium} />
    </div>
  );
}
