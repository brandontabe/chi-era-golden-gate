import { animateAddToCart } from "@/lib/cart-animation";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { useCart } from "./cart-context";
export function ProductGrid() {
  const { add, ready } = useCart();
  const [added, setAdded] = useState("");
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Select your favourites. Confirm prices, sizes and availability with Chi-Era.
        </p>
        <Link to="/cart" className="store-text-link">
          View your bag →
        </Link>
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.id}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name}, view on Instagram`}
            >
              <img
                src={p.image}
                alt={p.name + " by Chi-Era Activewear"}
                className="aspect-[4/5] w-full object-cover"
              />
            </a>
            <div className="py-4">
              <p className="store-eyebrow">{p.note}</p>
              <h2 className="mt-2 font-display text-3xl">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Price & availability on enquiry</p>
            </div>
            <button
              disabled={!ready}
              className="store-button w-full"
              onClick={(event) => {
                add(p.id);
                animateAddToCart(event.currentTarget, p.image);
                setAdded(p.name);
              }}
            >
              Add to bag
            </button>
          </article>
        ))}
      </div>
      <p role="status" className="mt-6 text-sm text-primary">
        {added ? `${added} added to your bag.` : ""}
      </p>
    </>
  );
}
