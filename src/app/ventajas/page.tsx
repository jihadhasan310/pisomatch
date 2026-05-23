import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Ventajas — PisoMatch",
  description: "Descubre todas las ventajas de PisoMatch para encontrar tu compañero de piso ideal en España.",
};

const ventajasFree = [
  {
    title: "Perfil completo",
    description: "Crea tu perfil con ciudad, presupuesto, estilo de vida y preferencias para que el algoritmo te encuentre matches compatibles.",
  },
  {
    title: "Publicar anuncios",
    description: "Publica anuncios de tipo 'Ofrezco habitación' o 'Busco habitación' con precio, ciudad y descripción.",
  },
  {
    title: "Matching inteligente",
    description: "Nuestro algoritmo analiza compatibilidad real: ciudad (40%), presupuesto (30%), estilo de vida (20%), y preferencias (10%).",
  },
  {
    title: "Ver matches ordenados",
    description: "Accede a un ranking personalizado de anuncios ordenados por compatibilidad contigo.",
  },
  {
    title: "5 contactos al mes",
    description: "Contacta hasta 5 personas al mes por WhatsApp, Telegram o email directamente desde la plataforma.",
  },
  {
    title: "Páginas por ciudad",
    description: "Explora anuncios en Madrid, Barcelona, Valencia y Sevilla con estadísticas de precios y disponibilidad.",
  },
];

const ventajasPremium = [
  {
    title: "Boost +25 en ranking",
    description: "Tu anuncio recibe +25 puntos extra en el score de compatibilidad, apareciendo más arriba en los resultados de otros usuarios.",
  },
  {
    title: "Prioridad en empates",
    description: "Cuando dos anuncios tienen scores similares (diferencia < 10 puntos), el tuyo aparece primero.",
  },
  {
    title: "Contactos ilimitados",
    description: "Sin límite de contactos mensuales. Habla con todas las personas que quieras.",
  },
  {
    title: "Badge Premium visible",
    description: "Tu anuncio muestra una etiqueta 'Premium' que genera más confianza y atrae más respuestas.",
  },
  {
    title: "Mayor visibilidad",
    description: "Apareces en los primeros resultados de búsqueda de otros usuarios, multiplicando tus oportunidades.",
  },
];
