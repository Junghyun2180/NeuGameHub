import { prisma } from "@/lib/prisma";
import { getToday } from "@/lib/utils";
import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import TodaysBanner from "@/components/game/TodaysBanner";
import GenreRow from "@/components/game/GenreRow";

async function getHomeData() {
  const today = getToday();

  const [genres, todaySelections, leftAds, rightAds] = await Promise.all([
    prisma.genre.findMany({
      orderBy: { name: "asc" },
      include: {
        games: {
          take: 4,
          orderBy: { totalPlayers: "desc" },
          include: {
            genre: { select: { name: true } },
            aiTool: { select: { name: true } },
          },
        },
      },
    }),
    prisma.todaySelection
      .findMany({
        where: { date: today },
        orderBy: { order: "asc" },
        include: {
          game: {
            include: {
              genre: { select: { name: true, slug: true } },
              aiTool: { select: { name: true, slug: true } },
            },
          },
        },
      })
      .then(async (selections) => {
        if (selections.length > 0) return selections;
        const allGames = await prisma.game.findMany();
        if (allGames.length === 0) return [];
        const shuffled = allGames.sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, Math.min(10, shuffled.length));
        await Promise.all(
          picked.map((game, index) =>
            prisma.todaySelection.create({
              data: { gameId: game.id, date: today, order: index },
            })
          )
        );
        return prisma.todaySelection.findMany({
          where: { date: today },
          orderBy: { order: "asc" },
          include: {
            game: {
              include: {
                genre: { select: { name: true, slug: true } },
                aiTool: { select: { name: true, slug: true } },
              },
            },
          },
        });
      }),
    prisma.ad.findMany({ where: { isActive: true, position: "left" } }),
    prisma.ad.findMany({ where: { isActive: true, position: "right" } }),
  ]);

  const todayGames = todaySelections.map((s) => s.game);

  return { genres, todayGames, leftAds, rightAds };
}

export default async function Home() {
  const { genres, todayGames, leftAds, rightAds } = await getHomeData();

  return (
    <ThreeColumnLayout leftAds={leftAds} rightAds={rightAds}>
      <TodaysBanner games={todayGames} />
      {genres.map((genre) => (
        <GenreRow
          key={genre.id}
          genre={{ name: genre.name, slug: genre.slug }}
          games={genre.games}
        />
      ))}
    </ThreeColumnLayout>
  );
}
