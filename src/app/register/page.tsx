"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(true);
  const [resending, setResending] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "회원가입에 실패했습니다");
        return;
      }

      if (data.needsVerification) {
        setSent(true);
        setEmailSent(data.emailSent !== false);
      }
    } catch {
      setError("오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // 실패해도 UX상 동일 메시지
    } finally {
      setResending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verifyCode.trim()) return;
    setVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verifyCode, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "인증에 실패했습니다");
        return;
      }

      setVerified(true);
    } catch {
      setError("오류가 발생했습니다");
    } finally {
      setVerifying(false);
    }
  };

  // 인증 완료 화면
  if (verified) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <Logo size={48} />
          </div>
          <div className="bg-steam-card border border-steam-border rounded-lg p-8">
            <div className="w-12 h-12 bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-steam-text mb-2">인증 완료</h2>
            <p className="text-steam-text-muted text-sm mb-6">
              이메일 인증이 완료되었습니다. 로그인해주세요.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-2.5 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-semibold text-sm rounded transition-colors text-center"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 인증 이메일 발송 완료 화면
  if (sent) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <Logo size={48} />
          </div>

          <div className="bg-steam-card border border-steam-border rounded-lg p-8">
            <div className="w-12 h-12 bg-steam-blue/20 border-2 border-steam-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-steam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-steam-text mb-2">
              {emailSent ? "이메일을 확인해주세요" : "이메일 인증"}
            </h2>
            <p className="text-steam-text-muted text-sm mb-2">
              <span className="text-steam-blue font-medium">{email}</span>
            </p>
            <p className="text-steam-text-muted text-sm mb-4">
              {emailSent
                ? <>위 주소로 인증 메일을 발송했습니다.<br />메일의 인증 버튼을 클릭하면 가입이 완료됩니다.</>
                : <>이메일 발송에 실패했습니다.<br />아래에 인증 코드를 입력해주세요.</>
              }
            </p>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm mb-4">
                {error}
              </div>
            )}

            {/* 인증 코드 입력 */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  maxLength={4}
                  placeholder="인증 코드"
                  className="flex-1 px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text text-center tracking-widest placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                />
                <button
                  onClick={handleVerifyCode}
                  disabled={verifying || !verifyCode.trim()}
                  className="px-4 py-2 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-semibold text-sm rounded transition-colors disabled:opacity-50"
                >
                  {verifying ? "..." : "인증"}
                </button>
              </div>
              {!emailSent && (
                <p className="text-steam-text-muted text-xs mt-2">
                  개발 환경: 코드 <span className="text-steam-blue font-mono">0000</span> 입력
                </p>
              )}
            </div>

            {emailSent && (
              <button
                onClick={handleResend}
                disabled={resending}
                className="w-full py-2.5 bg-steam-card border border-steam-border hover:border-steam-blue text-steam-text font-semibold text-sm rounded transition-colors disabled:opacity-50 mb-3"
              >
                {resending ? "발송 중..." : "인증 메일 다시 보내기"}
              </button>
            )}

            <Link
              href="/login"
              className="inline-block w-full py-2.5 bg-steam-card border border-steam-border hover:border-steam-blue text-steam-text font-semibold text-sm rounded transition-colors text-center"
            >
              로그인 페이지로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Logo size={48} />
          </div>
          <h1 className="text-2xl font-bold text-steam-text">회원가입</h1>
          <p className="text-sm text-steam-text-muted mt-1">
            NeuGameHub에 가입하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-steam-card border border-steam-border rounded-lg p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-steam-text-muted mb-1">
              사용자명
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
              placeholder="사용자명"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-steam-text-muted mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
              placeholder="이메일 주소"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-steam-text-muted mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
              placeholder="비밀번호 (6자 이상)"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-steam-text-muted mb-1">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
              placeholder="비밀번호 확인"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-semibold text-sm rounded transition-colors disabled:opacity-50"
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center text-sm text-steam-text-muted mt-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-steam-blue hover:text-steam-highlight transition-colors">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
