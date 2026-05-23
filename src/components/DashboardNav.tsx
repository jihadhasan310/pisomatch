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
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-xl font-bold">PisoMatch</Link>
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:block">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-black"
          >
            Salir
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-gray-50 px-4 py-2 gap-4 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm whitespace-nowrap ${
              pathname === item.href
                ? "text-black font-medium"
                : "text-gray-500"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
