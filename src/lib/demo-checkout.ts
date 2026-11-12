import { products } from "./catalog";
export async function placeDemoOrder(items: { id: string; quantity: number }[]) {
  if (
    !items.length ||
    items.some(
      (i) =>
        !products.some((p) => p.id === i.id) ||
        !Number.isInteger(i.quantity) ||
        i.quantity < 1 ||
        i.quantity > 99,
    )
  ) {
    throw new Error("Please check the items in your bag.");
  }
  // Local simulation only: no customer details, payment, or order leaves the browser.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true as const, id: `DEMO-${Date.now().toString(36).toUpperCase()}` };
}
