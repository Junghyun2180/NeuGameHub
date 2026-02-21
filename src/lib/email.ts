import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY 환경변수가 설정되지 않았습니다. .env 파일을 확인해주세요.");
  }
  return new Resend(apiKey);
}

const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:7000";
const FROM_EMAIL = process.env.FROM_EMAIL || "NeuGameHub <onboarding@resend.dev>";

export async function generateVerificationToken(email: string): Promise<string> {
  // 기존 토큰 삭제
  await prisma.verificationToken.deleteMany({ where: { email } });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);

  await prisma.verificationToken.create({
    data: { token, email, expiresAt },
  });

  return token;
}

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const verifyUrl = `${APP_URL}/verify?token=${token}`;

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "[NeuGameHub] 이메일 인증을 완료해주세요",
      html: `
        <div style="max-width: 480px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1b2838; color: #c7d5e0; padding: 32px; border-radius: 8px;">
          <h1 style="color: #66c0f4; font-size: 24px; margin: 0 0 16px;">NeuGameHub</h1>
          <p style="margin: 0 0 24px; line-height: 1.6;">
            회원가입을 완료하려면 아래 버튼을 클릭하여 이메일을 인증해주세요.
          </p>
          <a href="${verifyUrl}" style="display: inline-block; background: #66c0f4; color: #1b2838; padding: 12px 32px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">
            이메일 인증하기
          </a>
          <p style="margin: 24px 0 0; font-size: 12px; color: #8f98a0;">
            이 링크는 24시간 동안 유효합니다. 버튼이 작동하지 않으면 아래 URL을 브라우저에 직접 입력하세요.
          </p>
          <p style="margin: 8px 0 0; font-size: 11px; color: #8f98a0; word-break: break-all;">
            ${verifyUrl}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Email send failed:", error);
      if (process.env.NODE_ENV === "development") {
        console.warn("[DEV] Email failed but continuing - use code 0000 to verify");
        return false;
      }
      throw new Error("이메일 발송에 실패했습니다");
    }

    return true;
  } catch (e) {
    console.error("Email send error:", e);
    if (process.env.NODE_ENV === "development") {
      console.warn("[DEV] Email failed but continuing - use code 0000 to verify");
      return false;
    }
    throw e;
  }
}

export async function verifyEmailToken(token: string) {
  const record = await prisma.verificationToken.findUnique({ where: { token } });

  if (!record) {
    return { success: false, error: "유효하지 않은 인증 링크입니다" };
  }

  if (record.expiresAt < new Date()) {
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return { success: false, error: "인증 링크가 만료되었습니다. 다시 발송해주세요" };
  }

  // 이메일 인증 처리
  await prisma.user.updateMany({
    where: { email: record.email },
    data: { emailVerified: true },
  });

  // 사용된 토큰 삭제
  await prisma.verificationToken.delete({ where: { id: record.id } });

  return { success: true, email: record.email };
}
