"use client";

import { useState, useCallback } from "react";
import RatingStars from "./RatingStars";
import { getSessionId, formatPlayerCount } from "@/lib/utils";

interface GamePlaySectionProps {
  gameId: string;
  gameUrl: string;
  gameTitle: string;
  averageRating: number;
  totalPlayers: number;
  userRating: number | null;
}

export default function GamePlaySection({
  gameId,
  gameUrl,
  gameTitle,
  averageRating: initialRating,
  totalPlayers: initialPlayers,
  userRating: initialUserRating,
}: GamePlaySectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [totalPlayers, setTotalPlayers] = useState(initialPlayers);
  const [userRating, setUserRating] = useState(initialUserRating);
  const [hasRecordedPlay, setHasRecordedPlay] = useState(false);

  const handlePlay = useCallback(async () => {
    setIsPlaying(true);
    if (!hasRecordedPlay) {
      try {
        const res = await fetch(`/api/games/${gameId}/play`, { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setTotalPlayers((prev) => prev + 1);
          setHasRecordedPlay(true);
        }
      } catch {}
    }
  }, [gameId, hasRecordedPlay]);

  const handleRate = useCallback(
    async (score: number) => {
      const sessionId = getSessionId();
      if (!sessionId) return;
      try {
        const res = await fetch("/api/ratings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId, score, sessionId }),
        });
        if (res.ok) {
          const data = await res.json();
          setAverageRating(data.averageRating);
          setUserRating(data.userRating);
        }
      } catch {}
    },
    [gameId]
  );

  return (
    <div>
      {/* Play Button or iframe */}
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="w-full py-4 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          게임 플레이
        </button>
      ) : (
        <div className="relative">
          <div className="aspect-video bg-black rounded-lg overflow-hidden border border-steam-border">
            <iframe
              src={gameUrl}
              title={gameTitle}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className="mt-2 px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text border border-steam-border rounded transition-colors"
          >
            게임 닫기
          </button>
        </div>
      )}

      {/* Rating & Stats */}
      <div className="flex items-center justify-between mt-6 p-4 bg-steam-card rounded-lg border border-steam-border">
        <div>
          <div className="text-sm text-steam-text-muted mb-1">평점</div>
          <div className="flex items-center gap-2">
            <RatingStars
              rating={userRating ?? averageRating}
              interactive
              onRate={handleRate}
              size="lg"
            />
            <span className="text-steam-text font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>
          {userRating && (
            <div className="text-xs text-steam-blue mt-1">
              내 평점: {userRating}점
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-steam-text-muted mb-1">플레이어</div>
          <div className="text-2xl font-bold text-steam-text">
            {formatPlayerCount(totalPlayers)}
          </div>
        </div>
      </div>
    </div>
  );
}
