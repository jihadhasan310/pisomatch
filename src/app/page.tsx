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
  { number: "01", title: "Crea tu perfil", description: "Indica tu ciudad, presupuesto y estilo de vida en menos de 2 minutos." },
  { number: "02", title: "Recibe matches", description: "Nuestro algoritmo calcula compatibilidad real con otros usuarios." },
  { number: "03", title: "Contacta directo", description: "WhatsApp, Telegram o email. Sin intermediarios ni chat interno." },
];

const testimonials = [
  { name: "Laura G.", city: "Madrid", text: "Encontré compañera en 3 días. El matching funciona de verdad." },
  { name: "Carlos R.", city: "Barcelona", text: "Mucho mejor que los grupos de Facebook. Aquí la gente es compatible contigo." },
  { name: "Ana M.", city: "Valencia", text: "Me encanta que puedas filtrar por estilo de vida. Encontré piso perfecto." },
];

const faqs = [
  { q: "¿Es gratis?", a: "Sí. Perfil, anuncios y matches gratis. Premium ofrece ventajas extra." },
  { q: "¿Cómo funciona el matching?", a: "Algoritmo que analiza ciudad, presupuesto, estilo de vida y preferencias." },
  { q: "¿Qué incluye Premium?", a: "Boost +25, apareces primero y contactos ilimitados." },
  { q: "¿Qué ciudades?", a: "Madrid, Barcelona, Valencia y Sevilla. Pronto más." },
  { q: "¿Es seguro?", a: "Sí. Verificamos emails y usamos Row Level Security en toda la base de datos." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-28 md:py-44 px-4 border-b border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
          <div className="max-w-4xl mx-auto text-center relative">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Matching inteligente para vivir en España</p>
            <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-8 leading-[0.9]">
              Encuentra tu<br />compañero<br />de piso
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
              Conectamos personas según compatibilidad real. Ciudad, presupuesto, estilo de vida — todo cuenta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/registro"
                className="inline-block bg-black text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-gray-800"
              >
                Empieza gratis
              </Link>
              <Link
                href="/#como-funciona"
                className="inline-block border border-gray-300 text-black px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:border-black"
              >
                Cómo funciona
              </Link>
            </div>
            <p className="text-[10px] text-gray-300 mt-6 uppercase tracking-wider">Sin tarjeta de crédito · Gratis para siempre</p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-gray-100 py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">5.770+</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Anuncios activos</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">4</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Ciudades</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">92%</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Match rate</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold">&lt;3 días</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Tiempo medio</p>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-28 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Proceso</p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-center mb-20">Tres pasos. Sin complicaciones.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="text-6xl font-[family-name:var(--font-playfair)] font-bold text-gray-100 mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-medium text-sm uppercase tracking-wider mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Matching visual */}
        <section className="py-28 px-4 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Algoritmo</p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Matching basado en datos reales</h2>
            <div className="max-w-md mx-auto space-y-4">
              {[
                { label: "Misma ciudad", points: 40, width: "100%" },
                { label: "Presupuesto compatible", points: 30, width: "75%" },
                { label: "Estilo de vida", points: 20, width: "50%" },
                { label: "Preferencias", points: 10, width: "25%" },
                { label: "Premium boost", points: 25, width: "62%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-mono font-medium">+{item.points}</span>
                  </div>
                  <div className="h-2 bg-gray-200 w-full">
                    <div className="h-2 bg-black" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-28 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {[
                { title: "Matching inteligente", desc: "No es aleatorio. Analizamos compatibilidad real entre personas." },
                { title: "Contacto directo", desc: "WhatsApp, Telegram o email. Sin chat interno ni intermediarios." },
                { title: "100% gratuito", desc: "Publica anuncios y busca piso sin pagar nada. Siempre." },
                { title: "Solo España", desc: "Madrid, Barcelona, Valencia y Sevilla. Enfocados y especializados." },
              ].map((b) => (
                <div key={b.title} className="bg-white p-8">
                  <h3 className="font-medium text-sm uppercase tracking-wider mb-3">{b.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-28 px-4 border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Testimonios</p>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Lo que dicen nuestros usuarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white border border-gray-200 p-6">
                  <p className="text-sm text-gray-600 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="text-xs">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-gray-400 ml-2">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ciudades */}
        <section className="py-28 px-4 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Disponible en</p>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Ciudades</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="bg-white p-8 hover:bg-gray-50 block group"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-2xl group-hover:underline">{city.name}</h3>
                  <p className="text-xs text-gray-400 mt-2 font-mono">{city.listings} anuncios</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="py-28 px-4 border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Planes</p>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Simple y transparente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Free</h3>
                <p className="text-5xl font-[family-name:var(--font-playfair)] font-bold mb-1">0€</p>
                <p className="text-xs text-gray-400 mb-6">Para siempre</p>
                <ul className="space-y-2 text-sm text-gray-500 mb-8">
                  <li>✓ Perfil y anuncios ilimitados</li>
                  <li>✓ Ver todos los matches</li>
                  <li>✓ 5 contactos/mes</li>
                  <li>✓ Subir hasta 5 fotos</li>
                </ul>
                <Link href="/registro" className="block text-center border border-black py-3 text-xs uppercase tracking-wider font-medium hover:bg-black hover:text-white">
                  Crear cuenta gratis
                </Link>
              </div>
              <div className="bg-white border-2 border-black p-8 relative">
                <span className="absolute -top-3 left-6 bg-black text-white text-[10px] px-3 py-1 uppercase tracking-wider">Recomendado</span>
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Premium</h3>
                <p className="text-5xl font-[family-name:var(--font-playfair)] font-bold mb-1">9€</p>
                <p className="text-xs text-gray-400 mb-6">al mes</p>
                <ul className="space-y-2 text-sm text-gray-500 mb-8">
                  <li>✓ Todo lo de Free</li>
                  <li>✓ Boost +25 en ranking</li>
                  <li>✓ Prioridad en empates</li>
                  <li>✓ Contactos ilimitados</li>
                  <li>✓ Badge Premium visible</li>
                </ul>
                <Link href="/registro" className="block text-center bg-black text-white py-3 text-xs uppercase tracking-wider font-medium hover:bg-gray-800">
                  Empezar con Premium
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-28 px-4 border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 text-center mb-4">Soporte</p>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-center mb-16">Preguntas frecuentes</h2>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-28 px-4 border-t border-gray-100 bg-black text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6">
              ¿Listo para encontrar<br />tu piso ideal?
            </h2>
            <p className="text-sm text-gray-400 mb-10 max-w-md mx-auto">
              Únete a miles de personas que ya encontraron su compañero de piso perfecto.
            </p>
            <Link
              href="/registro"
              className="inline-block bg-white text-black px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-gray-100"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
