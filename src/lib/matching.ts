import { UserProfile, Listing, ListingWithScore } from "./types";

export function calculateMatch(user: UserProfile, target: UserProfile): number {
  let score = 0;

  if (user.city.toLowerCase() === target.city.toLowerCase()) score += 40;

  const budgetOk =
    target.budget_min <= user.budget_max && target.budget_max >= user.budget_min;
  if (budgetOk) score += 30;

  if (user.lifestyle === target.lifestyle) score += 20;
  if (user.smoking === target.smoking) score += 5;
  if (user.pets === target.pets) score += 5;

  return score;
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
