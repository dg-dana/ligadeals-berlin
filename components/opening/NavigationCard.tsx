import Image from "next/image";
import Link from "next/link";

interface NavigationCardProps {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
}

export default function NavigationCard({ title, href, image, imageAlt }: NavigationCardProps) {
  return (
    <Link href={href} className="navigation-card">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) calc(100vw - 40px), 440px"
        className="navigation-card-image"
      />
      <span className="navigation-card-overlay" aria-hidden="true" />
      <span className="navigation-card-content">
        <span className="navigation-card-title">{title}</span>
        <span className="navigation-card-arrow" aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}
