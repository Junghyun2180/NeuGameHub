import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "이메일, 사용자명, 비밀번호를 모두 입력해주세요" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "비밀번호는 6자 이상이어야 합니다" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      // 이미 가입했지만 인증 안 된 경우 → 토큰 재발송
      if (!existingUser.emailVerified && existingUser.email === email) {
        const token = await generateVerificationToken(email);
        const emailSent = await sendVerificationEmail(email, token);
        return NextResponse.json({
          needsVerification: true,
          emailSent,
          message: emailSent
            ? "이미 가입된 이메일입니다. 인증 메일을 다시 발송했습니다."
            : "이미 가입된 이메일입니다. 인증 코드를 입력해주세요.",
        });
      }

      const field = existingUser.email === email ? "이메일" : "사용자명";
      return NextResponse.json(
        { error: `이미 사용 중인 ${field}입니다` },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: { email, username, password: hashedPassword, emailVerified: false },
    });

    // 인증 토큰 생성 및 이메일 발송
    const token = await generateVerificationToken(email);
    const emailSent = await sendVerificationEmail(email, token);

    return NextResponse.json({
      needsVerification: true,
      emailSent,
      message: emailSent
        ? "인증 이메일을 발송했습니다. 이메일을 확인해주세요."
        : "이메일 발송에 실패했습니다. 인증 코드를 입력해주세요.",
    });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "회원가입에 실패했습니다" }, { status: 500 });
  }
}
