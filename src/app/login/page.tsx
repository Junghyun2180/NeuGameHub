"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "로그인에 실패했습니다");
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
          <h1 className="text-2xl font-bold text-steam-text">로그인</h1>
          <p className="text-sm text-steam-text-muted mt-1">
            NeuGameHub 계정에 로그인하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-steam-card border border-steam-border rounded-lg p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

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
              className="w-full px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30"
              placeholder="비밀번호"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-semibold text-sm rounded transition-colors disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-steam-text-muted mt-4">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-steam-blue hover:text-steam-highlight transition-colors">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
