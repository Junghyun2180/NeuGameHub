export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatPlayerCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function isValidGameUrl(url: string): boolean {
  // 로컬 게임 경로만 허용: /local-games/로 시작, 경로 트래버설 차단
  if (!url.startsWith("/local-games/")) return false;
  return !url.includes("..") && /^\/local-games\/[\w-]+\/[\w\-./]+$/.test(url);
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("ngh_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("ngh_session_id", sessionId);
  }
  return sessionId;
}
