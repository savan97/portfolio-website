import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero/hero";
import { HeroGrid } from "@/components/sections/hero/hero-grid";
import { Work } from "@/components/sections/work/work";
import { Workflow } from "@/components/sections/workflow";

// TODO: pick one hero — "plain" or "grid" (with background lines) — and delete the other.
const HERO_VERSION: "plain" | "grid" = "grid";

export default function Home() {
  return (
    <>
      {HERO_VERSION === "grid" ? <HeroGrid /> : <Hero />}
      <About />
      <Work />
      <Capabilities />
      <Workflow />
      <Experience />
      <Contact />
    </>
  );
}
