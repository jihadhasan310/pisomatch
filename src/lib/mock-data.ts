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
  clean_level: "normal",
  sleep_schedule: "normal",
  work_from_home: true,
  guests_ok: true,
  couples_ok: true,
  gender_pref: "any",
  age_min: 22,
  age_max: 35,
  age: 28,
  occupation: "Diseñador",
  move_in_date: "2025-02",
  min_stay_months: 6,
  shared_meals: true,
  music_ok: true,
  lgbtq_friendly: true,
  vegan_vegetarian: false,
};

const defaultPrefs = {
  clean_level: "normal" as const,
  sleep_schedule: "normal" as const,
  work_from_home: false,
  guests_ok: true,
  couples_ok: true,
  gender_pref: "any" as const,
  age_min: 18,
  age_max: 99,
  age: 27,
  occupation: "",
  move_in_date: "",
  min_stay_months: 6,
  shared_meals: false,
  music_ok: true,
  lgbtq_friendly: true,
  vegan_vegetarian: false,
};

export const mockUsers: UserProfile[] = [
  {
    id: "user-2", email: "laura@test.com", name: "Laura García",
    city: "Madrid", budget_min: 400, budget_max: 550, lifestyle: "social",
    smoking: false, pets: false, premium: true,
    description: "Diseñadora gráfica, 26 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: "2024-02-01T10:00:00Z", ...defaultPrefs, age: 26, occupation: "Diseñadora", clean_level: "strict",
  },
  {
    id: "user-3", email: "carlos@test.com", name: "Carlos Ruiz",
    city: "Madrid", budget_min: 300, budget_max: 500, lifestyle: "quiet",
    smoking: false, pets: true, premium: false,
    description: "Ingeniero de software, trabajo remoto. Tengo un gato.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: "2024-01-20T10:00:00Z", ...defaultPrefs, age: 30, occupation: "Ingeniero", work_from_home: true, sleep_schedule: "late",
  },
  {
    id: "user-4", email: "marta@test.com", name: "Marta López",
    city: "Madrid", budget_min: 450, budget_max: 650, lifestyle: "social",
    smoking: false, pets: false, premium: true,
    description: "Profesora de yoga, 30 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    created_at: "2024-03-01T10:00:00Z", ...defaultPrefs, age: 30, occupation: "Profesora", vegan_vegetarian: true, shared_meals: true,
  },
  {
    id: "user-5", email: "pablo@test.com", name: "Pablo Fernández",
    city: "Barcelona", budget_min: 500, budget_max: 800, lifestyle: "party",
    smoking: true, pets: false, premium: false,
    description: "DJ y productor musical.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    created_at: "2024-02-15T10:00:00Z", ...defaultPrefs, age: 25, occupation: "DJ", sleep_schedule: "late", music_ok: true, clean_level: "relaxed",
  },
  {
    id: "user-6", email: "ana@test.com", name: "Ana Martín",
    city: "Valencia", budget_min: 250, budget_max: 400, lifestyle: "quiet",
    smoking: false, pets: false, premium: false,
    description: "Estudiante de medicina, 23 años.",
    last_active: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    created_at: "2024-03-10T10:00:00Z", ...defaultPrefs, age: 23, occupation: "Estudiante", sleep_schedule: "early", clean_level: "strict",
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
