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

  const scoreColor = listing.matchScore >= 80 ? "text-green-600" : listing.matchScore >= 50 ? "text-black" : "text-gray-400";

  return (
    <Link
      href={`/dashboard/anuncio/${listing.id}`}
      className="bg-white border border-gray-200 flex flex-col hover:border-black group cursor-pointer overflow-hidden"
    >
      {/* Cover image or placeholder */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${listing.city} - ${listing.price}€`}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🏠</span>
              <p className="text-[10px] text-gray-300 uppercase tracking-wider mt-2">Sin foto</p>
            </div>
          </div>
        )}
        {/* Score badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 border border-gray-200">
          <span className={`text-xs font-mono font-bold ${scoreColor}`}>
            {listing.matchScore}%
          </span>
        </div>
        {/* Premium badge */}
        {user?.premium && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium">
            Pro
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            {typeLabel}
          </span>
          {listing.images && listing.images.length > 1 && (
            <span className="text-[10px] text-gray-300 font-mono">{listing.images.filter(i => i).length} 📷</span>
          )}
        </div>

        <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-lg leading-tight">{listing.city}</h3>
        <p className="text-2xl font-bold mt-1">{listing.price}€<span className="text-xs font-normal text-gray-400 ml-1">/mes</span></p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{listing.description}</p>

        {user && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-500">{user.name}</span>
            <span className="text-[10px] text-gray-300 ml-auto capitalize">{user.lifestyle}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
