import { UserProfile, Listing, ListingWithScore } from "./types";

export function calculateMatch(user: UserProfile, target: UserProfile): number {
  let score = 0;

  // Ciudad: +30
  if (user.city.toLowerCase() === target.city.toLowerCase()) score += 30;

  // Presupuesto compatible: +20
  const budgetOk =
    target.budget_min <= user.budget_max && target.budget_max >= user.budget_min;
  if (budgetOk) score += 20;

  // Lifestyle: +15
  if (user.lifestyle === target.lifestyle) score += 15;

  // Smoking: +5
  if (user.smoking === target.smoking) score += 5;

  // Pets: +5
  if (user.pets === target.pets) score += 5;

  // Clean level: +5
  if (user.clean_level === target.clean_level) score += 5;

  // Sleep schedule: +5
  if (user.sleep_schedule === target.sleep_schedule) score += 5;

  // Work from home compatibility: +3
  if (user.work_from_home === target.work_from_home) score += 3;

  // Guests policy: +2
  if (user.guests_ok === target.guests_ok) score += 2;

  // Couples ok: +2
  if (user.couples_ok === target.couples_ok) score += 2;

  // Music ok: +2
  if (user.music_ok === target.music_ok) score += 2;

  // Shared meals: +2
  if (user.shared_meals === target.shared_meals) score += 2;

  // LGBTQ friendly: +2
  if (user.lgbtq_friendly && target.lgbtq_friendly) score += 2;

  // Vegan/vegetarian: +2
  if (user.vegan_vegetarian === target.vegan_vegetarian) score += 2;

  return score; // Max base: 102
}

export function applyPremiumBoost(isPremium: boolean, score: number): number {
  if (isPremium) {
    return score + 25;
  }
  return score;
}

function getDaysSinceActive(lastActive: string): number {
  const now = new Date();
  const active = new Date(lastActive);
  const diff = now.getTime() - active.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function rankListings(
  user: UserProfile,
  listings: Listing[]
): ListingWithScore[] {
  return listings
    .filter((listing) => listing.user_id !== user.id)
    .map((listing) => {
      const targetUser = listing.user;
      if (!targetUser) return { ...listing, matchScore: 0 };

      let score = calculateMatch(user, targetUser);
      score = applyPremiumBoost(targetUser.premium, score);

      const daysSinceActive = getDaysSinceActive(targetUser.last_active);
      if (daysSinceActive < 3) {
        score += 10;
      }

      return {
        ...listing,
        matchScore: score,
      };
    })
    .sort((a, b) => {
      if (Math.abs(a.matchScore - b.matchScore) < 10) {
        if (a.user?.premium && !b.user?.premium) return -1;
        if (!a.user?.premium && b.user?.premium) return 1;
      }
      return b.matchScore - a.matchScore;
    });
}
