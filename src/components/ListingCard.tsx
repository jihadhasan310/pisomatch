import { ListingWithScore } from "@/lib/types";
import Link from "next/link";

interface ListingCardProps {
  listing: ListingWithScore;
  currentUserPremium: boolean;
}

export default function ListingCard({ listing, currentUserPremium }: ListingCardProps) {
  const user = listing.user;
  const typeLabel = listing.type === "ofrezco" ? "Ofrezco" : "Busco";
  const coverImage = listing.images && listing.images.length > 0 && listing.images[0] !== "" ? listing.images[0] : null;

  return (
    <div className="bg-white border border-gray-200 flex flex-col hover:border-black overflow-hidden">
      {/* Cover image - only show if exists */}
      {coverImage && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={coverImage}
            alt={`${listing.city} - ${listing.price}€`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {typeLabel}
          </span>
          <div className="flex items-center gap-2">
            {user?.premium && (
              <span className="text-xs bg-black text-white px-2 py-0.5 uppercase tracking-wider">
                Pro
              </span>
            )}
            <span className="text-xs font-mono text-black">
              {listing.matchScore}%
            </span>
          </div>
        </div>

        <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-lg mb-1">{listing.city}</h3>
        <p className="text-2xl font-bold mb-2">{listing.price}€<span className="text-xs font-normal text-gray-400 ml-1">/mes</span></p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{listing.description}</p>

        {user && (
          <div className="text-xs text-gray-400 mb-3 font-mono">
            {user.name} · {user.lifestyle}
            {user.smoking && " · fumador"}
            {user.pets && " · mascotas"}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100">
          {currentUserPremium || listing.matchScore >= 50 ? (
            <Link
              href={`/dashboard/anuncio/${listing.id}`}
              className="block text-center bg-black text-white py-2 text-xs font-medium uppercase tracking-wider hover:bg-gray-800"
            >
              Ver detalle
            </Link>
          ) : (
            <p className="text-center text-xs text-gray-400 italic">
              Premium para contactar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
