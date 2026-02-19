import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-steam-dark border-t border-steam-border mt-12">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Logo size={32} />
              <span className="text-lg font-bold text-steam-text">
                NeuGameHub
              </span>
            </div>
            <p className="text-steam-text-muted text-sm leading-relaxed">
              AI로 만든 게임들을 한 곳에서 발견하고 플레이하세요. 다양한 AI
              도구로 제작된 게임들의 허브입니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-steam-text font-semibold mb-3 text-sm uppercase tracking-wider">
              탐색
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-steam-text-muted hover:text-steam-blue text-sm transition-colors"
                >
                  오늘의 게임
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-steam-text-muted hover:text-steam-blue text-sm transition-colors"
                >
                  리더보드
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-steam-text font-semibold mb-3 text-sm uppercase tracking-wider">
              정보
            </h3>
            <p className="text-steam-text-muted text-sm">
              AI 게임 플랫폼 NeuGameHub
            </p>
            <p className="text-steam-text-muted text-sm mt-1">
              Powered by AI
            </p>
          </div>
        </div>

        <div className="border-t border-steam-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-steam-text-muted text-xs">
            &copy; {new Date().getFullYear()} NeuGameHub. All rights reserved.
          </p>
          <p className="text-steam-text-muted text-xs flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-steam-blue"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}
