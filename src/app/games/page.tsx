import { prisma } from "@/lib/prisma";
import { getFavoriteGameIds } from "@/lib/auth";
import GameGrid from "@/components/game/GameGrid";

export const metadata = {
  title: "전체 게임 - NeuGameHub",
};

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;

  type OrderBy = { totalPlayers?: "desc"; averageRating?: "desc"; createdAt?: "desc" };
  let orderBy: OrderBy = { totalPlayers: "desc" };
  if (sort === "rating") orderBy = { averageRating: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };

  const favoriteGameIds = await getFavoriteGameIds();

  const games = await prisma.game.findMany({
    orderBy,
    include: {
      genre: { select: { name: true } },
      aiTool: { select: { name: true } },
    },
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-steam-text">전체 게임</h1>
          <p className="text-steam-text-muted text-sm mt-1">
            {games.length}개의 게임
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/games?sort=players"
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              !sort || sort === "players"
                ? "bg-steam-blue text-steam-dark border-steam-blue"
                : "text-steam-text-muted border-steam-border hover:text-steam-text"
            }`}
          >
            인기순
          </a>
          <a
            href="/games?sort=rating"
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              sort === "rating"
                ? "bg-steam-blue text-steam-dark border-steam-blue"
                : "text-steam-text-muted border-steam-border hover:text-steam-text"
            }`}
          >
            평점순
          </a>
          <a
            href="/games?sort=newest"
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              sort === "newest"
                ? "bg-steam-blue text-steam-dark border-steam-blue"
                : "text-steam-text-muted border-steam-border hover:text-steam-text"
            }`}
          >
            최신순
          </a>
        </div>
      </div>
      <GameGrid games={games} favoriteGameIds={favoriteGameIds} />
    </div>
  );
}
