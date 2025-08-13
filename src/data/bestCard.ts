import type { ProductCard } from "../types/productCard";

export const BEST_PRODUCTS_MOCK: ProductCard[] = [
  {
    id: 1,
    title: "The north coat",
    image: "src/assets/BestCard/coat.png",
    oldPrice: 360,
    newPrice: 260,
    rating: 5,
    reviews: 88,
  },
  {
    id: 2,
    title: "Gucci duffle bag",
    image: "src/assets/BestCard/bag.png",
    oldPrice: 1160,
    newPrice: 960,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    title: "RGB liquid CPU Cooler",
    image: "src/assets/BestCard/cooler.png",
    oldPrice: 170,
    newPrice: 160,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    title: "Small BookSelf",
    image: "src/assets/BestCard/bookself.png",
    newPrice: 380,
    rating: 4.5,
    reviews: 99,
  },
];
