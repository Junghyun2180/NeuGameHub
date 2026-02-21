import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const { id: gameId } = await params;

    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      return NextResponse.json({ error: "게임을 찾을 수 없습니다" }, { status: 404 });
    }

    const existing = await prisma.favorite.findUnique({
      where: { userId_gameId: { userId: user.id, gameId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ isFavorite: false });
    }

    await prisma.favorite.create({
      data: { userId: user.id, gameId },
    });

    return NextResponse.json({ isFavorite: true });
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    return NextResponse.json({ error: "처리에 실패했습니다" }, { status: 500 });
  }
}
