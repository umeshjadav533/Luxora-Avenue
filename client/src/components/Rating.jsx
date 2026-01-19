import { Star } from "lucide-react";
import React from "react";

const Rating = ({ rating = 0, reviews = [] }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className={`flex items-center gap-1 justify-center rounded-sm p-[2px] transparent`}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-[#00C950] fill-[#00C950]"
          size={15}
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="text-[#00C950]" size={15} />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="text-[#00C950] fill-[#00C950]" size={15} />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-[#00C950]" size={15} />
      ))}

      {rating && (
        <span className="ml-1 text-sm text-[#00C950]">
          {rating.toFixed(1)}
          {reviews.length > 0 && ` (${reviews.length})`}
        </span>
      )}
    </div>
  );
};

export default Rating;
