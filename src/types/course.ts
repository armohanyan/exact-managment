import type { translations } from "@/lib/translations";

export type TranslationKey = keyof (typeof translations)["en"];

export type CourseMeta = {
  labelKey: TranslationKey;
  valueKey: TranslationKey;
};

export type CourseDefinition = {
  slug: string;
  titleKey: TranslationKey;
  topicKeys: TranslationKey[];
  overviewKey: TranslationKey;
  outcomeKeys: TranslationKey[];
  audienceKeys: TranslationKey[];
  registerUrl: string;
  meta?: CourseMeta[];
};
