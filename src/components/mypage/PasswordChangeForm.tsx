"use client";

import { useState } from "react";

export default function PasswordChangeForm() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "새 비밀번호가 일치하지 않습니다" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }

      setMessage({ type: "success", text: "비밀번호가 변경되었습니다" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      setMessage({ type: "error", text: "오류가 발생했습니다" });
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-steam-blue hover:text-steam-blue-light transition-colors cursor-pointer"
      >
        비밀번호 변경
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t border-steam-border pt-4 space-y-3">
      <h3 className="text-sm font-semibold text-steam-text">비밀번호 변경</h3>

      <input
        type="password"
        placeholder="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        className="w-full px-3 py-2 bg-steam-dark border border-steam-border rounded text-sm text-steam-text placeholder-steam-text-muted focus:outline-none focus:border-steam-blue"
      />
      <input
        type="password"
        placeholder="새 비밀번호 (6자 이상)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        minLength={6}
        className="w-full px-3 py-2 bg-steam-dark border border-steam-border rounded text-sm text-steam-text placeholder-steam-text-muted focus:outline-none focus:border-steam-blue"
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        className="w-full px-3 py-2 bg-steam-dark border border-steam-border rounded text-sm text-steam-text placeholder-steam-text-muted focus:outline-none focus:border-steam-blue"
      />

      {message && (
        <p className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-steam-blue text-white text-sm rounded hover:bg-steam-blue-light disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? "변경 중..." : "변경하기"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setMessage(null);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          className="px-4 py-2 bg-steam-border text-steam-text text-sm rounded hover:bg-steam-border/80 transition-colors cursor-pointer"
        >
          취소
        </button>
      </div>
    </form>
  );
}
