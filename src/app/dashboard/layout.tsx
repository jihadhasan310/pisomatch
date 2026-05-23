import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userEmail={user.email || ""} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
