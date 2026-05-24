"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Matches" },
  { href: "/dashboard/mis-anuncios", label: "Mis anuncios" },
  { href: "/dashboard/perfil", label: "Perfil" },
];

export default function DashboardNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-lg font-[family-name:var(--font-playfair)] font-bold">PisoMatch</Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-wider px-3 py-1.5 ${
                  pathname === item.href
                    ? "text-black font-medium border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:block font-mono">{userEmail}</span>
          <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-black uppercase tracking-wider">
            Salir
          </button>
        </div>
      </div>
      <div className="md:hidden flex border-t border-gray-100 px-4 py-2 gap-4 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs uppercase tracking-wider whitespace-nowrap ${
              pathname === item.href ? "text-black font-medium" : "text-gray-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
