import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { isValidGameUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, gameUrl, genreName, aiToolName, submitterName, submitterEmail } = body;

    if (!title || !description || !gameUrl || !genreName || !aiToolName || !submitterName || !submitterEmail) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요" },
        { status: 400 }
      );
    }

    if (!isValidGameUrl(gameUrl)) {
      return NextResponse.json(
        { error: "게임 URL은 /local-games/게임명/index.html 형식이어야 합니다" },
        { status: 400 }
      );
    }

    const submission = await prisma.gameSubmission.create({
      data: {
        title,
        description,
        gameUrl,
        genreName,
        aiToolName,
        submitterName,
        submitterEmail,
      },
    });

    return NextResponse.json({ submission, message: "게임 등록 신청이 완료되었습니다" });
  } catch (error) {
    console.error("Failed to create submission:", error);
    return NextResponse.json(
      { error: "게임 등록 신청에 실패했습니다" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await requireAdmin();

    const submissions = await prisma.gameSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    if (error instanceof Error && error.message === "관리자 권한이 필요합니다") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }
    console.error("Failed to get submissions:", error);
    return NextResponse.json(
      { error: "신청 목록을 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
