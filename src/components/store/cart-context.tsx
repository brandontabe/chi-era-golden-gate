import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products } from "@/lib/catalog";
type Item = { id: string; quantity: number };
const CartContext = createContext<{
  items: Item[];
  setQuantity: (id: string, quantity: number) => void;
  add: (id: string) => void;
  ready: boolean;
} | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("chi-era-cart") || "[]");
      if (Array.isArray(saved))
        setItems(
          products.flatMap((p) => {
            const row = saved.find((i: Item) => i?.id === p.id);
            return row && Number.isInteger(row.quantity) && row.quantity > 0
              ? [{ id: p.id, quantity: Math.min(row.quantity, 99) }]
              : [];
          }),
        );
    } catch {
      // Browser storage is optional; keep this visit usable when it is unavailable.
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("chi-era-cart", JSON.stringify(items));
      } catch {
        // Browser storage is optional; keep this visit usable when it is unavailable.
      }
  }, [items, ready]);
  const setQuantity = (id: string, quantity: number) => {
    if (!products.some((p) => p.id === id) || !Number.isFinite(quantity)) return;
    const q = Math.max(0, Math.min(99, Math.floor(quantity)));
    setItems((old) =>
      q
        ? old.some((i) => i.id === id)
          ? old.map((i) => (i.id === id ? { id, quantity: q } : i))
          : [...old, { id, quantity: q }]
        : old.filter((i) => i.id !== id),
    );
  };
  const add = (id: string) => {
    if (!products.some((p) => p.id === id)) return;
    setItems((old) =>
      old.some((i) => i.id === id)
        ? old.map((i) => (i.id === id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i))
        : [...old, { id, quantity: 1 }],
    );
  };
  return (
    <CartContext.Provider value={{ items, setQuantity, add, ready }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart provider missing");
  return value;
}
