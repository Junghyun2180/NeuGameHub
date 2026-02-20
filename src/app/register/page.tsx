"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      router.push("/");
      router.refresh();
    } catch {
      setError("오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

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
