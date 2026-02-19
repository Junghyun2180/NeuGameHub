import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import GamePlaySection from "@/components/game/GamePlaySection";
import GameCard from "@/components/game/GameCard";
import Link from "next/link";

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

function getGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PLACEHOLDER_COLORS[Math.abs(hash) % PLACEHOLDER_COLORS.length];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await prisma.game.findUnique({
    where: { id },
    select: { title: true, description: true },
  });

  if (!game) return { title: "게임을 찾을 수 없습니다" };
  return {
    title: `${game.title} - NeuGameHub`,
    description: game.description,
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      genre: true,
      aiTool: true,
    },
  });

  if (!game) notFound();

  // Related games (same genre, excluding current)
  const relatedGames = await prisma.game.findMany({
    where: {
      genreId: game.genreId,
      id: { not: game.id },
    },
    take: 4,
    orderBy: { totalPlayers: "desc" },
    include: {
      genre: { select: { name: true } },
      aiTool: { select: { name: true } },
    },
  });

  const gradient = getGradient(game.title);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      {/* Hero Thumbnail */}
      <div
        className={cn(
          "w-full aspect-video rounded-lg bg-gradient-to-br flex items-center justify-center mb-6",
          gradient
        )}
      >
        <span className="text-white/80 text-4xl font-bold drop-shadow-lg">
          {game.title}
        </span>
      </div>

      {/* Title & Tags */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-steam-text mb-3">
          {game.title}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/category/${game.genre.slug}`}
            className="text-xs px-2.5 py-1 rounded bg-steam-card-hover text-steam-text-muted hover:text-steam-text transition-colors"
          >
            {game.genre.name}
          </Link>
          <Link
            href={`/ai-tool/${game.aiTool.slug}`}
            className="text-xs px-2.5 py-1 rounded bg-steam-blue/20 text-steam-blue hover:bg-steam-blue/30 transition-colors"
          >
            Built with {game.aiTool.name}
          </Link>
        </div>
      </div>

      {/* Play Section (Client Component) */}
      <GamePlaySection
        gameId={game.id}
        gameUrl={game.gameUrl}
        gameTitle={game.title}
        averageRating={game.averageRating}
        totalPlayers={game.totalPlayers}
        userRating={null}
      />

      {/* Description */}
      <div className="mt-8 p-5 bg-steam-card rounded-lg border border-steam-border">
        <h2 className="text-lg font-bold text-steam-text mb-3">게임 소개</h2>
        <p className="text-steam-text-muted leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-steam-text mb-4">
            비슷한 게임
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedGames.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
