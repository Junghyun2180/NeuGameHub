import { prisma } from "@/lib/prisma";
import { getToday } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const today = getToday();

    const stats = await prisma.dailyGameStats.upsert({
      where: {
        gameId_date: {
          gameId: id,
          date: today,
        },
      },
      create: {
        gameId: id,
        date: today,
        playerCount: 1,
      },
      update: {
        playerCount: {
          increment: 1,
        },
      },
    });

    // Also increment the total players on the game
    await prisma.game.update({
      where: { id },
      data: {
        totalPlayers: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ playerCount: stats.playerCount });
  } catch (error) {
    console.error("Failed to record play:", error);
    return NextResponse.json(
      { error: "Failed to record play" },
      { status: 500 }
    );
  }
}
