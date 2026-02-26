"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  title: string;
  description: string;
  gameUrl: string;
  genreName: string;
  aiToolName: string;
  submitterName: string;
  submitterEmail: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
}

export default function AdminSubmissionsClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, adminNote: noteInput[id] || "" }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchSubmissions();
      } else {
        setActionError(data.error || "처리에 실패했습니다");
      }
    } catch {
      setActionError("네트워크 오류가 발생했습니다");
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = submissions.filter((s) =>
    filter === "all" ? true : s.status === filter
  );

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-900/40 text-yellow-300 border-yellow-700",
      approved: "bg-green-900/40 text-green-300 border-green-700",
      rejected: "bg-red-900/40 text-red-300 border-red-700",
    };
    const labels: Record<string, string> = {
      pending: "대기 중",
      approved: "승인됨",
      rejected: "거절됨",
    };
    return (
      <span className={cn("text-xs px-2 py-0.5 rounded border", styles[status])}>
        {labels[status]}
      </span>
    );
  };

  return (
    <>
      {/* Action Error */}
      {actionError && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm flex justify-between items-center">
          <span>⚠ {actionError}</span>
          <button onClick={() => setActionError(null)} className="text-red-400 hover:text-red-200 ml-4">✕</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-steam-card rounded-lg border border-steam-border p-1 w-fit">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded transition-colors",
              filter === f
                ? "bg-steam-blue text-steam-dark"
                : "text-steam-text-muted hover:text-steam-text"
            )}
          >
            {f === "pending" && "대기 중"}
            {f === "approved" && "승인됨"}
            {f === "rejected" && "거절됨"}
            {f === "all" && "전체"}
            {" "}
            ({submissions.filter((s) => f === "all" ? true : s.status === f).length})
          </button>
        ))}
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-steam-text text-sm">게임 미리보기</span>
              <button
                onClick={() => setPreviewUrl(null)}
                className="text-steam-text-muted hover:text-steam-text text-sm px-3 py-1 border border-steam-border rounded"
              >
                닫기
              </button>
            </div>
            <div className="aspect-video bg-black rounded-lg overflow-hidden border border-steam-border">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-steam-text-muted">로딩 중...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-steam-text-muted">
          신청이 없습니다
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="bg-steam-card border border-steam-border rounded-lg p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-steam-text">
                      {sub.title}
                    </h3>
                    {statusBadge(sub.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-steam-text-muted">
                    <span>{sub.submitterName}</span>
                    <span>{sub.submitterEmail}</span>
                    <span>
                      {new Date(sub.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewUrl(sub.gameUrl)}
                  className="px-3 py-1.5 text-xs bg-steam-blue/20 text-steam-blue rounded hover:bg-steam-blue/30 transition-colors"
                >
                  미리보기
                </button>
              </div>

              <p className="text-sm text-steam-text-muted mb-3 line-clamp-2">
                {sub.description}
              </p>

              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="px-2 py-0.5 rounded bg-steam-card-hover text-steam-text-muted">
                  {sub.genreName}
                </span>
                <span className="px-2 py-0.5 rounded bg-steam-blue/20 text-steam-blue">
                  {sub.aiToolName}
                </span>
                <a
                  href={sub.gameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steam-blue hover:underline ml-auto"
                >
                  {sub.gameUrl}
                </a>
              </div>

              {sub.status === "pending" && (
                <div className="flex items-center gap-2 pt-3 border-t border-steam-border">
                  <input
                    type="text"
                    placeholder="관리자 메모 (선택)"
                    value={noteInput[sub.id] || ""}
                    onChange={(e) =>
                      setNoteInput({ ...noteInput, [sub.id]: e.target.value })
                    }
                    className="flex-1 px-3 py-2 bg-steam-bg border border-steam-border rounded text-sm text-steam-text placeholder:text-steam-text-muted/50 focus:outline-none focus:border-steam-blue"
                  />
                  <button
                    onClick={() => handleAction(sub.id, "approve")}
                    disabled={processingId === sub.id}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleAction(sub.id, "reject")}
                    disabled={processingId === sub.id}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
                  >
                    거절
                  </button>
                </div>
              )}

              {sub.adminNote && (
                <div className="mt-3 p-2 bg-steam-bg rounded text-xs text-steam-text-muted">
                  관리자 메모: {sub.adminNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
