export type ProductCard = {
  id: number;
  title: string;
  image: string;
  oldPrice?: number;
  newPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  colors?: string[];
  description?: string;
};
