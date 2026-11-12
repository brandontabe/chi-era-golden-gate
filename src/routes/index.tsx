import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Moon, Sun } from "lucide-react";
import boutiqueInterior from "@/assets/chi-era-boutique-interior.jpg";
import brandLogo from "@/assets/instagram/chi-era-profile-logo.jpg";
import lookOne from "@/assets/instagram/look-01.jpg";
import lookTwo from "@/assets/instagram/look-02.jpg";
import lookThree from "@/assets/instagram/look-03.jpg";
import lookFour from "@/assets/instagram/look-04.jpg";
import lookFive from "@/assets/instagram/look-05.jpg";
import lookSix from "@/assets/instagram/look-06.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chi-Era Activewear — Where Power Meets Elegance" },
      { name: "description", content: "Discover Chi-Era Activewear: a refined edit of women's activewear, where power meets elegance." },
      { property: "og:title", content: "Chi-Era Activewear — Where Power Meets Elegance" },
      { property: "og:description", content: "Discover Chi-Era Activewear: a refined edit of women's activewear, where power meets elegance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const instagram = "https://www.instagram.com/chiera.active/";

const collection = [
  { name: "Essential Flare Set", note: "Burgundy edit", image: lookOne, href: "https://www.instagram.com/chiera.active/p/DcOMqrms2KD/" },
  { name: "Signature Bra", note: "The essentials", image: lookTwo, href: "https://www.instagram.com/chiera.active/p/DbfyeXVMgUE/" },
  { name: "The Chi-Era Woman", note: "Off-duty, elevated", image: lookThree, href: "https://www.instagram.com/chiera.active/p/Daah6QFsfo-/" },
  { name: "Two-Piece Essential", note: "A study in ease", image: lookFour, href: "https://www.instagram.com/chiera.active/p/DaKvqC6lkiG/" },
  { name: "Sculpt Jumpsuit", note: "Form meets function", image: lookFive, href: "https://www.instagram.com/chiera.active/p/DanVA6VMEuW/" },
  { name: "Flare Legging", note: "The everyday edit", image: lookSix, href: "https://www.instagram.com/chiera.active/p/DY9lUFlDBnA/" },
];

function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chi-era-theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
        document.documentElement.classList.toggle("dark", saved === "dark");
      }
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("chi-era-theme", next);
    } catch {
      // Storage is optional for the current visit.
    }
  };

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
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background" role="status" aria-label="Returning to home">
          <img src={brandLogo} alt="Chi-Era" width={92} height={92} className="size-24 rounded-full object-cover animate-logo-pulse" />
          <span className="text-xs uppercase tracking-[0.32em] text-primary">Chi-Era Activewear</span>
        </div>
      )}

      <header className="relative z-20 flex min-h-20 items-center justify-between border-b border-primary/20 px-5 py-4 sm:px-10 lg:px-16">
        <Button variant="ghost" onClick={() => setLoadingHome(true)} aria-label="Home" className="flex h-auto items-center gap-3 p-0 text-xs font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-transparent hover:text-primary">
          <img src={brandLogo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
          <span className="hidden sm:inline">Chi-Era</span>
        </Button>
        <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-9">
          <a href="#collection" className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary">The collection</a>
          <a href="#story" className="hidden text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary sm:inline">Our world</a>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} className="shrink-0 text-foreground hover:text-primary">
            {theme === "light" ? <Moon className="size-5" strokeWidth={1.5} /> : <Sun className="size-5" strokeWidth={1.5} />}
          </Button>
          <a href={instagram} target="_blank" rel="noreferrer" aria-label="Chi-Era on Instagram" className="text-foreground transition-colors hover:text-primary"><Instagram className="size-5" strokeWidth={1.5} /></a>
        </nav>
      </header>

      <section aria-label="Welcome to Chi-Era Activewear" className="relative isolate min-h-[680px] overflow-hidden sm:min-h-[760px] lg:min-h-[min(820px,calc(100svh-80px))]">
        <img src={boutiqueInterior} alt="A sunlit Chi-Era-inspired activewear boutique" width={1920} height={1280} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-background/45" />
        <div className="absolute inset-0 z-0 flex" aria-hidden="true">
          <div className={`door-panel relative h-full w-1/2 origin-left border-r border-primary/35 ${doorsOpening ? "animate-door-left" : doorOpened ? "hidden" : ""}`}>
            <span className="absolute right-5 top-1/2 h-20 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary to-transparent sm:right-10" />
            <span className="absolute right-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary sm:right-7" />
          </div>
          <div className={`door-panel relative h-full w-1/2 origin-right border-l border-primary/35 ${doorsOpening ? "animate-door-right" : doorOpened ? "hidden" : ""}`}>
            <span className="absolute left-5 top-1/2 h-20 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary to-transparent sm:left-10" />
            <span className="absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary sm:left-7" />
          </div>
        </div>
        <div className="relative z-10 flex min-h-[680px] flex-col items-center justify-center px-6 py-24 text-center sm:min-h-[760px] lg:min-h-[min(820px,calc(100svh-80px))]">
          {doorOpened && <p className="mb-6 animate-rise text-[10px] uppercase tracking-[0.38em] text-primary sm:text-xs">Where power meets elegance</p>}
          <h1 className={`animate-rise font-display font-normal leading-[0.92] text-foreground ${doorOpened ? "text-6xl sm:text-8xl lg:text-9xl" : "absolute inset-x-6 bottom-[calc(50%+72px)] text-5xl sm:text-6xl"}`} style={{ animationDelay: "100ms" }}>
            Chi-Era<span className="block italic text-gold">Activewear</span>
          </h1>
          {doorOpened && <p className="mt-7 max-w-md animate-rise text-sm font-light leading-7 text-foreground/90 sm:text-base" style={{ animationDelay: "200ms" }}>Strength in every silhouette. Elegance in every move.</p>}
          <Button onClick={enterBoutique} disabled={doorsOpening} variant="outline" className={`${doorOpened ? "mt-10" : "absolute left-1/2 top-[calc(50%+72px)] -translate-x-1/2"} h-12 gap-4 border-primary/80 bg-background/85 px-7 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground`}>
            {doorsOpening ? "Welcome inside" : doorOpened ? "Explore the collection" : "Enter the boutique"}
            {doorOpened ? <ArrowDown className="size-4" /> : <ArrowRight className="size-4" />}
          </Button>
          {doorOpened && <div className="absolute bottom-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-foreground/70 sm:bottom-9"><span className="h-px w-8 bg-primary" />A considered kind of movement<span className="h-px w-8 bg-primary" /></div>}
        </div>
      </section>

      <section id="collection" ref={collectionRef} className="scroll-mt-8 px-5 py-20 sm:px-10 sm:py-28 lg:px-16" aria-labelledby="collection-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14">
            <div><p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-primary">The Chi-Era edit</p><h2 id="collection-heading" className="font-display text-5xl font-normal sm:text-6xl">Move with <span className="italic text-gold">intention.</span></h2></div>
            <a href={instagram} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 pb-1 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">Follow the collection <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14">
            {collection.map((item, index) => (
              <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`${item.name}, view on Instagram`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <img src={item.image} alt={`${item.name} by Chi-Era Activewear`} width={480} height={640} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                  <span className="absolute bottom-3 left-3 border border-primary/40 bg-background/85 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">View the look <ArrowUpRight className="ml-1 inline size-3" /></span>
                  <span className="absolute right-4 top-4 font-display text-lg italic text-foreground/90">0{index + 1}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-border/70 py-4"><div><h3 className="font-display text-2xl font-normal">{item.name}</h3><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{item.note}</p></div><ArrowUpRight className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="border-y border-primary/20 bg-card/50 px-5 py-20 text-center sm:py-28" aria-labelledby="story-heading">
        <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-primary">Chi-Era Activewear</p>
        <h2 id="story-heading" className="mx-auto max-w-3xl font-display text-5xl font-normal leading-tight sm:text-7xl">Where power meets <span className="italic text-gold">elegance.</span></h2>
        <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-7 text-muted-foreground">A thoughtful wardrobe for the way you move — from the studio and beyond.</p>
        <Button asChild variant="outline" className="mt-8 h-11 gap-3 border-primary/60 bg-transparent px-6 text-xs uppercase tracking-[0.18em] text-foreground hover:bg-primary hover:text-primary-foreground"><a href={instagram} target="_blank" rel="noreferrer">Discover Chi-Era on Instagram <ArrowUpRight className="size-4" /></a></Button>
      </section>

      <footer className="flex flex-col items-center justify-between gap-5 px-6 py-8 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:px-12">
        <div className="flex items-center gap-3"><img src={brandLogo} alt="" width={32} height={32} className="size-8 rounded-full object-cover" /><span>Chi-Era Activewear</span></div>
        <span>Where power meets elegance</span>
        <a href={instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">Instagram <ArrowUpRight className="ml-1 inline size-3" /></a>
      </footer>
    </main>
  );
}