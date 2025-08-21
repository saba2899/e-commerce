import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
  rating: number;
  size?: "sm" | "md";
};

export function StarRating({ rating, size = "sm" }: Props) {
  const maxStars = 5;
  const sizeClass = size === "sm" ? "text-base" : "text-xl";

  return (
    <div className={`flex text-yellow-400 ${sizeClass} gap-0.5`}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const fullStars = Math.floor(rating);
        const isHalf = rating % 1 !== 0 && index === fullStars;

        if (index < fullStars) return <FaStar key={index} />;
        if (isHalf) return <FaStarHalfAlt key={index} />;
        return <FaRegStar key={index} />;
      })}
    </div>
  );
}
