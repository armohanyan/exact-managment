"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/types";

const LANG_OPTIONS: { value: Lang; label: string; flag: string }[] = [
  { value: "en", label: "ENGLISH", flag: "🇬🇧" },
  { value: "ru", label: "РУССКИЙ", flag: "🇷🇺" },
  { value: "hy", label: "ՀԱՅԵՐԵՆ", flag: "🇦🇲" },
];

const LOGO_SRC = "/logos/image.png";

const navItems: { href: string; key: string }[] = [
  { href: "/", key: "navHome" },
  { href: "/about", key: "navAbout" },
  { href: "/services", key: "navServices" },
  { href: "/projects", key: "navProjects" },
  { href: "/training", key: "navTraining" },
  { href: "/contact", key: "navContact" },
  { href: "/gectaro", key: "navGectaro" },
];

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  const currentLang = LANG_OPTIONS.find((o) => o.value === lang) ?? LANG_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [langDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="container-narrow flex flex-wrap items-center justify-between gap-3 py-2.5 md:py-3">
        <Link href="/" className="flex shrink-0 items-center justify-center focus-ring rounded-lg">
          {!logoError ? (
            <Image
              src={LOGO_SRC}
              alt="Exact Management"
              width={230}
              height={76}
              className="block h-10 w-auto object-contain md:h-14"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl">
              Exact Management
            </span>
          )}
        </Link>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-[#f5f4f0] transition-colors hover:bg-primary-soft md:hidden focus-ring"
          aria-label={navOpen ? t.headerMenuClose : t.headerMenuOpen}
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
              ? "max-h-[380px] border-t border-border pt-3 md:max-h-none md:border-0 md:pt-0"
              : "max-h-0 overflow-hidden md:max-h-none md:overflow-visible"
          }`}
          aria-label={t.mainNavigation}
        >
          {navItems.map(({ href, key }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-[15px] font-semibold transition-all md:py-1.5 ${
                  isActive
                    ? "bg-primary-soft text-primary shadow-sm"
                    : "text-[#1a1a1a] hover:bg-primary-soft hover:text-primary hover:-translate-y-0.5"
                }`}
                onClick={() => setNavOpen(false)}
              >
                {t[key as keyof typeof t]}
              </Link>
            );
          })}
          <div
            ref={langDropdownRef}
            className="relative mt-3 flex md:ml-2 md:mt-0"
            role="group"
            aria-label={t.languageSwitcher}
          >
            <button
              type="button"
              onClick={() => setLangDropdownOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-[#f5f4f0] px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] shadow-sm transition-colors hover:bg-[#ebeae6] focus-ring"
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label={t.languageSwitcher}
            >
              <span className="text-lg leading-none" aria-hidden>
                {currentLang.flag}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div
                role="listbox"
                className="absolute left-0 right-auto top-full z-50 mt-1.5 min-w-[180px] rounded-xl border border-border bg-white py-1 shadow-lg md:left-auto md:right-0"
                aria-label={t.languageSwitcher}
              >
                {LANG_OPTIONS.map((option) => {
                  const isSelected = lang === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setLang(option.value);
                        setLangDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f4f0]"
                    >
                      <span className="text-lg leading-none" aria-hidden>
                        {option.flag}
                      </span>
                      <span className="flex-1 uppercase tracking-wide">
                        {option.label}
                      </span>
                      {isSelected && (
                        <svg
                          className="h-5 w-5 shrink-0 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
