import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/productCard";
import {
  CartContext,
  type CartContextValue,
  type CartItem,
} from "./cart-context";
import { useUser } from "./useUser";

type ProductInput =
  | Product
  | { id: string | number; title: string; price: number; image: string };

function normalizeId(id: string | number): string {
  return String(id);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const uid = user?.id;
      if (uid) {
        const key = `cart_items_${uid}`;
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw) as CartItem[];
        // migrate from legacy global key if present
        const legacy = localStorage.getItem("cart_items");
        if (legacy) return JSON.parse(legacy) as CartItem[];
      }
    } catch {}
    return [];
  });

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, it) => acc + it.quantity, 0);
    const subtotal = items.reduce((acc, it) => acc + it.quantity * it.price, 0);
    return {
      items,
      count,
      subtotal,
      addItem: (p: ProductInput, qty = 1) => {
        const id = normalizeId(p.id);
        setItems((prev) => {
          const existing = prev.find((x) => x.id === id);
          if (existing) {
            return prev.map((x) =>
              x.id === id ? { ...x, quantity: x.quantity + qty } : x
            );
          }
          return [
            ...prev,
            {
              id,
              title: p.title,
              price: p.price,
              image: p.image,
              quantity: qty,
            },
          ];
        });
      },
      updateQty: (id, qty) => {
        const key = normalizeId(id);
        setItems((prev) =>
          prev.map((x) =>
            x.id === key ? { ...x, quantity: Math.max(1, qty) } : x
          )
        );
      },
      removeItem: (id) => {
        const key = normalizeId(id);
        setItems((prev) => prev.filter((x) => x.id !== key));
      },
      clear: () => setItems([]),
    };
  }, [items]);

  // Load cart when the logged-in user changes
  useEffect(() => {
    const uid = user?.id;
    if (!uid) return; // don't overwrite on logout; keep in-memory until unmount
    try {
      const key = `cart_items_${uid}`;
      let raw = localStorage.getItem(key);
      if (!raw) {
        // migrate from legacy global key once
        const legacy = localStorage.getItem("cart_items");
        if (legacy) {
          localStorage.setItem(key, legacy);
          localStorage.removeItem("cart_items");
          raw = legacy;
        }
      }
      setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
    } catch {
      setItems([]);
    }
  }, [user?.id]);

  // Persist cart for the current user whenever items change
  useEffect(() => {
    const uid = user?.id;
    if (!uid) return;
    try {
      localStorage.setItem(`cart_items_${uid}`, JSON.stringify(items));
    } catch {}
  }, [items, user?.id]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
