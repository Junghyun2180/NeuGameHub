import { prisma } from "@/lib/prisma";
import { getToday } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const period = request.nextUrl.searchParams.get("period") || "daily";
    const today = getToday();

    if (period === "daily") {
      const stats = await prisma.dailyGameStats.findMany({
        where: { date: today },
        orderBy: { playerCount: "desc" },
        take: 50,
        include: {
          game: {
            include: {
              genre: { select: { name: true } },
              aiTool: { select: { name: true } },
            },
          },
        },
      });

      const leaderboard = stats.map((s, idx) => ({
        rank: idx + 1,
        game: {
          id: s.game.id,
          title: s.game.title,
          thumbnail: s.game.thumbnail,
          averageRating: s.game.averageRating,
          genre: s.game.genre,
          aiTool: s.game.aiTool,
        },
        playerCount: s.playerCount,
      }));

      return NextResponse.json({ leaderboard, period: "daily" });
    }

    // Weekly: aggregate last 7 days
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const stats = await prisma.dailyGameStats.groupBy({
      by: ["gameId"],
      where: {
        date: { gte: weekAgo, lte: today },
      },
      _sum: { playerCount: true },
      orderBy: { _sum: { playerCount: "desc" } },
      take: 50,
    });

    const gameIds = stats.map((s) => s.gameId);
    const games = await prisma.game.findMany({
      where: { id: { in: gameIds } },
      include: {
        genre: { select: { name: true } },
        aiTool: { select: { name: true } },
      },
    });

    const gameMap = new Map(games.map((g) => [g.id, g]));

    const leaderboard = stats.map((s, idx) => {
      const game = gameMap.get(s.gameId)!;
      return {
        rank: idx + 1,
        game: {
          id: game.id,
          title: game.title,
          thumbnail: game.thumbnail,
          averageRating: game.averageRating,
          genre: game.genre,
          aiTool: game.aiTool,
        },
        playerCount: s._sum.playerCount || 0,
      };
    });

    return NextResponse.json({ leaderboard, period: "weekly" });
  } catch (error) {
    console.error("Failed to get leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to get leaderboard" },
      { status: 500 }
    );
  }
}
