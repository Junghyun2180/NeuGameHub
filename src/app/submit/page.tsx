"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const GENRES = ["액션", "퍼즐", "RPG", "시뮬레이션", "전략", "캐주얼", "아케이드", "스포츠"];
const AI_TOOLS = ["Claude", "ChatGPT", "Cursor", "Gemini", "Copilot"];

export default function SubmitGamePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    gameUrl: "",
    genreName: "",
    aiToolName: "",
    submitterName: "",
    submitterEmail: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({ ok: true, message: "게임 등록 신청이 완료되었습니다! 관리자 검토 후 등록됩니다." });
        setForm({
          title: "",
          description: "",
          gameUrl: "",
          genreName: "",
          aiToolName: "",
          submitterName: "",
          submitterEmail: "",
        });
      } else {
        setResult({ ok: false, message: data.error || "신청에 실패했습니다" });
      }
    } catch {
      setResult({ ok: false, message: "네트워크 오류가 발생했습니다" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-steam-bg border border-steam-border rounded-lg text-steam-text text-sm placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30 transition-colors";

  return (
    <div className="max-w-[640px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-steam-text mb-2">게임 등록 신청</h1>
      <p className="text-steam-text-muted text-sm mb-8">
        AI로 만든 게임을 NeuGameHub에 등록해보세요. 관리자 검토 후 승인되면 플랫폼에 게시됩니다.
      </p>

      {result && (
        <div
          className={cn(
            "p-4 rounded-lg mb-6 text-sm",
            result.ok
              ? "bg-green-900/30 border border-green-700 text-green-300"
              : "bg-red-900/30 border border-red-700 text-red-300"
          )}
        >
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Game Title */}
        <div>
          <label className="block text-sm font-medium text-steam-text mb-1.5">
            게임 제목 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="예: Space Invaders AI"
            className={inputClass}
          />
        </div>

        {/* Game URL */}
        <div>
          <label className="block text-sm font-medium text-steam-text mb-1.5">
            게임 URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            required
            value={form.gameUrl}
            onChange={(e) => setForm({ ...form, gameUrl: e.target.value })}
            placeholder="https://example.com/game"
            className={inputClass}
          />
          <p className="text-xs text-steam-text-muted mt-1">
            iframe으로 임베드 가능한 URL을 입력해주세요
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-steam-text mb-1.5">
            게임 설명 <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="게임에 대한 설명을 작성해주세요"
            className={cn(inputClass, "resize-none")}
          />
        </div>

        {/* Genre & AI Tool */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-steam-text mb-1.5">
              장르 <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={form.genreName}
              onChange={(e) => setForm({ ...form, genreName: e.target.value })}
              className={inputClass}
            >
              <option value="">선택하세요</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-steam-text mb-1.5">
              AI 도구 <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={form.aiToolName}
              onChange={(e) => setForm({ ...form, aiToolName: e.target.value })}
              className={inputClass}
            >
              <option value="">선택하세요</option>
              {AI_TOOLS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submitter Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-steam-text mb-1.5">
              이름 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.submitterName}
              onChange={(e) => setForm({ ...form, submitterName: e.target.value })}
              placeholder="개발자 이름"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-steam-text mb-1.5">
              이메일 <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              required
              value={form.submitterEmail}
              onChange={(e) => setForm({ ...form, submitterEmail: e.target.value })}
              placeholder="email@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "제출 중..." : "게임 등록 신청"}
        </button>
      </form>
    </div>
  );
}
