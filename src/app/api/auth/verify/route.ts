import { verifyEmailToken } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 개발 환경 전용: 코드 "0000"으로 인증 우회
    if (body.code === "0000" && body.email) {
      if (process.env.NODE_ENV !== "development") {
        return NextResponse.json(
          { error: "유효하지 않은 인증 코드입니다" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({ where: { email: body.email } });
      if (!user) {
        return NextResponse.json(
          { error: "존재하지 않는 이메일입니다" },
          { status: 400 }
        );
      }

      if (user.emailVerified) {
        return NextResponse.json({
          message: "이미 인증된 이메일입니다. 로그인해주세요.",
        });
      }

      await prisma.user.update({
        where: { email: body.email },
        data: { emailVerified: true },
      });

      // 사용된 토큰 정리
      await prisma.verificationToken.deleteMany({ where: { email: body.email } });

      console.log(`[DEV] Email verified via code 0000: ${body.email}`);
      return NextResponse.json({
        message: "이메일 인증이 완료되었습니다. 로그인해주세요.",
      });
    }

    // 기존 토큰 기반 인증
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다" },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "이메일 인증이 완료되었습니다. 로그인해주세요.",
    });
  } catch (error) {
    console.error("Verification failed:", error);
    return NextResponse.json(
      { error: "인증 처리에 실패했습니다" },
      { status: 500 }
    );
  }
}
