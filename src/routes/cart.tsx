import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { products, instagram } from "@/lib/catalog";
import { useCart } from "@/components/store/cart-context";
export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping cart | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  const { items, setQuantity, ready } = useCart();
  const [status, setStatus] = useState("");
  const summary = [
    "Hello Chi-Era, I would like to enquire about:",
    ...items.map((i) => {
      const p = products.find((p) => p.id === i.id)!;
      return `${i.quantity} × ${p.name} — ${p.href}`;
    }),
    "Please confirm prices, available sizes/colours, and delivery.",
  ].join("\n");
  return (
    <StorePage
      eyebrow="Your selection"
      title="The shopping bag."
      intro="A few favourites, ready for a conversation."
    >
      {!ready ? (
        <p role="status">Loading your bag…</p>
      ) : !items.length ? (
        <div className="store-panel text-center">
          <ShoppingBag className="mx-auto mb-5 text-primary" size={40} />
          <h2 className="font-display text-3xl">Your bag is waiting.</h2>
          <p className="my-5 text-muted-foreground">
            Discover the edit and save the looks you love.
          </p>
          <Link to="/shop" className="store-button">
            Explore the collection
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {items.map((i) => {
              const p = products.find((p) => p.id === i.id)!;
              return (
                <article key={i.id} className="flex gap-5 border-b border-border py-6 first:pt-0">
                  <img src={p.image} alt={p.name} className="h-36 w-24 object-cover" />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl">{p.name}</h2>
                    <p className="my-2 text-sm text-muted-foreground">Price & sizing on enquiry</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="text-sm" htmlFor={i.id}>
                        Quantity
                      </label>
                      <select
                        id={i.id}
                        value={i.quantity}
                        onChange={(e) => setQuantity(i.id, Number(e.target.value))}
                        className="store-input w-20"
                      >
                        {Array.from({ length: 99 }, (_, n) => (
                          <option key={n + 1}>{n + 1}</option>
                        ))}
                      </select>
                      <button
                        className="store-text-link text-sm"
                        onClick={() => setQuantity(i.id, 0)}
                        aria-label={`Remove ${p.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
            <Link to="/shop" className="store-text-link mt-6 inline-block">
              ← Continue shopping
            </Link>
          </div>
          <aside className="store-panel">
            <h2 className="font-display text-3xl">Your next step</h2>
            <Link to="/checkout" className="store-button mt-5 w-full">
              Try demo checkout
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Test the checkout experience. No payment or real order.
            </p>
            <p className="my-4 text-sm leading-6 text-muted-foreground">
              Copy your selection and send it to Chi-Era on Instagram to confirm pricing, sizing and
              delivery. Your enquiry does not reserve stock or place an order.
            </p>
            <label htmlFor="order-summary" className="text-sm">
              Your enquiry summary
            </label>
            <textarea
              id="order-summary"
              readOnly
              value={summary}
              rows={8}
              className="store-input mt-2 text-sm"
            />
            <button
              className="store-button mt-4 w-full"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                  setStatus(
                    "Copied. Paste your selection into an Instagram message to @chiera.active.",
                  );
                } catch {
                  setStatus("Select and copy the summary above, then paste it into Instagram.");
                }
              }}
            >
              Copy enquiry
            </button>
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="store-button-secondary mt-3 w-full"
            >
              Open Instagram ↗
            </a>
            <p role="status" className="mt-4 text-sm">
              {status}
            </p>
          </aside>
        </div>
      )}
    </StorePage>
  );
}
