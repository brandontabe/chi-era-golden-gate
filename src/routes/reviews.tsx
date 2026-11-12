import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import image from "@/assets/instagram/look-03.jpg";
import { instagram } from "@/lib/catalog";
export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  return (
    <StorePage
      eyebrow="The Chi-Era community"
      title="Your movement. Your story."
      intro="We'd love to hear how you wear Chi-Era."
    >
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src={image}
          alt="Chi-Era activewear community look"
          className="max-h-[600px] w-full object-cover"
        />
        <div className="store-prose">
          <h2>Be part of the conversation.</h2>
          <p>
            Customer reviews will appear here as they become available. In the meantime, explore the
            brand's posts and join the conversation on Instagram.
          </p>
          <a className="store-button" href={instagram} target="_blank" rel="noreferrer">
            Share your experience ↗
          </a>
          <p>
            Already wearing Chi-Era? Send the brand your feedback and your favourite look through
            @chiera.active.
          </p>
        </div>
      </div>
    </StorePage>
  );
}
