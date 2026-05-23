import { ListingWithScore } from "@/lib/types";
import Link from "next/link";

interface ListingCardProps {
  listing: ListingWithScore;
  currentUserPremium: boolean;
}

export default function ListingCard({ listing, currentUserPremium }: ListingCardProps) {
  const user = listing.user;
  const typeLabel = listing.type === "ofrezco" ? "Ofrezco habitación" : "Busco habitación";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
          {typeLabel}
        </span>
        <div className="flex items-center gap-2">
          {user?.premium && (
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
              Premium
            </span>
          )}
          <span className="text-xs font-medium text-gray-500">
            {listing.matchScore}% match
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-1">{listing.city}</h3>
      <p className="text-xl font-bold mb-2">{listing.price}€/mes</p>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{listing.description}</p>

      {user && (
        <div className="text-xs text-gray-400 mb-3">
          <span>{user.name}</span>
          <span className="mx-1">·</span>
          <span>{user.lifestyle}</span>
          {user.smoking && <span className="mx-1">· Fumador</span>}
          {user.pets && <span className="mx-1">· Mascotas</span>}
        </div>
      )}

      <div className="mt-auto pt-3 border-t border-gray-50">
        {currentUserPremium || listing.matchScore >= 50 ? (
          <Link
            href={`/dashboard/contacto/${listing.user_id}`}
            className="block text-center bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800"
          >
            Contactar
          </Link>
        ) : (
          <p className="text-center text-xs text-gray-400">
            Hazte Premium para contactar
          </p>
        )}
      </div>
    </div>
  );
}
