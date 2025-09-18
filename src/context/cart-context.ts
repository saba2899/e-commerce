import { createContext, useContext } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  count: number | undefined;
  subtotal: number;
  addItem: (p: any, qty?: number) => void;
  updateQty: (id: string | number, qty: number) => void;
  removeItem: (id: string | number) => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
