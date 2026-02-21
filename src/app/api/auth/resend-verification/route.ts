import { prisma } from "@/lib/prisma";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // 보안: 존재하지 않는 이메일이어도 동일한 메시지 반환
      return NextResponse.json({
        message: "해당 이메일로 인증 메일을 발송했습니다.",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json({
        message: "이미 인증된 이메일입니다. 로그인해주세요.",
      });
    }

    const token = await generateVerificationToken(email);
    const emailSent = await sendVerificationEmail(email, token);

    return NextResponse.json({
      emailSent,
      message: emailSent
        ? "인증 메일을 다시 발송했습니다. 이메일을 확인해주세요."
        : "이메일 발송에 실패했습니다. 인증 코드를 입력해주세요.",
    });
  } catch (error) {
    console.error("Resend verification failed:", error);
    return NextResponse.json(
      { error: "이메일 발송에 실패했습니다" },
      { status: 500 }
    );
  }
}
