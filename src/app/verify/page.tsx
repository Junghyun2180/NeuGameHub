"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const verify = useCallback(async () => {
    if (!token) {
      setStatus("error");
      setMessage("유효하지 않은 인증 링크입니다.");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "인증에 실패했습니다.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
    } catch {
      setStatus("error");
      setMessage("오류가 발생했습니다.");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="bg-steam-card border border-steam-border rounded-lg p-8">
      {status === "loading" && (
        <>
          <div className="w-10 h-10 border-3 border-steam-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-steam-text">이메일 인증 처리 중...</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-12 h-12 bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-steam-text mb-2">인증 완료</h2>
          <p className="text-steam-text-muted text-sm mb-6">{message}</p>
          <Link
            href="/login"
            className="inline-block w-full py-2.5 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-semibold text-sm rounded transition-colors"
          >
            로그인하기
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-12 h-12 bg-red-600/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-steam-text mb-2">인증 실패</h2>
          <p className="text-steam-text-muted text-sm mb-6">{message}</p>
          <Link
            href="/login"
            className="inline-block w-full py-2.5 bg-steam-card border border-steam-border hover:border-steam-blue text-steam-text font-semibold text-sm rounded transition-colors"
          >
            로그인 페이지로 이동
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <Logo size={48} />
        </div>
        <Suspense
          fallback={
            <div className="bg-steam-card border border-steam-border rounded-lg p-8">
              <div className="w-10 h-10 border-3 border-steam-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-steam-text">로딩 중...</p>
            </div>
          }
        >
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  );
}
