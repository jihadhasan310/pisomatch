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

  const scoreColor = listing.matchScore >= 80 ? "bg-green-50 text-green-700 border-green-200" : listing.matchScore >= 50 ? "bg-gray-50 text-gray-700 border-gray-200" : "bg-gray-50 text-gray-400 border-gray-100";

  return (
    <Link
      href={`/dashboard/anuncio/${listing.id}`}
      className="bg-white border border-gray-200 flex flex-col group cursor-pointer overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {/* Cover */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${listing.city} - ${listing.price}€`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <span className="text-4xl opacity-30">🏠</span>
            </div>
          </div>
        )}
        {/* Score */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 border text-[11px] font-mono font-bold ${scoreColor}`}>
          {listing.matchScore}%
        </div>
        {/* Premium */}
        {user?.premium && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium">
            Pro
          </div>
        )}
        {/* Photo count */}
        {listing.images && listing.images.filter(i => i).length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-0.5 text-[10px] font-mono">
            {listing.images.filter(i => i).length} fotos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 border border-gray-100 px-1.5 py-0.5">
            {typeLabel}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-lg leading-tight">{listing.city}</h3>
          <p className="text-lg font-bold">{listing.price}€<span className="text-[10px] font-normal text-gray-400">/mes</span></p>
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{listing.description}</p>

        {user && (
          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center gap-2 mt-3">
            <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-gray-400 capitalize">{user.lifestyle} · {user.city}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
