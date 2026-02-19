import { prisma } from "@/lib/prisma";
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
    const submissions = await prisma.gameSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Failed to get submissions:", error);
    return NextResponse.json(
      { error: "신청 목록을 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
