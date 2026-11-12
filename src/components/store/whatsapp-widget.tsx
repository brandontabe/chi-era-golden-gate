import { X } from "lucide-react";

export function WhatsAppWidget() {
  return (
    <>
      <div
        id="whatsapp-panel"
        popover="auto"
        role="dialog"
        aria-labelledby="whatsapp-heading"
        className="whatsapp-panel rounded-xl border border-border bg-background p-5 text-foreground shadow-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="whatsapp-heading" className="font-display text-2xl">
            Chat with Chi-Era
          </h2>
          <button
            type="button"
            popoverTarget="whatsapp-panel"
            popoverTargetAction="hide"
            aria-label="Close WhatsApp panel"
            className="store-icon shrink-0"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          WhatsApp is coming soon. Our chat number will be available here once it’s ready.
        </p>
      </div>
      <button
        type="button"
        popoverTarget="whatsapp-panel"
        aria-label="WhatsApp — coming soon"
        className="whatsapp-widget fixed z-50 flex size-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 motion-reduce:transition-none"
      >
        <svg viewBox="0 0 32 32" fill="none" className="size-8" aria-hidden="true">
          <path
            d="M27 15.5a11 11 0 0 1-16.4 9.6L5 26.5l1.5-5.4A11 11 0 1 1 27 15.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="m12 9.5 1.7 3-1.2 1.5c1 2 2.4 3.4 4.5 4.4l1.5-1.3 3 1.6c.2 2.2-1.4 3.2-3.3 2.8-5.3-1-9.4-5.3-10-9.2-.3-1.7 1.5-3.4 3.8-2.8Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </>
  );
}
