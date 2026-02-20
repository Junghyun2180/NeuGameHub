import { deleteSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ message: "로그아웃되었습니다" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: "로그아웃에 실패했습니다" }, { status: 500 });
  }
}
