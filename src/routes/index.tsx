import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import boutiqueInterior from "@/assets/chi-era-boutique-interior.jpg";
import brandLogo from "@/assets/instagram/chi-era-profile-logo.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/store/site";
import { ProductGrid } from "@/components/store/product-grid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chi-Era Activewear — Where Power Meets Elegance" },
      {
        name: "description",
        content:
          "Discover Chi-Era Activewear: a refined edit of women's activewear, where power meets elegance.",
      },
      { property: "og:title", content: "Chi-Era Activewear — Where Power Meets Elegance" },
      {
        property: "og:description",
        content:
          "Discover Chi-Era Activewear: a refined edit of women's activewear, where power meets elegance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const instagram = "https://www.instagram.com/chiera.active/";

function HomePage() {
  const [doorsOpening, setDoorsOpening] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);
  const [loadingHome, setLoadingHome] = useState(false);
  const collectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!doorsOpening) return;
    const timeout = window.setTimeout(() => {
      setDoorsOpening(false);
      setDoorOpened(true);
    }, 1800);
    return () => window.clearTimeout(timeout);
  }, [doorsOpening]);

  useEffect(() => {
    if (!loadingHome) return;
    const timeout = window.setTimeout(() => {
      setLoadingHome(false);
      setDoorOpened(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1150);
    return () => window.clearTimeout(timeout);
  }, [loadingHome]);

  const enterBoutique = () => {
    if (!doorsOpening && !doorOpened) setDoorsOpening(true);
    else if (doorOpened) collectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      {loadingHome && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          role="status"
          aria-label="Returning to home"
        >
          <img
            src={brandLogo}
            alt="Chi-Era"
            width={92}
            height={92}
            className="size-24 rounded-full object-cover animate-logo-pulse"
          />
          <span className="text-xs uppercase tracking-[0.32em] text-primary">
            Chi-Era Activewear
          </span>
        </div>
      )}

      <SiteHeader onHome={() => setLoadingHome(true)} />

      <section
        aria-label="Welcome to Chi-Era Activewear"
        className={`hero-storefront ${doorOpened ? "hero-storefront-open" : ""} relative isolate min-h-[680px] overflow-hidden sm:min-h-[760px] lg:min-h-[min(820px,calc(100svh-80px))]`}
      >
        <img
          src={boutiqueInterior}
          alt="A sunlit Chi-Era-inspired activewear boutique"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-center"
        />
        <div
          className={`hero-image-overlay absolute inset-0 -z-10 ${doorOpened ? "hero-image-overlay-open" : ""}`}
        />
        <div className="absolute inset-0 z-0 flex" aria-hidden="true">
          <div
            className={`door-panel relative h-full w-1/2 origin-left border-r border-primary/35 ${doorsOpening ? "animate-door-left" : doorOpened ? "hidden" : ""}`}
          >
            <span className="boutique-handle boutique-handle-right">
              <span className="boutique-handle-pull" />
              <span className="boutique-handle-keyhole" />
            </span>
          </div>
          <div
            className={`door-panel relative h-full w-1/2 origin-right border-l border-primary/35 ${doorsOpening ? "animate-door-right" : doorOpened ? "hidden" : ""}`}
          >
            <span className="boutique-handle boutique-handle-left">
              <span className="boutique-handle-pull" />
              <span className="boutique-handle-keyhole" />
            </span>
          </div>
        </div>
        <div className="relative z-10 flex min-h-[680px] flex-col items-center justify-center px-6 py-24 text-center sm:min-h-[760px] lg:min-h-[min(820px,calc(100svh-80px))]">
          {doorOpened && (
            <p className="mb-6 animate-rise text-[10px] uppercase tracking-[0.38em] text-primary sm:text-xs">
              Where power meets elegance
            </p>
          )}
          <h1
            className={`animate-rise font-display font-normal leading-[0.92] text-foreground ${doorOpened ? "text-6xl sm:text-8xl lg:text-9xl" : "absolute inset-x-6 bottom-[calc(50%+72px)] text-5xl sm:text-6xl"}`}
            style={{ animationDelay: "100ms" }}
          >
            Chi-Era<span className="block italic text-gold">Activewear</span>
          </h1>
          {doorOpened && (
            <p
              className="mt-7 max-w-md animate-rise text-sm font-light leading-7 text-foreground/90 sm:text-base"
              style={{ animationDelay: "200ms" }}
            >
              Strength in every silhouette. Elegance in every move.
            </p>
          )}
          <Button
            onClick={enterBoutique}
            disabled={doorsOpening}
            variant="outline"
            className={`${doorOpened ? "mt-10" : "absolute left-1/2 top-[calc(50%+72px)] -translate-x-1/2"} h-12 gap-4 border-primary/80 bg-background/85 px-7 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground`}
          >
            {doorsOpening
              ? "Welcome inside"
              : doorOpened
                ? "Explore the collection"
                : "Enter the boutique"}
            {doorOpened ? <ArrowDown className="size-4" /> : <ArrowRight className="size-4" />}
          </Button>
          {doorOpened && (
            <div className="absolute bottom-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-foreground/70 sm:bottom-9">
              <span className="h-px w-8 bg-primary" />A considered kind of movement
              <span className="h-px w-8 bg-primary" />
            </div>
          )}
        </div>
      </section>

      {doorOpened && (
        <>
          <section
            id="collection"
            ref={collectionRef}
            className="scroll-mt-8 px-5 py-20 sm:px-10 sm:py-28 lg:px-16"
            aria-labelledby="collection-heading"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary">
                    The Chi-Era edit
                  </p>
                  <h2
                    id="collection-heading"
                    className="font-display text-5xl font-normal sm:text-6xl"
                  >
                    Move with <span className="italic text-gold">intention.</span>
                  </h2>
                </div>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 pb-1 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
                >
                  Follow the collection{" "}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <ProductGrid />
            </div>
          </section>

          <section
            id="story"
            className="border-y border-primary/20 bg-card/50 px-5 py-20 text-center sm:py-28"
            aria-labelledby="story-heading"
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-primary">
              Chi-Era Activewear
            </p>
            <h2
              id="story-heading"
              className="mx-auto max-w-3xl font-display text-5xl font-normal leading-tight sm:text-7xl"
            >
              Where power meets <span className="italic text-gold">elegance.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-7 text-muted-foreground">
              A thoughtful wardrobe for the way you move — from the studio and beyond.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 h-11 gap-3 border-primary/60 bg-transparent px-6 text-xs uppercase tracking-[0.18em] text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <a href={instagram} target="_blank" rel="noreferrer">
                Discover Chi-Era on Instagram <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </section>

          <SiteFooter />
        </>
      )}
    </main>
  );
}
