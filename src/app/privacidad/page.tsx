import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad — PisoMatch",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose prose-sm text-gray-600 space-y-4">
          <p>Última actualización: Enero 2025</p>
          <h2 className="text-lg font-semibold text-black mt-6">1. Datos que recopilamos</h2>
          <p>Recopilamos la información que proporcionas al crear tu cuenta: nombre, email, ciudad, presupuesto y preferencias de estilo de vida.</p>
          <h2 className="text-lg font-semibold text-black mt-6">2. Uso de los datos</h2>
          <p>Utilizamos tus datos para calcular compatibilidad con otros usuarios y mostrarte matches relevantes.</p>
          <h2 className="text-lg font-semibold text-black mt-6">3. Compartición de datos</h2>
          <p>Tu perfil es visible para otros usuarios registrados. No vendemos datos a terceros.</p>
          <h2 className="text-lg font-semibold text-black mt-6">4. Seguridad</h2>
          <p>Utilizamos Supabase con cifrado en tránsito y en reposo para proteger tus datos.</p>
          <h2 className="text-lg font-semibold text-black mt-6">5. Tus derechos</h2>
          <p>Puedes eliminar tu cuenta y todos tus datos en cualquier momento desde tu perfil.</p>
          <h2 className="text-lg font-semibold text-black mt-6">6. Contacto</h2>
          <p>Para cualquier consulta sobre privacidad, contacta con nosotros en privacidad@pisomatch.es</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
