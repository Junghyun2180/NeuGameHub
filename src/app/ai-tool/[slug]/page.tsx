import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GameGrid from "@/components/game/GameGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aiTool = await prisma.aiTool.findUnique({
    where: { slug },
    select: { name: true },
  });
  if (!aiTool) return { title: "AI 도구를 찾을 수 없습니다" };
  return { title: `${aiTool.name}으로 만든 게임 - NeuGameHub` };
}

export default async function AiToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const aiTool = await prisma.aiTool.findUnique({
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

  if (!aiTool) notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-steam-text">
          <span className="text-steam-blue">{aiTool.name}</span>으로 만든 게임
        </h1>
        <p className="text-steam-text-muted text-sm mt-1">
          {aiTool.games.length}개의 게임
        </p>
      </div>
      <GameGrid games={aiTool.games} />
    </div>
  );
}
