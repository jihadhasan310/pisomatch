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
  { number: "1", title: "Crea tu perfil", description: "Indica tu ciudad, presupuesto y estilo de vida." },
  { number: "2", title: "Recibe matches", description: "Nuestro algoritmo encuentra personas compatibles contigo." },
  { number: "3", title: "Contacta", description: "Habla directamente por WhatsApp, Telegram o email." },
];

const faqs = [
  { q: "¿Es gratis usar PisoMatch?", a: "Sí. Puedes crear tu perfil, publicar anuncios y ver matches de forma gratuita. El plan Premium ofrece ventajas adicionales." },
  { q: "¿Cómo funciona el matching?", a: "Nuestro algoritmo analiza ciudad, presupuesto, estilo de vida y preferencias para calcular un score de compatibilidad." },
  { q: "¿Qué incluye Premium?", a: "Boost de +25 en tu score, apareces primero en los resultados y tienes acceso ilimitado a contactos." },
  { q: "¿En qué ciudades está disponible?", a: "Actualmente en Madrid, Barcelona, Valencia y Sevilla. Pronto más ciudades." },
  { q: "¿Cómo contacto a alguien?", a: "Cada anuncio incluye botones de WhatsApp, Telegram y email para contacto directo." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Encuentra tu compañero de piso ideal
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              PisoMatch — matching inteligente para vivir en España
            </p>
            <Link
              href="/registro"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800"
            >
              Empieza gratis
            </Link>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-20 bg-gray-50 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué PisoMatch?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Matching inteligente", desc: "Algoritmo que analiza compatibilidad real" },
                { title: "Contacto directo", desc: "WhatsApp, Telegram o email sin intermediarios" },
                { title: "100% gratuito", desc: "Crea tu perfil y publica anuncios gratis" },
                { title: "Solo España", desc: "Enfocado en las principales ciudades españolas" },
              ].map((b) => (
                <div key={b.title} className="border border-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ciudades */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Ciudades disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="border border-gray-100 rounded-xl p-6 hover:border-gray-300 block"
                >
                  <h3 className="font-semibold text-lg">{city.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{city.listings} anuncios</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Precios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="border border-gray-200 rounded-xl p-8">
                <h3 className="font-bold text-xl mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">0€<span className="text-sm font-normal text-gray-500">/mes</span></p>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2"><span>✓</span> Crear perfil y anuncios</li>
                  <li className="flex items-start gap-2"><span>✓</span> Ver matches</li>
                  <li className="flex items-start gap-2"><span>✓</span> 5 contactos/mes</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300">✗</span> Sin boost de ranking</li>
                </ul>
                <Link href="/registro" className="block text-center border border-black rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
                  Empezar gratis
                </Link>
              </div>
              <div className="border-2 border-black rounded-xl p-8 relative">
                <span className="absolute -top-3 left-6 bg-black text-white text-xs px-3 py-1 rounded-full">Popular</span>
                <h3 className="font-bold text-xl mb-2">Premium</h3>
                <p className="text-3xl font-bold mb-4">9€<span className="text-sm font-normal text-gray-500">/mes</span></p>
                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                  <li className="flex items-start gap-2"><span>✓</span> Todo lo de Free</li>
                  <li className="flex items-start gap-2"><span>✓</span> Boost +25 en ranking</li>
                  <li className="flex items-start gap-2"><span>✓</span> Aparecer primero</li>
                  <li className="flex items-start gap-2"><span>✓</span> Contactos ilimitados</li>
                </ul>
                <Link href="/registro" className="block text-center bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800">
                  Empezar con Premium
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-gray-50 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-gray-100 rounded-xl p-6 bg-white">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-500">{faq.a}</p>
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
