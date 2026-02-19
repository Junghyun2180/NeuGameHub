import { prisma } from "@/lib/prisma";
import { getToday } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = getToday();

    // Check if we already have today's selections
    let selections = await prisma.todaySelection.findMany({
      where: { date: today },
      orderBy: { order: "asc" },
      include: {
        game: {
          include: {
            genre: true,
            aiTool: true,
          },
        },
      },
    });

    // If no selections exist for today, randomly pick 10 games
    if (selections.length === 0) {
      const allGames = await prisma.game.findMany();

      if (allGames.length === 0) {
        return NextResponse.json({ games: [] });
      }

      // Shuffle and pick up to 10
      const shuffled = allGames.sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, Math.min(10, shuffled.length));

      // Create TodaySelection entries
      await Promise.all(
        picked.map((game, index) =>
          prisma.todaySelection.create({
            data: {
              gameId: game.id,
              date: today,
              order: index,
            },
          })
        )
      );

      // Re-fetch with includes
      selections = await prisma.todaySelection.findMany({
        where: { date: today },
        orderBy: { order: "asc" },
        include: {
          game: {
            include: {
              genre: true,
              aiTool: true,
            },
          },
        },
      });
    }

    const games = selections.map((s) => s.game);

    return NextResponse.json({ games });
  } catch (error) {
    console.error("Failed to get today's games:", error);
    return NextResponse.json(
      { error: "Failed to get today's games" },
      { status: 500 }
    );
  }
}
