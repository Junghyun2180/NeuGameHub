"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  gameId: string;
  initialFavorite: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function FavoriteButton({
  gameId,
  initialFavorite,
  size = "sm",
  className,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (loading) return;
      setLoading(true);

      try {
        const res = await fetch(`/api/games/${gameId}/favorite`, {
          method: "POST",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.isFavorite);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [gameId, loading, router]
  );

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const padding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        padding,
        "rounded-full transition-all duration-200",
        "bg-black/40 hover:bg-black/60 backdrop-blur-sm",
        "disabled:opacity-50",
        className
      )}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
    >
      <svg
        className={cn(
          iconSize,
          "transition-colors duration-200",
          isFavorite
            ? "fill-red-500 text-red-500"
            : "fill-none text-white/80 hover:text-white"
        )}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
