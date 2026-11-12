import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ | Chi-Era Activewear" }] }),
  component: Page,
});
const questions = [
  [
    "How do I enquire about an item?",
    "Add your favourites to your bag, copy the enquiry summary and send it to @chiera.active on Instagram. The brand can confirm the details before you order.",
  ],
  [
    "Where can I find prices and available sizes?",
    "Contact Chi-Era through Instagram with the name or post link of the item you like. Confirm the current price, available sizes and colours before ordering.",
  ],
  [
    "Can I pay through this website?",
    "You can try our demo checkout, which simulates an order without taking payment or sending an order to Chi-Era. For a real purchase, confirm your selection and arrange your order directly with the brand.",
  ],
  [
    "How do I confirm delivery and returns?",
    "Ask Chi-Era to confirm delivery areas, costs, times and return or exchange terms before you complete your purchase.",
  ],
  [
    "Will my bag be saved?",
    "Your bag is saved in this browser when local storage is available. It is not shared between devices.",
  ],
  [
    "Where can I see more of the collection?",
    "Visit @chiera.active on Instagram to explore the brand’s latest posts and contact the team.",
  ],
];
function Page() {
  return (
    <StorePage
      eyebrow="Here to help"
      title="A few things to know."
      intro="Your guide to exploring the edit and getting in touch."
    >
      <div className="mx-auto max-w-3xl">
        {questions.map(([q, a]) => (
          <details key={q} className="border-b border-border py-6">
            <summary className="cursor-pointer pr-5 font-display text-2xl">{q}</summary>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{a}</p>
          </details>
        ))}
        <Link to="/contact" className="store-button mt-10">
          Still have a question?
        </Link>
      </div>
    </StorePage>
  );
}
