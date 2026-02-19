import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GameGrid from "@/components/game/GameGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const genre = await prisma.genre.findUnique({
    where: { slug },
    select: { name: true },
  });
  if (!genre) return { title: "카테고리를 찾을 수 없습니다" };
  return { title: `${genre.name} 게임 - NeuGameHub` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const genre = await prisma.genre.findUnique({
    where: { slug },
    include: {
      games: {
        orderBy: { totalPlayers: "desc" },
        include: {
          genre: { select: { name: true } },
          aiTool: { select: { name: true } },
        },
      },
    },
  });

  if (!genre) notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-steam-text">{genre.name}</h1>
        <p className="text-steam-text-muted text-sm mt-1">
          {genre.games.length}개의 게임
        </p>
      </div>
      <GameGrid games={genre.games} />
    </div>
  );
}
