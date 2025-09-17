import { useMemo, useState, useEffect, type ReactNode } from "react";
import {
  FavoritesContext,
  type FavoriteId,
  type FavoritesContextValue,
} from "./favorites-context";
import { useUser } from "./useUser";

function normalizeId(id: FavoriteId | number): FavoriteId {
  return String(id);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Set<FavoriteId>>(() => {
    try {
      const uid = user?.id;
      if (uid) {
        const key = `favorites_ids_${uid}`;
        const raw = localStorage.getItem(key);
        if (raw) return new Set((JSON.parse(raw) as string[]) ?? []);
        // legacy migration fallback
        const legacy = localStorage.getItem('favorites_ids');
        if (legacy) return new Set((JSON.parse(legacy) as string[]) ?? []);
      }
    } catch {}
    return new Set();
  });

  // Load favorites from localStorage when the logged-in user changes
  useEffect(() => {
    const key = user ? `favorites_ids_${user.id}` : null;
    if (!key) {
      // User not resolved or logged out; keep current state to avoid flicker.
      return;
    }
    try {
      let raw = localStorage.getItem(key);
      if (!raw) {
        // Migrate from legacy key if present
        const legacy = localStorage.getItem('favorites_ids');
        if (legacy) {
          localStorage.setItem(key, legacy);
          localStorage.removeItem('favorites_ids');
          raw = legacy;
        }
      }
      if (!raw) {
        setFavorites(new Set());
        return;
      }
      const arr = JSON.parse(raw) as string[];
      setFavorites(new Set(arr));
    } catch {
      setFavorites(new Set());
    }
  }, [user?.id]);

  // Persist favorites whenever they change for the current user
  useEffect(() => {
    if (!user) return;
    const key = `favorites_ids_${user.id}`;
    try {
      const arr = Array.from(favorites);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {
      // ignore storage errors
    }
  }, [favorites, user?.id]);

  // Clear favorites immediately when requested (e.g., on logout)
  useEffect(() => {
    const handler = () => setFavorites(new Set());
    window.addEventListener('favoritesReset', handler);
    return () => window.removeEventListener('favoritesReset', handler);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      count: favorites.size,
      isFavorite: (id) => favorites.has(normalizeId(id)),
      toggleFavorite: (id) => {
        const key = normalizeId(id);
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        });
      },
      addFavorite: (id) => {
        const key = normalizeId(id);
        setFavorites((prev) => {
          if (prev.has(key)) return prev;
          const next = new Set(prev);
          next.add(key);
          return next;
        });
      },
      removeFavorite: (id) => {
        const key = normalizeId(id);
        setFavorites((prev) => {
          if (!prev.has(key)) return prev;
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// This file only exports the provider component to keep fast-refresh happy.
