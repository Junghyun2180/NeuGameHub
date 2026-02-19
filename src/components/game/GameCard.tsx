import Link from "next/link";
import { cn, formatPlayerCount } from "@/lib/utils";
import RatingStars from "./RatingStars";

interface GameCardProps {
  game: {
    id: string;
    title: string;
    thumbnail: string | null;
    averageRating: number;
    totalPlayers: number;
    genre: { name: string };
    aiTool: { name: string };
  };
}

const GENRE_COLORS: Record<string, string> = {
  "퍼즐": "bg-purple-600",
  "아케이드": "bg-red-600",
  "전략": "bg-blue-600",
  "레이싱": "bg-green-600",
  "시뮬레이션": "bg-yellow-600",
  "RPG": "bg-pink-600",
  "스포츠": "bg-orange-600",
  "액션": "bg-red-700",
  "어드벤처": "bg-teal-600",
  "보드게임": "bg-indigo-600",
};

const PLACEHOLDER_COLORS = [
  "from-blue-900 to-purple-900",
  "from-green-900 to-teal-900",
  "from-red-900 to-orange-900",
  "from-indigo-900 to-blue-900",
  "from-pink-900 to-red-900",
  "from-teal-900 to-cyan-900",
  "from-yellow-900 to-amber-900",
  "from-violet-900 to-purple-900",
];

function getPlaceholderGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PLACEHOLDER_COLORS[Math.abs(hash) % PLACEHOLDER_COLORS.length];
}

export default function GameCard({ game }: GameCardProps) {
  const genreColor = GENRE_COLORS[game.genre.name] || "bg-steam-card-hover";
  const gradient = getPlaceholderGradient(game.title);

  return (
    <Link
      href={`/games/${game.id}`}
      className="group block rounded-lg overflow-hidden bg-steam-card hover:bg-steam-card-hover transition-all duration-200 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5"
    >
      {/* Thumbnail / Placeholder */}
      <div
        className={cn(
          "relative aspect-[16/9] bg-gradient-to-br flex items-center justify-center overflow-hidden",
          gradient
        )}
      >
        <span className="text-white/80 text-lg font-bold text-center px-4 leading-tight drop-shadow-lg">
          {game.title}
        </span>
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
      </div>

      {/* Card Info */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-steam-text font-semibold text-sm leading-tight truncate group-hover:text-white transition-colors">
          {game.title}
        </h3>

        {/* Tags row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded font-medium text-white",
              genreColor
            )}
          >
            {game.genre.name}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-steam-blue/20 text-steam-blue">
            {game.aiTool.name}
          </span>
        </div>

        {/* Rating and player count */}
        <div className="flex items-center justify-between">
          <RatingStars rating={game.averageRating} size="sm" />
          <span className="text-steam-text-muted text-xs">
            {formatPlayerCount(game.totalPlayers)} players
          </span>
        </div>
      </div>
    </Link>
  );
}
