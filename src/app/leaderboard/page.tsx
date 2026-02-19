"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn, formatPlayerCount } from "@/lib/utils";
import RatingStars from "@/components/game/RatingStars";

interface LeaderboardEntry {
  rank: number;
  game: {
    id: string;
    title: string;
    thumbnail: string | null;
    averageRating: number;
    genre: { name: string };
    aiTool: { name: string };
  };
  playerCount: number;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"daily" | "weekly">("daily");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.leaderboard || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [period]);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-steam-text">리더보드</h1>
        <div className="flex bg-steam-card rounded-lg border border-steam-border overflow-hidden">
          <button
            onClick={() => setPeriod("daily")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              period === "daily"
                ? "bg-steam-blue text-steam-dark"
                : "text-steam-text-muted hover:text-steam-text"
            )}
          >
            일간
          </button>
          <button
            onClick={() => setPeriod("weekly")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              period === "weekly"
                ? "bg-steam-blue text-steam-dark"
                : "text-steam-text-muted hover:text-steam-text"
            )}
          >
            주간
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-steam-text-muted">
          로딩 중...
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 text-steam-text-muted">
          아직 데이터가 없습니다
        </div>
      ) : (
        <div className="bg-steam-card rounded-lg border border-steam-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[60px_1fr_120px_100px_80px] gap-2 px-4 py-3 text-xs text-steam-text-muted uppercase tracking-wider border-b border-steam-border font-semibold">
            <div>순위</div>
            <div>게임</div>
            <div className="text-right">플레이어</div>
            <div className="text-right">평점</div>
            <div className="text-right">AI</div>
          </div>

          {/* Table Body */}
          {entries.map((entry) => (
            <Link
              key={entry.game.id}
              href={`/games/${entry.game.id}`}
              className="grid grid-cols-[60px_1fr_120px_100px_80px] gap-2 px-4 py-3 items-center hover:bg-steam-card-hover transition-colors border-b border-steam-border/50 last:border-b-0"
            >
              <div
                className={cn(
                  "text-lg font-bold",
                  entry.rank <= 3
                    ? "text-steam-blue"
                    : "text-steam-text-muted"
                )}
              >
                #{entry.rank}
              </div>
              <div>
                <div className="text-sm font-semibold text-steam-text truncate">
                  {entry.game.title}
                </div>
                <div className="text-xs text-steam-text-muted">
                  {entry.game.genre.name}
                </div>
              </div>
              <div className="text-right text-sm font-semibold text-steam-text">
                {formatPlayerCount(entry.playerCount)}
              </div>
              <div className="flex justify-end">
                <RatingStars rating={entry.game.averageRating} size="sm" />
              </div>
              <div className="text-right text-xs text-steam-blue">
                {entry.game.aiTool.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
