"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteListingButton({ listingId }: { listingId: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    await supabase.from("listings").delete().eq("id", listingId);
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Confirmar
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs border border-gray-200 px-3 py-1 rounded hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-red-500 hover:text-red-700"
    >
      Eliminar
    </button>
  );
}
