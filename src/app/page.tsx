import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cities = [
  { name: "Madrid", slug: "madrid-compartir-piso", listings: "2.400+" },
  { name: "Barcelona", slug: "barcelona-compartir-piso", listings: "1.800+" },
  { name: "Valencia", slug: "valencia-compartir-piso", listings: "950+" },
  { name: "Sevilla", slug: "sevilla-compartir-piso", listings: "620+" },
];

const steps = [
  { number: "01", title: "Crea tu perfil", description: "Indica tu ciudad, presupuesto y estilo de vida." },
  { number: "02", title: "Recibe matches", description: "Nuestro algoritmo encuentra personas compatibles." },
  { number: "03", title: "Contacta", description: "Habla por WhatsApp, Telegram o email." },
];

const faqs = [
  { q: "¿Es gratis?", a: "Sí. Perfil, anuncios y matches gratis. Premium ofrece ventajas extra." },
  { q: "¿Cómo funciona el matching?", a: "Algoritmo que analiza ciudad, presupuesto, estilo de vida y preferencias." },
  { q: "¿Qué incluye Premium?", a: "Boost +25, apareces primero y contactos ilimitados." },
  { q: "¿Qué ciudades?", a: "Madrid, Barcelona, Valencia y Sevilla. Pronto más." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-28 md:py-40 px-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-6">
              Encuentra tu<br />compañero de piso
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              Matching inteligente para vivir en España
            </p>
            <Link
              href="/registro"
              className="inline-block bg-black text-white px-8 py-3.5 text-sm uppercase tracking-wider font-medium hover:bg-gray-800"
            >
              Empieza gratis
            </Link>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16 uppercase tracking-wide">Cómo funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="text-5xl font-[family-name:var(--font-playfair)] font-bold text-gray-200 mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-medium text-sm uppercase tracking-wider mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-24 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {[
                { title: "Matching inteligente", desc: "Algoritmo de compatibilidad real" },
                { title: "Contacto directo", desc: "Sin intermediarios" },
                { title: "100% gratuito", desc: "Publica y busca gratis" },
                { title: "Solo España", desc: "Ciudades principales" },
              ].map((b) => (
                <div key={b.title} className="bg-white p-8">
                  <h3 className="font-medium text-sm uppercase tracking-wider mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ciudades */}
        <section className="py-24 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Ciudades</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="bg-white p-8 hover:bg-gray-50 block"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl">{city.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 font-mono">{city.listings}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="py-24 px-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Precios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
              <div className="bg-white p-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Free</h3>
                <p className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-6">0€</p>
                <ul className="space-y-2 text-sm text-gray-500 mb-8">
                  <li>✓ Perfil y anuncios</li>
                  <li>✓ Ver matches</li>
                  <li>✓ 5 contactos/mes</li>
                </ul>
                <Link href="/registro" className="block text-center border border-black py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-black hover:text-white">
                  Empezar
                </Link>
              </div>
              <div className="bg-white p-8 border-l-4 border-l-black">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Premium</h3>
                <p className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-6">9€<span className="text-sm font-normal text-gray-400">/mes</span></p>
                <ul className="space-y-2 text-sm text-gray-500 mb-8">
                  <li>✓ Todo lo de Free</li>
                  <li>✓ Boost +25 ranking</li>
                  <li>✓ Aparecer primero</li>
                  <li>✓ Contactos ilimitados</li>
                </ul>
                <Link href="/registro" className="block text-center bg-black text-white py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-gray-800">
                  Empezar
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-4 border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">FAQ</h2>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
