import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">PisoMatch</h3>
            <p className="text-sm text-gray-500">
              Encuentra tu compañero de piso ideal en España.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Ciudades</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/madrid-compartir-piso">Madrid</Link></li>
              <li><Link href="/barcelona-compartir-piso">Barcelona</Link></li>
              <li><Link href="/valencia-compartir-piso">Valencia</Link></li>
              <li><Link href="/sevilla-compartir-piso">Sevilla</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#como-funciona">Cómo funciona</Link></li>
              <li><Link href="/#precios">Precios</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacidad">Privacidad</Link></li>
              <li><Link href="/terminos">Términos</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} PisoMatch. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
