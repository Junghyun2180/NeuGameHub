import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { rename, rm } from "fs/promises";
import { join } from "path";

const GAMES_DIR = join(process.cwd(), "game-files");

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const { action, adminNote } = body;

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "action must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    const submission = await prisma.gameSubmission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ error: "신청을 찾을 수 없습니다" }, { status: 404 });
    }

    // gameUrl에서 pendingId 추출: /local-games/pending/{pendingId}/index.html
    const urlParts = submission.gameUrl.split("/");
    // ["", "local-games", "pending", pendingId, "index.html"]
    const pendingId = urlParts[3];
    const pendingDir = join(GAMES_DIR, "pending", pendingId);

    if (action === "approve") {
      // pending → 최종 디렉토리로 이동 (submission.id 사용)
      const finalDir = join(GAMES_DIR, id);
      try {
        await rename(pendingDir, finalDir);
      } catch {
        return NextResponse.json(
          { error: "게임 파일을 찾을 수 없습니다. 파일이 올바르게 업로드되었는지 확인하세요." },
          { status: 400 }
        );
      }

      // 장르 찾기 또는 생성
      let genre = await prisma.genre.findFirst({ where: { name: submission.genreName } });
      if (!genre) {
        genre = await prisma.genre.create({
          data: {
            name: submission.genreName,
            slug: submission.genreName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }

      // AI 도구 찾기 또는 생성
      let aiTool = await prisma.aiTool.findFirst({ where: { name: submission.aiToolName } });
      if (!aiTool) {
        aiTool = await prisma.aiTool.create({
          data: {
            name: submission.aiToolName,
            slug: submission.aiToolName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }

      // 최종 게임 URL (submission.id 기반)
      const finalGameUrl = `/local-games/${id}/index.html`;

      // Game 레코드 생성
      await prisma.game.create({
        data: {
          title: submission.title,
          description: submission.description,
          thumbnail: "",
          gameUrl: finalGameUrl,
          genreId: genre.id,
          aiToolId: aiTool.id,
        },
      });

      // 신청 상태 업데이트 (gameUrl도 최종 URL로 업데이트)
      await prisma.gameSubmission.update({
        where: { id },
        data: { status: "approved", adminNote, gameUrl: finalGameUrl },
      });

      return NextResponse.json({ message: "게임이 승인되어 등록되었습니다" });
    }

    // 거절: pending 파일 삭제
    await rm(pendingDir, { recursive: true, force: true });

    await prisma.gameSubmission.update({
      where: { id },
      data: { status: "rejected", adminNote },
    });

    return NextResponse.json({ message: "게임 등록이 거절되었습니다" });
  } catch (error) {
    if (error instanceof Error && error.message === "관리자 권한이 필요합니다") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }
    console.error("Failed to process submission:", error);
    return NextResponse.json({ error: "처리에 실패했습니다" }, { status: 500 });
  }
}
