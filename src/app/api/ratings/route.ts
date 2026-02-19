import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, score, sessionId } = body;

    if (!gameId || !score || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: gameId, score, sessionId" },
        { status: 400 }
      );
    }

    if (score < 1 || score > 5) {
      return NextResponse.json(
        { error: "Score must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Upsert the rating (create or update based on gameId+sessionId unique constraint)
    const rating = await prisma.rating.upsert({
      where: {
        gameId_sessionId: {
          gameId,
          sessionId,
        },
      },
      create: {
        gameId,
        sessionId,
        score,
      },
      update: {
        score,
      },
    });

    // Recalculate average rating for the game
    const aggregation = await prisma.rating.aggregate({
      where: { gameId },
      _avg: { score: true },
    });

    const averageRating = aggregation._avg.score ?? 0;

    // Update the game's averageRating
    await prisma.game.update({
      where: { id: gameId },
      data: { averageRating },
    });

    return NextResponse.json({
      averageRating,
      userRating: rating.score,
    });
  } catch (error) {
    console.error("Failed to save rating:", error);
    return NextResponse.json(
      { error: "Failed to save rating" },
      { status: 500 }
    );
  }
}
