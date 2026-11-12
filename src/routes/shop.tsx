import { createFileRoute } from "@tanstack/react-router";
import { StorePage } from "@/components/store/site";
import { ProductGrid } from "@/components/store/product-grid";
export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop | Chi-Era Activewear" }] }),
  component: Page,
});
function Page() {
  return (
    <StorePage
      eyebrow="The Chi-Era edit"
      title="Find your next favourite."
      intro="Activewear for the studio, the everyday, and everything in between."
    >
      <ProductGrid />
    </StorePage>
  );
}
