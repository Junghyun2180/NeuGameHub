"use client";

import { useRouter } from "next/navigation";

interface UserMenuProps {
  username: string;
  role: string;
}

export default function UserMenu({ username, role }: UserMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative group/user">
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-steam-text hover:text-steam-blue transition-colors rounded hover:bg-steam-card/50"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{username}</span>
        {role === "admin" && (
          <span className="text-[10px] px-1.5 py-0.5 bg-yellow-600/30 text-yellow-300 rounded font-medium">
            관리자
          </span>
        )}
        <svg className="w-3 h-3 transition-transform group-hover/user:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full right-0 pt-1 invisible group-hover/user:visible opacity-0 group-hover/user:opacity-100 transition-all duration-150">
        <div className="bg-steam-card border border-steam-border rounded-lg shadow-xl shadow-black/40 py-2 min-w-[160px]">
          {role === "admin" && (
            <a
              href="/admin/submissions"
              className="block px-4 py-2 text-sm text-yellow-300 hover:text-yellow-200 hover:bg-steam-card-hover transition-colors"
            >
              게임 등록 관리
            </a>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-steam-text-muted hover:text-red-400 hover:bg-steam-card-hover transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
