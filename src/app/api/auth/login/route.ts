import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "로그인에 실패했습니다" }, { status: 500 });
  }
}
