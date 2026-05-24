"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

const navItems = [
  { href: "/dashboard", label: "Matches", icon: "◉" },
  { href: "/dashboard/mis-anuncios", label: "Mis anuncios", icon: "▤" },
  { href: "/dashboard/perfil", label: "Perfil", icon: "◎" },
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
          <Logo href="/dashboard" size="sm" />
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-wider px-4 py-2 flex items-center gap-1.5 ${
                  pathname === item.href
                    ? "text-black font-medium bg-gray-50 border-b-2 border-black"
                    : "text-gray-400 hover:text-black hover:bg-gray-50"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-300 hidden sm:block font-mono truncate max-w-[150px]">{userEmail}</span>
          <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-black uppercase tracking-wider border border-gray-200 px-3 py-1.5 hover:border-black">
            Salir
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-gray-100 px-2 py-1.5 gap-1 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs uppercase tracking-wider whitespace-nowrap px-3 py-2 flex items-center gap-1 ${
              pathname === item.href ? "text-black font-medium bg-gray-50" : "text-gray-400"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
