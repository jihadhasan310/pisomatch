"use client";

import { ListingWithScore } from "@/lib/types";
import ListingCard from "./ListingCard";
import MatchFilters from "./MatchFilters";

interface MatchResultsProps {
  listings: ListingWithScore[];
  currentUserPremium: boolean;
}

export default function MatchResults({ listings, currentUserPremium }: MatchResultsProps) {
  return (
    <MatchFilters listings={listings}>
      {(filtered) =>
        filtered.length === 0 ? (
          <div className="text-center py-16 border border-gray-200">
            <p className="text-gray-400 text-sm">No hay resultados con estos filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                currentUserPremium={currentUserPremium}
              />
            ))}
          </div>
        )
      }
    </MatchFilters>
  );
}
