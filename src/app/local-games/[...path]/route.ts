import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join, normalize } from "path";

const GAMES_DIR = join(process.cwd(), "game-files");

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const types: Record<string, string> = {
    html: "text/html; charset=utf-8",
    js: "application/javascript",
    mjs: "application/javascript",
    css: "text/css",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    wasm: "application/wasm",
    json: "application/json",
    ico: "image/x-icon",
    mp3: "audio/mpeg",
    ogg: "audio/ogg",
    wav: "audio/wav",
  };
  return types[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const relativePath = path.join("/");

  // 경로 트래버설 차단
  const fullPath = normalize(join(GAMES_DIR, relativePath));
  if (!fullPath.startsWith(GAMES_DIR)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const content = await readFile(fullPath);
    return new NextResponse(content, {
      headers: {
        "Content-Type": getMimeType(relativePath),
        // 동일 출처 iframe 허용 (게임 파일 전용)
        "X-Frame-Options": "SAMEORIGIN",
        "X-Content-Type-Options": "nosniff",
        // 게임 내부 리소스에 맞는 관대한 CSP
        "Content-Security-Policy": [
          "default-src 'self' blob: data:",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
          "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
          "img-src * data: blob:",
          "media-src * blob: data:",
          "font-src * data:",
          // 게임 서버(멀티플레이어, 리더보드 등) 연결 허용
          "connect-src * ws: wss:",
          "frame-ancestors 'self'",
        ].join("; "),
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
