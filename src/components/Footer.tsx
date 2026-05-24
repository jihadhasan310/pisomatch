import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo href="/" size="sm" />
            <p className="text-xs text-gray-400 mt-3">
              Encuentra tu compañero de piso ideal en España.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-black">Ciudades</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/madrid-compartir-piso" className="hover:text-black">Madrid</Link></li>
              <li><Link href="/barcelona-compartir-piso" className="hover:text-black">Barcelona</Link></li>
              <li><Link href="/valencia-compartir-piso" className="hover:text-black">Valencia</Link></li>
              <li><Link href="/sevilla-compartir-piso" className="hover:text-black">Sevilla</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-black">Producto</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/#como-funciona" className="hover:text-black">Cómo funciona</Link></li>
              <li><Link href="/#precios" className="hover:text-black">Precios</Link></li>
              <li><Link href="/#faq" className="hover:text-black">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-black">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/privacidad" className="hover:text-black">Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-black">Términos</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-100 text-center text-xs text-gray-300 uppercase tracking-wider">
          © {new Date().getFullYear()} PisoMatch
        </div>
      </div>
    </footer>
  );
}
