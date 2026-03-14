import type { translations } from "@/lib/translations";

export type TranslationKey = keyof (typeof translations)["en"];
