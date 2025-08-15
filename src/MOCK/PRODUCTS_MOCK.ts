import type { ProductCard } from "../types/productCard";

export const PRODUCTS_MOCK: ProductCard[] = [
  {
    id: 1,
    title: "HAVIT HV-G92 Gamepad",
    image: "src/assets/products/card1.png",
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    description:
      "Wired gamepad with responsive sticks, vibration feedback, and comfortable grip for long sessions.",
  },
  {
    id: 2,
    title: "AK-900 wired Keyboard",
    image: "src/assets/products/card2.png",
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    description:
      "Full-size wired keyboard with tactile keys and durable build—ideal for work or gaming.",
  },
  {
    id: 3,
    title: "IPS LCD Gaming Monitor",
    image: "src/assets/products/card3.png",
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    description:
      '27" IPS display with vivid colors and fast response—smooth visuals for games and media.',
  },
  {
    id: 4,
    title: "S-Series Comfort Chair",
    image: "src/assets/products/card4.png",
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
    description:
      "Ergonomic office chair with breathable backrest and adjustable support for all-day comfort.",
  },
  {
    id: 5,
    title: "S-Series Comfort Chair",
    image: "src/assets/products/card4.png",
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
    description:
      "Premium padded chair with lumbar support and smooth casters—built for productivity.",
  },
].map((product) => {
  const hasDiscount = typeof product.discount === "number";
  const newPrice = hasDiscount
    ? Math.round(
        product.oldPrice -
          (product.oldPrice * (product.discount as number)) / 100
      )
    : product.oldPrice;

  return {
    ...product,
    newPrice,
  };
});
