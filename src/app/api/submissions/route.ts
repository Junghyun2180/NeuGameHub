import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { mkdir, rm } from "fs/promises";
import { join, extname } from "path";
import { randomUUID } from "crypto";
import AdmZip from "adm-zip";

const GAMES_DIR = join(process.cwd(), "game-files");
const PENDING_DIR = join(GAMES_DIR, "pending");

const DANGEROUS_EXTENSIONS = new Set([
  ".exe", ".sh", ".bat", ".cmd", ".ps1", ".py", ".php",
  ".rb", ".pl", ".jar", ".dll", ".so", ".dylib", ".app",
  ".deb", ".rpm", ".msi", ".vbs", ".hta", ".scr", ".com",
]);

const MAX_UNCOMPRESSED_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_FILE_COUNT = 1000;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const genreName = formData.get("genreName") as string;
    const aiToolName = formData.get("aiToolName") as string;
    const submitterName = formData.get("submitterName") as string;
    const submitterEmail = formData.get("submitterEmail") as string;
    const zipFile = formData.get("zipFile") as File | null;

    if (!title || !description || !genreName || !aiToolName || !submitterName || !submitterEmail) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요" }, { status: 400 });
    }

    if (!zipFile || zipFile.size === 0) {
      return NextResponse.json({ error: "게임 ZIP 파일을 업로드해주세요" }, { status: 400 });
    }

    if (zipFile.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "ZIP 파일 크기는 50MB를 초과할 수 없습니다" }, { status: 400 });
    }

    // ZIP 버퍼 읽기
    const arrayBuffer = await zipFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ZIP 파일 파싱
    let zip: AdmZip;
    try {
      zip = new AdmZip(buffer);
    } catch {
      return NextResponse.json({ error: "올바른 ZIP 파일이 아닙니다" }, { status: 400 });
    }

    const entries = zip.getEntries();

    if (entries.length === 0) {
      return NextResponse.json({ error: "ZIP 파일이 비어 있습니다" }, { status: 400 });
    }

    if (entries.length > MAX_FILE_COUNT) {
      return NextResponse.json(
        { error: `파일이 너무 많습니다 (최대 ${MAX_FILE_COUNT}개)` },
        { status: 400 }
      );
    }

    // 각 항목 보안 검증
    let totalUncompressedSize = 0;
    let hasRootIndex = false;

    for (const entry of entries) {
      if (entry.isDirectory) continue;

      const entryName = entry.entryName.replace(/\\/g, "/");

      // 경로 트래버설 차단
      if (entryName.includes("..") || entryName.startsWith("/")) {
        return NextResponse.json(
          { error: "유효하지 않은 파일 경로가 포함되어 있습니다" },
          { status: 400 }
        );
      }

      // 위험 확장자 차단
      const ext = extname(entryName).toLowerCase();
      if (DANGEROUS_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: `허용되지 않는 파일 형식입니다: ${ext}` },
          { status: 400 }
        );
      }

      // ZIP 폭탄 차단 (압축 해제 후 크기 합계)
      totalUncompressedSize += entry.header.size;
      if (totalUncompressedSize > MAX_UNCOMPRESSED_SIZE) {
        return NextResponse.json(
          { error: "압축 해제 후 크기가 100MB를 초과합니다" },
          { status: 400 }
        );
      }

      // 루트 index.html 확인
      if (entryName === "index.html") {
        hasRootIndex = true;
      }
    }

    if (!hasRootIndex) {
      return NextResponse.json(
        {
          error:
            "ZIP 파일 최상위(루트)에 index.html이 없습니다. 폴더 안에 넣지 말고 파일들을 직접 압축하세요.",
        },
        { status: 400 }
      );
    }

    // 임시 디렉토리에 압축 해제
    const pendingId = randomUUID();
    const pendingDir = join(PENDING_DIR, pendingId);

    try {
      await mkdir(pendingDir, { recursive: true });
      zip.extractAllTo(pendingDir, true);
    } catch (extractError) {
      await rm(pendingDir, { recursive: true, force: true });
      throw extractError;
    }

    // GameSubmission 레코드 생성
    const gameUrl = `/local-games/pending/${pendingId}/index.html`;
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

    return NextResponse.json({
      submission,
      message: "게임 등록 신청이 완료되었습니다. 관리자 검토 후 승인됩니다.",
    });
  } catch (error) {
    console.error("Failed to create submission:", error);
    return NextResponse.json({ error: "게임 등록 신청에 실패했습니다" }, { status: 500 });
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
