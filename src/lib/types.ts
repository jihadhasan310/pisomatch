export type Lifestyle = "quiet" | "social" | "party";
export type CleanLevel = "relaxed" | "normal" | "strict";
export type SleepSchedule = "early" | "normal" | "late";
export type GenderPref = "any" | "male" | "female";

export type ListingType = "ofrezco" | "busco";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  city: string;
  budget_min: number;
  budget_max: number;
  lifestyle: Lifestyle;
  smoking: boolean;
  pets: boolean;
  description: string;
  premium: boolean;
  last_active: string;
  created_at: string;
  // Extended preferences
  clean_level: CleanLevel;
  sleep_schedule: SleepSchedule;
  work_from_home: boolean;
  guests_ok: boolean;
  couples_ok: boolean;
  gender_pref: GenderPref;
  age_min: number;
  age_max: number;
  age: number;
  occupation: string;
  move_in_date: string;
  min_stay_months: number;
  shared_meals: boolean;
  music_ok: boolean;
  lgbtq_friendly: boolean;
  vegan_vegetarian: boolean;
}

export interface Listing {
  id: string;
  user_id: string;
  type: ListingType;
  city: string;
  price: number;
  description: string;
  images: string[];
  preferences: string;
  created_at: string;
  user?: UserProfile;
}

export interface Match {
  id: string;
  user_id: string;
  target_user_id: string;
  score: number;
  created_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  target_user_id: string;
  method: "whatsapp" | "telegram" | "email";
  created_at: string;
}

export interface ListingWithScore extends Listing {
  matchScore: number;
}
