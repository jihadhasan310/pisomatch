import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Términos de Uso — PisoMatch",
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Términos de Uso</h1>
        <div className="prose prose-sm text-gray-600 space-y-4">
          <p>Última actualización: Enero 2025</p>
          <h2 className="text-lg font-semibold text-black mt-6">1. Aceptación</h2>
          <p>Al usar PisoMatch aceptas estos términos de uso.</p>
          <h2 className="text-lg font-semibold text-black mt-6">2. Servicio</h2>
          <p>PisoMatch es una plataforma de matching para encontrar compañeros de piso. No somos intermediarios inmobiliarios.</p>
          <h2 className="text-lg font-semibold text-black mt-6">3. Responsabilidad</h2>
          <p>Los usuarios son responsables de verificar la identidad y fiabilidad de otros usuarios antes de compartir piso.</p>
          <h2 className="text-lg font-semibold text-black mt-6">4. Contenido</h2>
          <p>No se permite publicar contenido falso, ofensivo o ilegal. Nos reservamos el derecho de eliminar cuentas que incumplan estas normas.</p>
          <h2 className="text-lg font-semibold text-black mt-6">5. Premium</h2>
          <p>El plan Premium ofrece ventajas adicionales. Los pagos no son reembolsables.</p>
          <h2 className="text-lg font-semibold text-black mt-6">6. Modificaciones</h2>
          <p>Podemos modificar estos términos en cualquier momento. Te notificaremos por email de cambios significativos.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
