/**
 * Airtable API helpers for Exact Management.
 * Uses Personal Access Token (Bearer). Free tier: 1000 calls/month, 5 req/s per base.
 */

import type {
  AirtableCourseRecord,
  AirtableProjectRecord,
  AirtableTeamRecord,
  CourseFromAirtable,
  ProjectFromAirtable,
  TeamMemberFromAirtable,
  HeroContentFromAirtable,
  HeroSlideFromAirtable,
} from "@/types";
import type { Lang } from "@/types";

const BASE = process.env.AIRTABLE_BASE_ID?.trim() || "";
const TOKEN = process.env.AIRTABLE_API_KEY?.trim() || "";

const API = "https://api.airtable.com/v0";

function get<T>(table: string, params?: Record<string, string>): Promise<{ records: T[]; offset?: string }> {
  if (!BASE || !TOKEN) {
    return Promise.resolve({ records: [] });
  }
  const url = new URL(`${API}/${BASE}/${encodeURIComponent(table)}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return fetch(url.toString(), {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 60 },
  }).then(async (res) => {
    if (!res.ok) {
      const body = await res.text();
      let detail = body;
      try {
        const j = JSON.parse(body);
        detail = j.error?.message ?? j.error?.type ?? body;
      } catch {
        // use body as-is
      }
      throw new Error(`Airtable ${table}: ${res.status} ${detail}`);
    }
    return res.json();
  });
}

function getAll<T>(table: string, pageSize = 100): Promise<T[]> {

  const collect = (acc: T[], offset?: string): Promise<T[]> => {
    const params: Record<string, string> = { pageSize: String(pageSize) };
   
    if (offset) params.offset = offset;
   
    return get<T>(table, params).then(({ records, offset: next }) => {
      const combined = [...acc, ...records];

      if (next) return collect(combined, next);
      
      return combined;
    });
  };

  return collect([]);
}

function post(table: string, fields: Record<string, unknown>): Promise<{ id: string }> {
  if (!BASE || !TOKEN) {
    return Promise.reject(new Error("Airtable not configured"));
  }
  return fetch(`${API}/${BASE}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  }).then(async (res) => {
    if (!res.ok) {
      const body = await res.text();
      throw new Error(body || `Airtable ${table}: ${res.status}`);
    }
    return res.json().then((data) => ({ id: data.id }));
  });
}

export type {
  AirtableCourseRecord,
  AirtableProjectRecord,
  AirtableTeamRecord,
  CourseFromAirtable,
  ProjectFromAirtable,
  TeamMemberFromAirtable,
  HeroContentFromAirtable,
  HeroSlideFromAirtable,
} from "@/types";

function parseLines(s: string | undefined): string[] {
  if (!s || typeof s !== "string") return [];
  return s
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function pickTitle(fields: AirtableCourseRecord["fields"], lang: Lang): string {
  const key = lang === "en" ? "Title (EN)" : lang === "am" ? "Title (AM)" : "Title (RU)";
  return fields[key] || fields["Title (EN)"] || "";
}

function pickOverview(fields: AirtableCourseRecord["fields"], lang: Lang): string {
  const key = lang === "en" ? "Overview (EN)" : lang === "am" ? "Overview (AM)" : "Overview (RU)";
  return fields[key] || fields["Overview (EN)"] || "";
}

function pickLines(
  fields: AirtableCourseRecord["fields"],
  baseKey: "Topics" | "Outcomes" | "Audience",
  lang: Lang
): string[] {
  const langKey =
    baseKey === "Topics"
      ? (lang === "en" ? "Topics (EN)" : lang === "am" ? "Topics (AM)" : "Topics (RU)")
      : baseKey === "Outcomes"
        ? (lang === "en" ? "Outcomes (EN)" : lang === "am" ? "Outcomes (AM)" : "Outcomes (RU)")
        : (lang === "en" ? "Audience (EN)" : lang === "am" ? "Audience (AM)" : "Audience (RU)");
  const value = (fields as Record<string, string | undefined>)[langKey] || fields[baseKey];
  return parseLines(value);
}

function pickMetaValue(
  fields: AirtableCourseRecord["fields"],
  baseKey: "Location" | "Instructor" | "Format" | "Duration" | "Schedule",
  lang: Lang
): string {
  const langKey =
    baseKey + (lang === "en" ? " (EN)" : lang === "am" ? " (AM)" : " (RU)");
  const f = fields as Record<string, string | undefined>;
  return f[langKey] || f[baseKey] || "";
}

export function courseFromRecord(r: AirtableCourseRecord, lang: Lang): CourseFromAirtable | null {
  const f = r?.fields;
  if (!f || typeof f !== "object") return null;

  const slug = f.Slug?.trim();
  if (!slug) return null;

  const title = pickTitle(f, lang);
  const overview = pickOverview(f, lang);
  const meta: { label: string; value: string }[] = [];
  const loc = pickMetaValue(f, "Location", lang);
  if (loc) meta.push({ label: "Location", value: loc });
  const instructor = pickMetaValue(f, "Instructor", lang);
  if (instructor) meta.push({ label: "Instructor", value: instructor });
  const format = pickMetaValue(f, "Format", lang);
  if (format) meta.push({ label: "Format", value: format });
  const duration = pickMetaValue(f, "Duration", lang);
  if (duration) meta.push({ label: "Duration", value: duration });
  const schedule = pickMetaValue(f, "Schedule", lang);
  if (schedule) meta.push({ label: "Schedule", value: schedule });
  return {
    slug,
    title,
    overview,
    topics: pickLines(f, "Topics", lang),
    outcomes: pickLines(f, "Outcomes", lang),
    audience: pickLines(f, "Audience", lang),
    registerUrl: f["Register URL"] || "",
    meta,
    imageUrl: f["Image URL"],
    sort: typeof f.Sort === "number" ? f.Sort : 999,
  };
}

export function projectFromRecord(r: AirtableProjectRecord, lang: Lang): ProjectFromAirtable | null {
  const f = r?.fields;
  if (!f || typeof f !== "object") return null;
  const nameKey = lang === "en" ? "Name (EN)" : lang === "am" ? "Name (AM)" : "Name (RU)";
  const descKey = lang === "en" ? "Description (EN)" : lang === "am" ? "Description (AM)" : "Description (RU)";
  const name = f[nameKey] || f["Name (EN)"] || "";
  if (!name) return null;
  const status = f.Status === "Ongoing" || f.Status === "Completed" ? f.Status : "Ongoing";
  return {
    id: (r as { id?: string }).id || "",
    name,
    description: f[descKey] || f["Description (EN)"] || "",
    status,
    imageUrl: f["Image URL"] || "",
    sort: typeof f.Sort === "number" ? f.Sort : 999,
  };
}

export function teamMemberFromRecord(r: AirtableTeamRecord, lang: Lang): TeamMemberFromAirtable | null {
  const f = r?.fields;
  if (!f || typeof f !== "object") return null;
  const nameKey = lang === "en" ? "Name (EN)" : lang === "am" ? "Name (AM)" : "Name (RU)";
  const roleKey = lang === "en" ? "Role (EN)" : lang === "am" ? "Role (AM)" : "Role (RU)";
  const name = f[nameKey] || f["Name (EN)"] || f.Name || "";
  if (!name) return null;
  return {
    id: (r as { id?: string }).id || "",
    name,
    role: f[roleKey] || f["Role (EN)"] || f["Role (AM)"] || "",
    imageUrl: f["Image URL"],
    sort: typeof f.Sort === "number" ? f.Sort : 999,
  };
}

const TABLE_COURSES = "Courses";
const TABLE_PROJECTS = "Projects";
const TABLE_TEAM = "Team";
const TABLE_CONTACTS = "Contacts";
const TABLE_HERO = "Hero";
const TABLE_HERO_SLIDES = "HeroSlides";

type AirtableHeroRecord = { id?: string; fields: Record<string, string | number | undefined> };
type AirtableHeroSlideRecord = { id?: string; fields: Record<string, string | number | undefined> };

function pickHeroField(fields: Record<string, string | number | undefined>, base: string, lang: Lang): string {
  const key = base + (lang === "en" ? " (EN)" : lang === "am" ? " (AM)" : " (RU)");
  const v = fields[key];
  return typeof v === "string" ? v : "";
}

export async function fetchHeroContent(lang: Lang): Promise<HeroContentFromAirtable | null> {
  const raw = await getAll<AirtableHeroRecord>(TABLE_HERO);
  const first = raw
    .map((r) => {
      const f = r.fields || {};
      const title = pickHeroField(f, "Title", lang) || pickHeroField(f, "Title", "en");
      const subtitle = pickHeroField(f, "Subtitle", lang) || pickHeroField(f, "Subtitle", "en");
      const lead = pickHeroField(f, "Lead", lang) || pickHeroField(f, "Lead", "en");
      if (!title && !subtitle && !lead) return null;
      return { title, subtitle, lead };
    })
    .find((x) => x !== null);
  return first ?? null;
}

export async function fetchHeroSlides(lang: Lang): Promise<HeroSlideFromAirtable[]> {
  const raw = await getAll<AirtableHeroSlideRecord>(TABLE_HERO_SLIDES);
  const slides = raw
    .map((r) => {
      const f = r.fields || {};
      const imageUrl = typeof f["Image URL"] === "string" ? f["Image URL"] : "";
      if (!imageUrl) return null;
      const alt = pickHeroField(f, "Alt", lang) || pickHeroField(f, "Alt", "en") || "";
      const sort = typeof f.Sort === "number" ? f.Sort : 999;
      return { imageUrl, alt, sort };
    })
    .filter((s): s is HeroSlideFromAirtable => s !== null);
  slides.sort((a, b) => a.sort - b.sort);
  return slides;
}

export async function fetchCourses(lang: Lang): Promise<CourseFromAirtable[]> {
  const raw = await getAll<AirtableCourseRecord>(TABLE_COURSES);
  const list = raw
    .map((r) => courseFromRecord(r, lang))
    .filter((c): c is CourseFromAirtable => c !== null);
  list.sort((a, b) => a.sort - b.sort);
  return list;
}

export async function fetchProjects(lang: Lang): Promise<ProjectFromAirtable[]> {
  const raw = await getAll<AirtableProjectRecord>(TABLE_PROJECTS);

  const list = raw
    .map((r) => projectFromRecord(r, lang))
    .filter((p): p is ProjectFromAirtable => p !== null);
  
    list.sort((a, b) => a.sort - b.sort);
  
  return list;
}

export async function fetchTeam(lang: Lang): Promise<TeamMemberFromAirtable[]> {
  const raw = await getAll<AirtableTeamRecord>(TABLE_TEAM);
  const list = raw
    .map((r) => teamMemberFromRecord(r, lang))
    .filter((t): t is TeamMemberFromAirtable => t !== null);
  list.sort((a, b) => a.sort - b.sort);
  return list;
}

export async function createContactRecord(data: { name: string; email: string; message: string }): Promise<void> {
  await post(TABLE_CONTACTS, {
    Name: data.name,
    Email: data.email,
    Message: data.message,
  });
}

export function isAirtableConfigured(): boolean {
  return Boolean(BASE && TOKEN);
}
