import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import portrait from "@/assets/instagram/look-03.jpg";
import { Link } from "@tanstack/react-router";
import { instagram } from "@/lib/catalog";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About us | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  return (
    <StorePage
      eyebrow="Our world"
      title="Power. Poise. Chi-Era."
      intro="Where power meets elegance."
    >
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src={portrait}
          alt="The Chi-Era activewear edit"
          className="max-h-[650px] w-full object-cover"
        />
        <div className="store-prose">
          <h2>Made for your kind of movement.</h2>
          <p>
            Discover Chi-Era Activewear: a considered edit of women's activewear, from coordinated
            sets and signature bras to sculpted silhouettes and flare leggings.
          </p>
          <p>
            Explore the collection through the brand's Instagram imagery, and get in touch with
            Chi-Era for help choosing your next look.
          </p>
          <Link to="/shop" className="store-button">
            Explore the edit
          </Link>
          <a href={instagram} target="_blank" rel="noreferrer" className="store-text-link block">
            Step into our world on Instagram ↗
          </a>
        </div>
      </div>
    </StorePage>
  );
}
