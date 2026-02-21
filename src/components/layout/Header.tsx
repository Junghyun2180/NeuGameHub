import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Logo from "@/components/Logo";
import UserMenu from "@/components/layout/UserMenu";
import { getCurrentUser } from "@/lib/auth";

async function getNavData() {
  const [genres, aiTools] = await Promise.all([
    prisma.genre.findMany({ orderBy: { name: "asc" } }),
    prisma.aiTool.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { genres, aiTools };
}

export default async function Header() {
  const { genres, aiTools } = await getNavData();
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-steam-dark border-b border-steam-border/50 shadow-lg shadow-black/20">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
          >
            <Logo size={32} />
            <span className="text-xl font-bold text-steam-blue group-hover:text-steam-highlight transition-colors hidden sm:block">
              NeuGameHub
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {/* Genre dropdown */}
            <div className="relative group/genre">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm text-steam-text-muted hover:text-steam-text transition-colors rounded hover:bg-steam-card/50"
              >
                <span>장르</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover/genre:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown panel */}
              <div className="absolute top-full left-0 pt-1 invisible group-hover/genre:visible opacity-0 group-hover/genre:opacity-100 transition-all duration-150">
                <div className="bg-steam-card border border-steam-border rounded-lg shadow-xl shadow-black/40 py-2 min-w-[180px]">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/category/${genre.slug}`}
                      className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Tools dropdown */}
            <div className="relative group/ai">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm text-steam-text-muted hover:text-steam-text transition-colors rounded hover:bg-steam-card/50"
              >
                <span>AI 도구</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover/ai:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-1 invisible group-hover/ai:visible opacity-0 group-hover/ai:opacity-100 transition-all duration-150">
                <div className="bg-steam-card border border-steam-border rounded-lg shadow-xl shadow-black/40 py-2 min-w-[180px]">
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/ai-tool/${tool.slug}`}
                      className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Leaderboard link */}
            <Link
              href="/leaderboard"
              className="px-3 py-2 text-sm text-steam-text-muted hover:text-steam-text transition-colors rounded hover:bg-steam-card/50"
            >
              리더보드
            </Link>

            {/* Submit game link */}
            <Link
              href="/submit"
              className="px-3 py-2 text-sm text-steam-blue hover:text-steam-highlight transition-colors rounded hover:bg-steam-card/50 font-medium"
            >
              게임 등록
            </Link>
          </nav>

          {/* Search bar */}
          <form
            action="/search"
            method="GET"
            className="flex items-center ml-auto md:ml-6"
          >
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="게임 검색..."
                className="w-40 lg:w-56 h-8 pl-3 pr-8 text-sm rounded bg-steam-bg border border-steam-border text-steam-text placeholder:text-steam-text-muted/60 focus:outline-none focus:border-steam-blue focus:ring-1 focus:ring-steam-blue/30 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center text-steam-text-muted hover:text-steam-blue transition-colors"
                aria-label="검색"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* User area - Desktop */}
          <div className="hidden md:flex items-center ml-3">
            {user ? (
              <UserMenu username={user.username} role={user.role} />
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm bg-steam-blue hover:bg-steam-highlight text-steam-dark font-medium rounded transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-3">
            <details className="relative">
              <summary className="list-none cursor-pointer p-2 text-steam-text-muted hover:text-steam-text transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <div className="absolute right-0 top-full mt-1 bg-steam-card border border-steam-border rounded-lg shadow-xl shadow-black/40 py-2 min-w-[200px] z-50">
                {/* Mobile user info */}
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-steam-text font-medium border-b border-steam-border mb-1">
                      {user.username}
                      {user.role === "admin" && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-yellow-600/30 text-yellow-300 rounded font-medium">
                          관리자
                        </span>
                      )}
                    </div>
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                    >
                      마이페이지
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin/submissions"
                        className="block px-4 py-2 text-sm text-yellow-300 hover:text-yellow-200 hover:bg-steam-card-hover transition-colors"
                      >
                        게임 등록 관리
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-steam-blue hover:text-steam-highlight hover:bg-steam-card-hover transition-colors font-medium"
                  >
                    로그인
                  </Link>
                )}
                <div className="border-t border-steam-border my-1" />
                <div className="px-4 py-2 text-xs text-steam-text-muted uppercase tracking-wider font-semibold">
                  장르
                </div>
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/category/${genre.slug}`}
                    className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
                <div className="border-t border-steam-border my-1" />
                <div className="px-4 py-2 text-xs text-steam-text-muted uppercase tracking-wider font-semibold">
                  AI 도구
                </div>
                {aiTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/ai-tool/${tool.slug}`}
                    className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
                <div className="border-t border-steam-border my-1" />
                <Link
                  href="/leaderboard"
                  className="block px-4 py-2 text-sm text-steam-text-muted hover:text-steam-text hover:bg-steam-card-hover transition-colors"
                >
                  리더보드
                </Link>
                <Link
                  href="/submit"
                  className="block px-4 py-2 text-sm text-steam-blue hover:text-steam-highlight hover:bg-steam-card-hover transition-colors font-medium"
                >
                  게임 등록
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
