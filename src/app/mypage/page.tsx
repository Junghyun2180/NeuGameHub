import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import GameCard from "@/components/game/GameCard";
import PasswordChangeForm from "@/components/mypage/PasswordChangeForm";

export default async function MyPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
  });

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      game: {
        include: {
          genre: { select: { name: true } },
          aiTool: { select: { name: true } },
        },
      },
    },
  });

  const favoriteGameIds = favorites.map((f) => f.game.id);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      {/* User Info */}
      <div className="bg-steam-card border border-steam-border rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-steam-blue/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-steam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-steam-text">{dbUser?.username}</h1>
            <p className="text-sm text-steam-text-muted">{dbUser?.email}</p>
            <p className="text-xs text-steam-text-muted mt-1">
              가입일: {dbUser?.createdAt.toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
        <PasswordChangeForm />
      </div>

      {/* Favorite Games */}
      <h2 className="text-xl font-bold text-steam-text mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        즐겨찾기 ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-steam-card border border-steam-border rounded-lg">
          <svg className="w-12 h-12 text-steam-text-muted/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-steam-text-muted">아직 즐겨찾기한 게임이 없습니다</p>
          <p className="text-sm text-steam-text-muted/60 mt-1">게임 카드의 하트 버튼을 눌러 즐겨찾기에 추가하세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((fav) => (
            <GameCard
              key={fav.game.id}
              game={fav.game}
              favoriteGameIds={favoriteGameIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}
