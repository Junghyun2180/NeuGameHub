"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn, formatPlayerCount } from "@/lib/utils";
import RatingStars from "./RatingStars";

interface TodayGame {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  averageRating: number;
  totalPlayers: number;
  genre: { name: string; slug: string };
  aiTool: { name: string; slug: string };
}

interface TodaysBannerProps {
  games: TodayGame[];
}

const PLACEHOLDER_COLORS = [
  "from-blue-900 to-purple-900",
  "from-green-900 to-teal-900",
  "from-red-900 to-orange-900",
  "from-indigo-900 to-blue-900",
  "from-pink-900 to-red-900",
  "from-teal-900 to-cyan-900",
  "from-yellow-900 to-amber-900",
  "from-violet-900 to-purple-900",
  "from-cyan-900 to-blue-900",
  "from-orange-900 to-red-900",
];

function getGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PLACEHOLDER_COLORS[Math.abs(hash) % PLACEHOLDER_COLORS.length];
}

export default function TodaysBanner({ games }: TodaysBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (games.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [games.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[activeIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeIndex]);

  if (games.length === 0) return null;

  const featured = games[activeIndex];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-steam-text">
          오늘의 추천 게임
        </h2>
        <span className="text-sm text-steam-text-muted">
          매일 업데이트
        </span>
      </div>

      {/* Featured Game */}
      <Link href={`/games/${featured.id}`} className="block group">
        <div className="bg-steam-card rounded-lg overflow-hidden border border-steam-border hover:border-steam-blue-dark transition-all">
          <div className="flex flex-col md:flex-row">
            {/* Large Thumbnail */}
            <div
              className={cn(
                "w-full md:w-2/3 aspect-video md:aspect-auto md:min-h-[280px] bg-gradient-to-br flex items-center justify-center relative",
                getGradient(featured.title)
              )}
            >
              <span className="text-white/80 text-3xl font-bold drop-shadow-lg">
                {featured.title}
              </span>
              <div className="absolute top-3 left-3 bg-steam-blue text-steam-dark text-xs font-bold px-2 py-1 rounded">
                TODAY&apos;S PICK
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/3 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-steam-text group-hover:text-steam-blue transition-colors mb-2">
                  {featured.title}
                </h3>
                <p className="text-sm text-steam-text-muted line-clamp-3 mb-3">
                  {featured.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-steam-card-hover text-steam-text-muted">
                    {featured.genre.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-steam-blue/20 text-steam-blue">
                    {featured.aiTool.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <RatingStars rating={featured.averageRating} size="sm" />
                <span className="text-xs text-steam-text-muted">
                  {formatPlayerCount(featured.totalPlayers)} players
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Thumbnail Strip */}
      {games.length > 1 && (
        <div
          ref={scrollRef}
          className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1"
        >
          {games.map((game, idx) => (
            <button
              key={game.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "shrink-0 w-24 h-14 rounded overflow-hidden border-2 transition-all bg-gradient-to-br flex items-center justify-center",
                getGradient(game.title),
                idx === activeIndex
                  ? "border-steam-blue opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              )}
            >
              <span className="text-white/80 text-[10px] font-bold text-center px-1 leading-tight truncate">
                {game.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
