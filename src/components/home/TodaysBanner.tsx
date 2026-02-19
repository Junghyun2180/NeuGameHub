"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import RatingStars from "@/components/game/RatingStars";

interface BannerGame {
  id: string;
  title: string;
  thumbnail: string | null;
  description: string | null;
  genre: { name: string };
  aiTool: { name: string };
  averageRating: number;
}

interface TodaysBannerProps {
  games: BannerGame[];
}

const BANNER_GRADIENTS = [
  "from-blue-900 via-indigo-900 to-purple-900",
  "from-emerald-900 via-teal-900 to-cyan-900",
  "from-rose-900 via-pink-900 to-fuchsia-900",
  "from-amber-900 via-orange-900 to-red-900",
  "from-violet-900 via-purple-900 to-indigo-900",
  "from-sky-900 via-blue-900 to-indigo-900",
  "from-lime-900 via-green-900 to-emerald-900",
  "from-red-900 via-rose-900 to-pink-900",
];

function getBannerGradient(index: number): string {
  return BANNER_GRADIENTS[index % BANNER_GRADIENTS.length];
}

export default function TodaysBanner({ games }: TodaysBannerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (games.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-steam-text mb-4">오늘의 게임</h2>

      <div className="relative group/banner">
        {/* Carousel viewport */}
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {games.map((game, index) => (
              <div key={game.id} className="flex-[0_0_100%] min-w-0">
                <Link href={`/games/${game.id}`} className="block">
                  <div
                    className={cn(
                      "relative aspect-[21/9] sm:aspect-[21/8] bg-gradient-to-br overflow-hidden",
                      getBannerGradient(index)
                    )}
                  >
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
                      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-steam-blue/30 text-steam-blue font-medium">
                            {game.genre.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 font-medium">
                            {game.aiTool.name}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
                          {game.title}
                        </h3>

                        {/* Description */}
                        {game.description && (
                          <p className="text-white/70 text-sm sm:text-base line-clamp-2 max-w-2xl mb-3">
                            {game.description}
                          </p>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <RatingStars rating={game.averageRating} size="sm" />
                          <span className="text-white/60 text-sm">
                            {game.averageRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Large title in background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-6xl sm:text-8xl font-black whitespace-nowrap select-none pointer-events-none">
                      {game.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Previous button */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity"
          aria-label="이전 게임"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity"
          aria-label="다음 게임"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                selectedIndex === index
                  ? "bg-steam-blue w-6"
                  : "bg-steam-text-muted/40 hover:bg-steam-text-muted/60"
              )}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
