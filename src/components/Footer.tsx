"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LOGO_SRC = "/logos/image.png";

const footerLinks = [
  { href: "/", key: "navHome" as const },
  { href: "/about", key: "aboutLink" as const },
  { href: "/services", key: "navServices" as const },
  { href: "/projects", key: "navProjects" as const },
  { href: "/training", key: "navTraining" as const },
  { href: "/contact", key: "contactLink" as const },
  { href: "/gectaro", key: "navGectaro" as const },
];

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const { t } = useLanguage();
  return (
    <footer className="relative overflow-hidden border-t border-border bg-[#151f1f] text-white">
      <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="container-narrow py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex rounded-xl focus-ring">
              {!logoError ? (
                <span className="rounded-xl bg-white px-3 py-2 shadow-md">
                  <Image
                    src={LOGO_SRC}
                    alt="Exact Management"
                    width={220}
                    height={72}
                    className="h-10 w-auto object-contain md:h-11"
                    onError={() => setLogoError(true)}
                  />
                </span>
              ) : (
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  Exact Management
                </span>
              )}
            </Link>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              {t.footerLead}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label={t.mainNavigation}>
            {footerLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
              >
                {t[key]}
              </Link>
            ))}
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
