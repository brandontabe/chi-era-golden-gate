import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import { useState } from "react";
import { instagram } from "@/lib/catalog";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact us | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  return (
    <StorePage
      eyebrow="Let's talk"
      title="A little personal attention."
      intro="Questions about a look, sizing, or your next order? Connect directly with Chi-Era."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="store-prose">
          <h2>Find us on Instagram.</h2>
          <p>
            Message @chiera.active for current product information, prices, sizing and order
            enquiries.
          </p>
          <a className="store-button" href={instagram} target="_blank" rel="noreferrer">
            Contact Chi-Era on Instagram ↗
          </a>
          <p>
            For an existing order, include your order reference in your message. Share payment
            details only through a confirmed ordering channel.
          </p>
        </div>
        <form
          className="store-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await navigator.clipboard.writeText(message);
              setStatus(
                "Message copied. Open Instagram and paste it into a message to @chiera.active.",
              );
            } catch {
              setStatus("Please select and copy your message, then paste it into Instagram.");
            }
          }}
        >
          <h2 className="font-display text-3xl">Prepare your enquiry</h2>
          <label htmlFor="contact-message" className="mt-5 block text-sm">
            Your message
          </label>
          <textarea
            id="contact-message"
            required
            maxLength={3000}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="store-input mt-2"
            placeholder="I'd love to know more about…"
          />
          <p className="my-4 text-sm text-muted-foreground">
            Copy your message, then send it directly on Instagram.
          </p>
          <button className="store-button" type="submit">
            Copy enquiry
          </button>
          <p role="status" className="mt-4 text-sm">
            {status}
          </p>
        </form>
      </div>
    </StorePage>
  );
}
