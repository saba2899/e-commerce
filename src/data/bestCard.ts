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
    isNew: false,
    colors: ["#2F4F4F", "#000000", "#8B4513"],
    description:
      "Insulated north-style coat built for harsh winters with a windproof shell and soft lining for everyday warmth.",
  },
  {
    id: 2,
    title: "Gucci duffle bag",
    image: "src/assets/BestCard/bag.png",
    oldPrice: 1160,
    newPrice: 960,
    rating: 4,
    reviews: 75,
    isNew: false,
    colors: ["#8B4513", "#000000"],
    description:
      "Premium duffle bag inspired by Gucci aesthetics—roomy main compartment and durable finish for travel or gym.",
  },
  {
    id: 3,
    title: "RGB liquid CPU Cooler",
    image: "src/assets/BestCard/cooler.png",
    oldPrice: 170,
    newPrice: 160,
    rating: 5,
    reviews: 99,
    isNew: false,
    colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"],
    description:
      "All-in-one RGB liquid cooler that keeps your CPU stable and quiet under heavy loads.",
  },
  {
    id: 4,
    title: "Small BookSelf",
    image: "src/assets/BestCard/bookself.png",
    oldPrice: 380,
    newPrice: 260,
    rating: 4.5,
    reviews: 99,
    isNew: false,
    colors: ["#8B4513", "#000000"],
    description:
      "Compact, minimalist bookshelf for organizing and displaying your favorite reads and décor.",
  },
];
