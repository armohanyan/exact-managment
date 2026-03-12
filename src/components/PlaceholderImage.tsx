"use client";

import Image from "next/image";
import type { PlaceholderTheme } from "@/types";

const themeLabels: Record<PlaceholderTheme, string> = {
  construction: "Construction site",
  building: "Building / structure",
  planning: "Project planning",
  team: "Team collaboration",
  default: "Construction and development",
};

/** Default Unsplash images per theme - real photos from the internet */
const THEME_IMAGES: Record<PlaceholderTheme, string> = {
  construction:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  building:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  planning:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  team:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  default:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
};

interface PlaceholderImageProps {
  theme?: PlaceholderTheme;
  alt?: string;
  className?: string;
  aspectRatio?: "16/10" | "4/3" | "1/1" | "3/2" | "4/5";
  fill?: boolean;
  priority?: boolean;
  /** Override with custom image URL */
  src?: string;
}

/**
 * Reusable image component. Uses real Unsplash photos per theme by default.
 * Pass src to override with your own image URL.
 */
export default function PlaceholderImage({
  theme = "default",
  alt,
  className = "",
  aspectRatio = "16/10",
  fill = false,
  priority = false,
  src: srcOverride,
}: PlaceholderImageProps) {
  const aspectClass = {
    "16/10": "aspect-[16/10]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "4/5": "aspect-[4/5]",
  }[aspectRatio];

  const label = alt ?? themeLabels[theme];
  const src = srcOverride ?? THEME_IMAGES[theme];

  const wrapClass = `relative overflow-hidden ${aspectClass} ${className}`;

  if (fill) {
    return (
      <div className={wrapClass}>
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className={wrapClass}>
      <Image
        src={src}
        alt={label}
        width={1200}
        height={750}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
        priority={priority}
      />
    </div>
  );
}
