import { UserProfile, Listing } from "./types";

export function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url === "your_supabase_url_here" || url === "";
}

export const mockCurrentUser: UserProfile = {
  id: "demo-user-1",
  email: "demo@pisomatch.es",
  name: "Usuario Demo",
  city: "Madrid",
  budget_min: 350,
  budget_max: 600,
  lifestyle: "social",
  smoking: false,
  pets: false,
  description: "Profesional de 28 años buscando piso en Madrid.",
  premium: false,
  last_active: new Date().toISOString(),
  created_at: "2024-01-15T10:00:00Z",
};

export const mockUsers: UserProfile[] = [
  {
    id: "user-2", email: "laura@test.com", name: "Laura García",
    city: "Madrid", budget_min: 400, budget_max: 550, lifestyle: "social",
    smoking: false, pets: false, premium: true,
    description: "Diseñadora gráfica, 26 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "user-3", email: "carlos@test.com", name: "Carlos Ruiz",
    city: "Madrid", budget_min: 300, budget_max: 500, lifestyle: "quiet",
    smoking: false, pets: true, premium: false,
    description: "Ingeniero de software, trabajo remoto. Tengo un gato.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "user-4", email: "marta@test.com", name: "Marta López",
    city: "Madrid", budget_min: 450, budget_max: 650, lifestyle: "social",
    smoking: false, pets: false, premium: true,
    description: "Profesora de yoga, 30 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    created_at: "2024-03-01T10:00:00Z",
  },
  {
    id: "user-5", email: "pablo@test.com", name: "Pablo Fernández",
    city: "Barcelona", budget_min: 500, budget_max: 800, lifestyle: "party",
    smoking: true, pets: false, premium: false,
    description: "DJ y productor musical.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    created_at: "2024-02-15T10:00:00Z",
  },
  {
    id: "user-6", email: "ana@test.com", name: "Ana Martín",
    city: "Valencia", budget_min: 250, budget_max: 400, lifestyle: "quiet",
    smoking: false, pets: false, premium: false,
    description: "Estudiante de medicina, 23 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    created_at: "2024-03-10T10:00:00Z",
  },
];

export const mockListings: (Listing & { user: UserProfile })[] = [
  {
    id: "listing-1", user_id: "user-2", type: "ofrezco", city: "Madrid",
    price: 480, images: [], preferences: "Alguien limpio y responsable.",
    description: "Habitación luminosa de 14m² en Malasaña. Piso reformado, terraza comunitaria.",
    created_at: "2024-03-15T10:00:00Z", user: mockUsers[0],
  },
  {
    id: "listing-2", user_id: "user-3", type: "ofrezco", city: "Madrid",
    price: 420, images: [], preferences: "Persona tranquila.",
    description: "Habitación exterior en Lavapiés, wifi incluido. Zona bien comunicada.",
    created_at: "2024-03-12T10:00:00Z", user: mockUsers[1],
  },
  {
    id: "listing-3", user_id: "user-4", type: "ofrezco", city: "Madrid",
    price: 550, images: [], preferences: "No fumador/a.",
    description: "Habitación con baño privado en Chamberí. Gastos incluidos.",
    created_at: "2024-03-18T10:00:00Z", user: mockUsers[2],
  },
  {
    id: "listing-4", user_id: "user-5", type: "busco", city: "Barcelona",
    price: 600, images: [], preferences: "Gente sociable.",
    description: "Busco habitación en Gràcia o Eixample. Presupuesto hasta 600€.",
    created_at: "2024-03-10T10:00:00Z", user: mockUsers[3],
  },
  {
    id: "listing-5", user_id: "user-6", type: "busco", city: "Valencia",
    price: 350, images: [], preferences: "Piso tranquilo.",
    description: "Busco habitación en Ruzafa o Benimaclet. Soy estudiante.",
    created_at: "2024-03-08T10:00:00Z", user: mockUsers[4],
  },
];

export const mockMyListings: Listing[] = [
  {
    id: "my-listing-1", user_id: "demo-user-1", type: "busco", city: "Madrid",
    price: 500, images: [], preferences: "Buen ambiente.",
    description: "Busco habitación en Madrid centro, hasta 500€/mes.",
    created_at: "2024-03-14T10:00:00Z",
  },
];
