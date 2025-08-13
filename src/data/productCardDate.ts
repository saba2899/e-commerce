import type { ProductCard } from "../types/productCard";

export const PRODUCTS_MOCK: ProductCard[] = [
  {
    id: 1,
    title: "HAVIT HV-G92 Gamepad",
    image: "src//assets/products/card1.png",
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
  },
  {
    id: 2,
    title: "AK-900 Wired Keyboard",
    image: "src/assets/products/card2.png",
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    title: "IPS LCD Gaming Monitor",
    image: "src/assets/products/card3.png",
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    title: "S-Series Comfort Chair",
    image: "src/assets/products/card4.png",
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 5,
    title: "S-Series Comfort Chair",
    image: "src/assets/products/card4.png",
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
].map((product) => {
  const hasDiscount = typeof product.discount === "number";

  const newPrice = hasDiscount
    ? Math.round(product.oldPrice - (product.oldPrice * product.discount) / 100)
    : product.oldPrice;

  return {
    ...product,
    newPrice,
  };
});
