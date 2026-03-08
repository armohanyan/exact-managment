"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LOGO_SRC = "/logos/image.png";

const navItems: { href: string; key: string }[] = [
  { href: "/", key: "navHome" },
  { href: "/about", key: "navAbout" },
  { href: "/services", key: "navServices" },
  { href: "/projects", key: "navProjects" },
  { href: "/gectaro", key: "navGectaro" },
  { href: "/training", key: "navTraining" },
  { href: "/contact", key: "navContact" },
];

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/95 backdrop-blur-sm shadow-sm">
      <div className="container-narrow flex flex-wrap items-center justify-between gap-4 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-lg">
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="Exact Management"
              width={170}
              height={56}
              className="h-11 w-auto object-contain"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-display text-xl font-bold tracking-tight text-[#1a1a1a] md:text-2xl">
              Exact Management
            </span>
          )}
        </Link>
        <button
          type="button"
          className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-[#f5f4f0] transition-colors hover:bg-primary-soft md:hidden focus-ring"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-[#1a1a1a] transition-all ${
              navOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-[#1a1a1a] transition-all ${
              navOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-[#1a1a1a] transition-all ${
              navOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
        <nav
          className={`flex w-full flex-col gap-0 md:w-auto md:flex-row md:items-center md:gap-1 ${
            navOpen
              ? "max-h-[380px] border-t border-border pt-4 md:max-h-none md:border-0 md:pt-0"
              : "max-h-0 overflow-hidden md:max-h-none md:overflow-visible"
          }`}
          aria-label="Main navigation"
        >
          {navItems.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2.5 text-[15px] font-semibold transition-colors md:py-2 ${
                pathname === href
                  ? "bg-primary-soft text-primary"
                  : "text-[#1a1a1a] hover:bg-primary-soft hover:text-primary"
              }`}
              onClick={() => setNavOpen(false)}
            >
              {t[key as keyof typeof t]}
            </Link>
          ))}
          <div
            className="mt-3 flex md:ml-2 md:mt-0"
            role="group"
            aria-label="Language"
          >
            <span className="inline-flex rounded-full border border-border bg-[#f5f4f0] p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
                  lang === "en"
                    ? "bg-surface text-primary shadow-sm"
                    : "text-[#4d4d4d] hover:text-[#1a1a1a]"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hy")}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
                  lang === "hy"
                    ? "bg-surface text-primary shadow-sm"
                    : "text-[#4d4d4d] hover:text-[#1a1a1a]"
                }`}
                aria-pressed={lang === "hy"}
              >
                AM
              </button>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
