"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Lang, translations } from "@/lib/translations";

const STORAGE_KEY = "exact-lang";

type T = (typeof translations)[Lang];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T;
} | null>(null);

function getStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "am" || stored === "ru") return stored;
    if (stored === "hy") return "am"; // migrate legacy
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLangState(getStoredLang());
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  }, []);

  useEffect(() => {
    if (mounted) document.documentElement.lang = lang;
  }, [lang, mounted]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
