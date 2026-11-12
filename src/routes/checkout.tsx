import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StorePage } from "@/components/store/site";
import { useCart } from "@/components/store/cart-context";
import { products } from "@/lib/catalog";
import { placeDemoOrder } from "@/lib/demo-checkout";
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Demo checkout | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  const { items, setQuantity, ready } = useCart();
  const [order, setOrder] = useState<{ id: string; lines: string[] } | null>(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  return (
    <StorePage
      eyebrow="Try the experience"
      title={order ? "Your demo order is confirmed." : "Demo checkout."}
      intro="This is a test checkout. No payment is collected and no order is sent to Chi-Era."
    >
      {order ? (
        <div className="store-panel mx-auto max-w-2xl">
          <p className="store-eyebrow">Simulation complete</p>
          <h2 className="mt-4 font-display text-3xl">{order.id}</h2>
          <ul className="my-6 space-y-3">
            {order.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            This confirmation is for demonstration only. Nothing has been reserved or purchased.
            Contact Chi-Era to place a real order.
          </p>
          <Link to="/shop" className="store-button">
            Back to the collection
          </Link>
        </div>
      ) : !ready ? (
        <p role="status">Loading your selection…</p>
      ) : !items.length ? (
        <div className="store-panel">
          <p className="mb-5">Add a few favourites to your bag first.</p>
          <Link to="/shop" className="store-button">
            Explore the edit
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-10 md:grid-cols-2">
          <form
            className="store-panel"
            onSubmit={async (e) => {
              e.preventDefault();
              setPlacing(true);
              setError("");
              try {
                const response = await placeDemoOrder(items);
                if (response.ok) {
                  setOrder({
                    id: response.id,
                    lines: items.map(
                      (i) => `${i.quantity} × ${products.find((p) => p.id === i.id)!.name}`,
                    ),
                  });
                  items.forEach((i) => setQuantity(i.id, 0));
                }
              } catch {
                setError("We could not complete the demo. Check your bag and try again.");
              } finally {
                setPlacing(false);
              }
            }}
          >
            <h2 className="font-display text-3xl">Try an order</h2>
            <p className="my-4 text-sm text-muted-foreground">
              Use sample details to try the checkout. These fields are not submitted or saved.
            </p>
            <label htmlFor="demo-name" className="text-sm">
              Name for this demo
            </label>
            <input
              id="demo-name"
              name="demo-name"
              required
              maxLength={100}
              placeholder="Alex Example"
              autoComplete="off"
              className="store-input mb-5 mt-2"
            />
            <label htmlFor="demo-city" className="text-sm">
              Delivery city for this demo
            </label>
            <input
              id="demo-city"
              required
              maxLength={100}
              placeholder="Example city"
              autoComplete="off"
              className="store-input mb-5 mt-2"
            />
            <div className="mb-6 border border-border p-4 text-sm">
              <strong>Demo payment</strong>
              <p className="mt-2 text-muted-foreground">
                Simulated approval. No card or banking details needed.
              </p>
            </div>
            <button disabled={placing} type="submit" className="store-button w-full">
              {placing ? "Simulating…" : "Place demo order"}
            </button>
            <p role="alert" className="mt-4 text-sm">
              {error}
            </p>
          </form>
          <aside className="store-panel">
            <h2 className="font-display text-3xl">Your selection</h2>
            {items.map((i) => {
              const p = products.find((p) => p.id === i.id)!;
              return (
                <div
                  key={i.id}
                  className="mt-5 flex items-center gap-4 border-b border-border pb-5"
                >
                  <img src={p.image} alt={p.name} className="h-20 w-16 object-cover" />
                  <div>
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">Quantity: {i.quantity}</p>
                  </div>
                </div>
              );
            })}
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Product prices and delivery costs require confirmation with Chi-Era. This demo does
              not calculate a payable total.
            </p>
            <Link to="/cart" className="store-text-link mt-4 inline-block">
              Edit bag
            </Link>
          </aside>
        </div>
      )}
    </StorePage>
  );
}
