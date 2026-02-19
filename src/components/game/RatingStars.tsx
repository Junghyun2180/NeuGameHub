"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  interactive?: boolean;
  onRate?: (score: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({
  rating,
  interactive = false,
  onRate,
  size = "md",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const displayRating = hoverRating > 0 ? hoverRating : rating;

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (starIndex: number) => {
    if (interactive && onRate) {
      onRate(starIndex);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillPercentage = Math.min(
          100,
          Math.max(0, (displayRating - (starIndex - 1)) * 100)
        );

        return (
          <button
            key={starIndex}
            type="button"
            disabled={!interactive}
            className={cn(
              "relative",
              sizeClasses[size],
              interactive && "cursor-pointer hover:scale-110 transition-transform",
              !interactive && "cursor-default"
            )}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => interactive && setHoverRating(starIndex)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            aria-label={`${starIndex} star${starIndex !== 1 ? "s" : ""}`}
          >
            {/* Empty star background */}
            <svg
              className={cn(sizeClasses[size], "absolute inset-0")}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#4a5568"
              />
            </svg>
            {/* Filled star overlay */}
            {fillPercentage > 0 && (
              <svg
                className={cn(sizeClasses[size], "absolute inset-0")}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id={`star-clip-${starIndex}-${Math.round(rating * 100)}`}>
                    <rect
                      x="0"
                      y="0"
                      width={`${(fillPercentage / 100) * 24}`}
                      height="24"
                    />
                  </clipPath>
                </defs>
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#fbbf24"
                  clipPath={`url(#star-clip-${starIndex}-${Math.round(rating * 100)})`}
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
