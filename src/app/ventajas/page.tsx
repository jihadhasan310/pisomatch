import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Ventajas — PisoMatch",
  description: "Descubre todas las ventajas de PisoMatch para encontrar tu compañero de piso ideal en España.",
};

const ventajasFree = [
  { title: "Perfil completo", description: "Crea tu perfil con ciudad, presupuesto, estilo de vida y preferencias." },
  { title: "Publicar anuncios", description: "Publica anuncios de 'Ofrezco habitación' o 'Busco habitación'." },
  { title: "Matching inteligente", description: "Algoritmo que analiza compatibilidad: ciudad, presupuesto, lifestyle." },
  { title: "Ver matches ordenados", description: "Ranking personalizado de anuncios por compatibilidad contigo." },
  { title: "5 contactos al mes", description: "Contacta hasta 5 personas por WhatsApp, Telegram o email." },
  { title: "Páginas por ciudad", description: "Explora anuncios en Madrid, Barcelona, Valencia y Sevilla." },
];

const ventajasPremium = [
  { title: "Boost +25 en ranking", description: "Tu anuncio recibe +25 puntos extra en el score." },
  { title: "Prioridad en empates", description: "Cuando dos anuncios tienen scores similares, el tuyo va primero." },
  { title: "Contactos ilimitados", description: "Sin límite mensual. Habla con quien quieras." },
  { title: "Badge Premium", description: "Tu anuncio muestra etiqueta 'Premium' que genera confianza." },
  { title: "Mayor visibilidad", description: "Apareces primero en búsquedas de otros usuarios." },
];

export default function VentajasPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que ofrece PisoMatch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            La plataforma más inteligente para encontrar compañeros de piso en España.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Plan Gratuito</h2>
          <p className="text-gray-500 text-sm mb-6">Todo lo que necesitas para empezar — sin coste.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ventajasFree.map((v) => (
              <div key={v.title} className="border border-gray-100 rounded-xl p-5">
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Plan Premium — 9€/mes</h2>
          <p className="text-gray-500 text-sm mb-6">Ventajas exclusivas para encontrar piso más rápido.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ventajasPremium.map((v) => (
              <div key={v.title} className="border-2 border-black rounded-xl p-5">
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Cómo funciona el matching</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Misma ciudad</span><span className="font-bold">+40 pts</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Presupuesto compatible</span><span className="font-bold">+30 pts</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Mismo estilo de vida</span><span className="font-bold">+20 pts</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Misma pref. fumar</span><span className="font-bold">+5 pts</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Misma pref. mascotas</span><span className="font-bold">+5 pts</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Premium boost</span><span className="font-bold">+25 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Actividad reciente</span><span className="font-bold">+10 pts</span>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/registro" className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800">
            Empieza gratis
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
