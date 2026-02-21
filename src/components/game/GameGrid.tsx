import GameCard from "./GameCard";

interface GameGridProps {
  games: Array<{
    id: string;
    title: string;
    thumbnail: string | null;
    averageRating: number;
    totalPlayers: number;
    genre: { name: string };
    aiTool: { name: string };
  }>;
  title?: string;
  favoriteGameIds?: string[];
}

export default function GameGrid({ games, title, favoriteGameIds }: GameGridProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-steam-text mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} favoriteGameIds={favoriteGameIds} />
        ))}
      </div>
    </section>
  );
}
