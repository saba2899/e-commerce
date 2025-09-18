import { createContext, useContext } from "react";

export type FavoriteId = string;

export type FavoritesContextValue = {
  favorites: Set<FavoriteId>;
  count: number | undefined;
  isFavorite: (id: FavoriteId | number) => boolean;
  toggleFavorite: (id: FavoriteId | number) => void;
  addFavorite: (id: FavoriteId | number) => void;
  removeFavorite: (id: FavoriteId | number) => void;
};

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
