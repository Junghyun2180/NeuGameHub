import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";
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
      const field = existingUser.email === email ? "이메일" : "사용자명";
      return NextResponse.json(
        { error: `이미 사용 중인 ${field}입니다` },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    await createSession(user.id);

    return NextResponse.json({
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "회원가입에 실패했습니다" }, { status: 500 });
  }
}
