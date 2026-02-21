import Link from "next/link";
import GameCard from "./GameCard";

interface GenreRowProps {
  genre: {
    name: string;
    slug: string;
  };
  games: Array<{
    id: string;
    title: string;
    thumbnail: string;
    averageRating: number;
    totalPlayers: number;
    genre: { name: string };
    aiTool: { name: string };
  }>;
  favoriteGameIds?: string[];
}

export default function GenreRow({ genre, games, favoriteGameIds }: GenreRowProps) {
  if (games.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-steam-text">{genre.name}</h2>
        <Link
          href={`/category/${genre.slug}`}
          className="text-sm text-steam-blue hover:text-steam-highlight transition-colors"
        >
          더보기 &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} favoriteGameIds={favoriteGameIds} />
        ))}
      </div>
    </section>
  );
}
