"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const GENRES = ["액션", "퍼즐", "RPG", "시뮬레이션", "전략", "캐주얼", "아케이드", "스포츠"];
const AI_TOOLS = ["Claude", "ChatGPT", "Cursor", "Gemini", "Copilot"];
const MAX_FILE_SIZE_MB = 50;

export default function SubmitGamePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    genreName: "",
    aiToolName: "",
    submitterName: "",
    submitterEmail: "",
  });
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setResult({ ok: false, message: "ZIP 파일만 업로드할 수 있습니다" });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setResult({ ok: false, message: `파일 크기는 ${MAX_FILE_SIZE_MB}MB를 초과할 수 없습니다` });
      e.target.value = "";
      return;
    }

    setZipFile(file);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipFile) {
      setResult({ ok: false, message: "게임 ZIP 파일을 업로드해주세요" });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("genreName", form.genreName);
      formData.append("aiToolName", form.aiToolName);
      formData.append("submitterName", form.submitterName);
      formData.append("submitterEmail", form.submitterEmail);
      formData.append("zipFile", zipFile);

      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setResult({ ok: true, message: "게임 등록 신청이 완료되었습니다! 관리자 검토 후 등록됩니다." });
        setForm({ title: "", description: "", genreName: "", aiToolName: "", submitterName: "", submitterEmail: "" });
        setZipFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
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

        {/* ZIP File Upload */}
        <div>
          <label className="block text-sm font-medium text-steam-text mb-1.5">
            게임 빌드 파일 (ZIP) <span className="text-red-400">*</span>
          </label>
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
              zipFile
                ? "border-steam-blue bg-steam-blue/5"
                : "border-steam-border hover:border-steam-blue/50"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip"
              onChange={handleFileChange}
              className="hidden"
            />
            {zipFile ? (
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📦</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-steam-text">{zipFile.name}</p>
                  <p className="text-xs text-steam-text-muted">
                    {(zipFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZipFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="ml-auto text-steam-text-muted hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <p className="text-3xl mb-2">📁</p>
                <p className="text-sm text-steam-text">클릭하여 ZIP 파일 선택</p>
                <p className="text-xs text-steam-text-muted mt-1">최대 {MAX_FILE_SIZE_MB}MB</p>
              </div>
            )}
          </div>
          <div className="mt-2 p-3 bg-steam-card rounded-lg border border-steam-border text-xs text-steam-text-muted space-y-1">
            <p className="font-medium text-steam-text">ZIP 파일 구조 안내</p>
            <p>• ZIP 최상위(루트)에 <code className="text-steam-blue">index.html</code> 이 있어야 합니다</p>
            <p>• 폴더째로 압축하지 말고, 파일들을 직접 선택해서 압축하세요</p>
            <p>• Unity WebGL, Godot HTML5, 순수 웹 빌드 모두 지원합니다</p>
          </div>
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
          disabled={submitting || !zipFile}
          className="w-full py-3 bg-steam-blue hover:bg-steam-highlight text-steam-dark font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "업로드 중..." : "게임 등록 신청"}
        </button>
      </form>
    </div>
  );
}
