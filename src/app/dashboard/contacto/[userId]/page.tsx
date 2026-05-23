import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function ContactoPage({ params }: PageProps) {
  const { userId } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check if current user has profile
  const { data: currentProfile } = await supabase
    .from("users")
    .select("premium")
    .eq("id", user.id)
    .single();

  // Get target user
  const { data: targetUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!targetUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Usuario no encontrado.</p>
        <Link href="/dashboard" className="text-sm text-black font-medium hover:underline mt-4 inline-block">
          Volver a matches
        </Link>
      </div>
    );
  }

  // Log contact
  await supabase.from("contacts").insert({
    user_id: user.id,
    target_user_id: userId,
    method: "view",
  });

  const whatsappMessage = encodeURIComponent(
    `Hola ${targetUser.name}, te encontré en PisoMatch y me interesa tu anuncio.`
  );

  return (
    <div className="max-w-md mx-auto">
      <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black mb-6 inline-block">
        ← Volver a matches
      </Link>

      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-1">{targetUser.name}</h1>
        <p className="text-sm text-gray-500 mb-4">{targetUser.city} · {targetUser.lifestyle}</p>

        {targetUser.description && (
          <p className="text-sm text-gray-600 mb-6">{targetUser.description}</p>
        )}

        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-green-700"
          >
            Contactar por WhatsApp
          </a>
          <a
            href={`https://t.me/`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-500 text-white rounded-lg py-3 text-sm font-medium hover:bg-blue-600"
          >
            Contactar por Telegram
          </a>
          <a
            href={`mailto:${targetUser.email}?subject=PisoMatch - Interesado en tu anuncio&body=Hola ${targetUser.name}, te encontré en PisoMatch.`}
            className="block text-center border border-gray-200 rounded-lg py-3 text-sm font-medium hover:bg-gray-50"
          >
            Enviar email
          </a>
        </div>

        {!currentProfile?.premium && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Con Premium tienes contactos ilimitados y más visibilidad.
          </p>
        )}
      </div>
    </div>
  );
}
