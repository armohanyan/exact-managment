"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const footerLinks = [
  { href: "/about", key: "aboutLink" as const },
  { href: "/services", key: "navServices" as const },
  { href: "/projects", key: "navProjects" as const },
  { href: "/contact", key: "contactLink" as const },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-[#1a1a1a] text-white">
      <div className="container-narrow py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Exact Management
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Construction and development project management. On time, on budget,
              high quality.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
              >
                {t[key]}
              </Link>
            ))}
            <a
              href="https://exact.am"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
            >
              exact.am
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center md:text-left">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t.footerCopy}
          </p>
        </div>
      </div>
    </footer>
  );
}
