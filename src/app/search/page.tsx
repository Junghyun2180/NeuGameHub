import { prisma } from "@/lib/prisma";
import { getFavoriteGameIds } from "@/lib/auth";
import GameGrid from "@/components/game/GameGrid";

export const metadata = {
  title: "검색 - NeuGameHub",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const favoriteGameIds = await getFavoriteGameIds();

  const games = query
    ? await prisma.game.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
        orderBy: { totalPlayers: "desc" },
        include: {
          genre: { select: { name: true } },
          aiTool: { select: { name: true } },
        },
      })
    : [];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="mb-6">
        {query ? (
          <>
            <h1 className="text-2xl font-bold text-steam-text">
              &ldquo;{query}&rdquo; 검색 결과
            </h1>
            <p className="text-steam-text-muted text-sm mt-1">
              {games.length}개의 게임을 찾았습니다
            </p>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-steam-text">
            검색어를 입력하세요
          </h1>
        )}
      </div>

      {games.length > 0 ? (
        <GameGrid games={games} favoriteGameIds={favoriteGameIds} />
      ) : query ? (
        <div className="text-center py-16">
          <div className="text-steam-text-muted text-lg mb-2">
            검색 결과가 없습니다
          </div>
          <p className="text-steam-text-muted text-sm">
            다른 키워드로 다시 검색해보세요
          </p>
        </div>
      ) : null}
    </div>
  );
}
