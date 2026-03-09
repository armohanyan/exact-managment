import { translations } from "@/lib/translations";

type TranslationKey = keyof typeof translations.en;

type CourseMeta = {
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

const fallbackGoogleFormUrl = "https://docs.google.com/forms/";

export const courseCatalog: CourseDefinition[] = [
  {
    slug: "project-management-fundamentals",
    titleKey: "course1Title",
    topicKeys: ["course1Topic1", "course1Topic2", "course1Topic3", "course1Topic4"],
    overviewKey: "course1Overview",
    outcomeKeys: [
      "course1Outcome1",
      "course1Outcome2",
      "course1Outcome3",
      "course1Outcome4",
    ],
    audienceKeys: ["course1Audience1", "course1Audience2"],
    registerUrl:
      process.env.NEXT_PUBLIC_COURSE1_FORM_URL ?? fallbackGoogleFormUrl,
    meta: [
      { labelKey: "location", valueKey: "course1Location" },
      { labelKey: "instructor", valueKey: "course1Instructor" },
      { labelKey: "format", valueKey: "course1Format" },
      { labelKey: "duration", valueKey: "course1Duration" },
      { labelKey: "schedule", valueKey: "course1Schedule" },
    ],
  },
  {
    slug: "construction-project-management",
    titleKey: "course2Title",
    topicKeys: [
      "course2Topic1",
      "course2Topic2",
      "course2Topic3",
      "course2Topic4",
      "course2Topic5",
      "course2Topic6",
    ],
    overviewKey: "course2Overview",
    outcomeKeys: [
      "course2Outcome1",
      "course2Outcome2",
      "course2Outcome3",
      "course2Outcome4",
    ],
    audienceKeys: ["course2Audience1", "course2Audience2"],
    registerUrl:
      process.env.NEXT_PUBLIC_COURSE2_FORM_URL ?? fallbackGoogleFormUrl,
  },
];

export function getCourseBySlug(slug: string) {
  return courseCatalog.find((course) => course.slug === slug);
}
