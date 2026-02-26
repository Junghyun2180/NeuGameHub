import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // /local-games/ 는 Route Handler가 직접 헤더를 처리
  if (!pathname.startsWith("/local-games/")) {
    response.headers.set("X-Frame-Options", "DENY");
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
