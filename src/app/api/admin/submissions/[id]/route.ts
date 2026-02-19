import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    if (action === "approve") {
      // Find or create genre
      let genre = await prisma.genre.findFirst({
        where: { name: submission.genreName },
      });
      if (!genre) {
        genre = await prisma.genre.create({
          data: {
            name: submission.genreName,
            slug: submission.genreName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }

      // Find or create AI tool
      let aiTool = await prisma.aiTool.findFirst({
        where: { name: submission.aiToolName },
      });
      if (!aiTool) {
        aiTool = await prisma.aiTool.create({
          data: {
            name: submission.aiToolName,
            slug: submission.aiToolName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }

      // Create the game
      await prisma.game.create({
        data: {
          title: submission.title,
          description: submission.description,
          thumbnail: "",
          gameUrl: submission.gameUrl,
          genreId: genre.id,
          aiToolId: aiTool.id,
        },
      });

      // Update submission status
      await prisma.gameSubmission.update({
        where: { id },
        data: { status: "approved", adminNote },
      });

      return NextResponse.json({ message: "게임이 승인되어 등록되었습니다" });
    }

    // Reject
    await prisma.gameSubmission.update({
      where: { id },
      data: { status: "rejected", adminNote },
    });

    return NextResponse.json({ message: "게임 등록이 거절되었습니다" });
  } catch (error) {
    console.error("Failed to process submission:", error);
    return NextResponse.json(
      { error: "처리에 실패했습니다" },
      { status: 500 }
    );
  }
}
