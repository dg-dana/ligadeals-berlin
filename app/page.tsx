import Image from "next/image";
import Link from "next/link";

import NavigationCard from "@/components/opening/NavigationCard";

const navigationItems = [
  {
    title: "Traveliga Berlin",
    href: "/berlin",
    image: "/images/berlin-skyline.png",
    imageAlt: "Berlin skyline with the Fernsehturm tower",
  },
];

function Hero() {
  return (
    <header className="opening-hero">
      <Link href="/" className="opening-brand" aria-label="Traveliga home">
        <span className="opening-brand-mark" aria-hidden="true">
          <Image src="/traveliga-mark.svg" alt="" width={38} height={38} priority />
        </span>
        <span>Traveliga</span>
      </Link>

      <div className="opening-hero-copy">
        <p className="opening-eyebrow">Traveliga</p>
        <h1>Every city has a story.</h1>
        <p>Discover the places that make it unforgettable.</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="opening-page">
      <div className="opening-orb opening-orb-top" aria-hidden="true" />
      <div className="opening-orb opening-orb-bottom" aria-hidden="true" />

      <div className="opening-content">
        <Hero />

        <section className="opening-destinations" aria-label="Traveliga destinations">
          {navigationItems.map((item) => (
            <NavigationCard key={item.href} {...item} />
          ))}
        </section>

        <footer className="opening-footer">
          <span>© {new Date().getFullYear()} Traveliga</span>
        </footer>
      </div>
    </div>
  );
}
