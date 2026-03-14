export interface AirtableCourseRecord {
  id?: string;
  fields: {
    Slug?: string;
    "Title (EN)"?: string;
    "Title (AM)"?: string;
    "Title (RU)"?: string;
    "Overview (EN)"?: string;
    "Overview (AM)"?: string;
    "Overview (RU)"?: string;
    /** Single field kept for backward compatibility; prefer Topics (EN/AM/RU) */
    Topics?: string;
    "Topics (EN)"?: string;
    "Topics (AM)"?: string;
    "Topics (RU)"?: string;
    Outcomes?: string;
    "Outcomes (EN)"?: string;
    "Outcomes (AM)"?: string;
    "Outcomes (RU)"?: string;
    Audience?: string;
    "Audience (EN)"?: string;
    "Audience (AM)"?: string;
    "Audience (RU)"?: string;
    "Register URL"?: string;
    Location?: string;
    "Location (EN)"?: string;
    "Location (AM)"?: string;
    "Location (RU)"?: string;
    Instructor?: string;
    "Instructor (EN)"?: string;
    "Instructor (AM)"?: string;
    "Instructor (RU)"?: string;
    Format?: string;
    "Format (EN)"?: string;
    "Format (AM)"?: string;
    "Format (RU)"?: string;
    Duration?: string;
    "Duration (EN)"?: string;
    "Duration (AM)"?: string;
    "Duration (RU)"?: string;
    Schedule?: string;
    "Schedule (EN)"?: string;
    "Schedule (AM)"?: string;
    "Schedule (RU)"?: string;
    "Image URL"?: string;
    Sort?: number;
  };
}

export interface AirtableProjectRecord {
  id?: string;
  fields: {
    "Name (EN)"?: string;
    "Name (AM)"?: string;
    "Name (RU)"?: string;
    "Description (EN)"?: string;
    "Description (AM)"?: string;
    "Description (RU)"?: string;
    Status?: "Ongoing" | "Completed";
    "Image URL"?: string;
    Sort?: number;
  };
}

export interface AirtableTeamRecord {
  id?: string;
  fields: {
    Name?: string;
    "Name (EN)"?: string;
    "Name (AM)"?: string;
    "Name (RU)"?: string;
    "Role (EN)"?: string;
    "Role (AM)"?: string;
    "Role (RU)"?: string;
    "Image URL"?: string;
    Sort?: number;
  };
}

export interface CourseFromAirtable {
  slug: string;
  title: string;
  overview: string;
  topics: string[];
  outcomes: string[];
  audience: string[];
  registerUrl: string;
  meta: { label: string; value: string }[];
  imageUrl?: string;
  sort: number;
}

export interface ProjectFromAirtable {
  id: string;
  name: string;
  description: string;
  status: "Ongoing" | "Completed";
  imageUrl: string;
  sort: number;
}

export interface TeamMemberFromAirtable {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  sort: number;
}

// Re-export Lang for airtable API usage
export type { Lang } from "./common";

/** Hero content (one record from Hero table) */
export interface HeroContentFromAirtable {
  title: string;
  subtitle: string;
  lead: string;
}

/** Hero slide (from HeroSlides table) */
export interface HeroSlideFromAirtable {
  imageUrl: string;
  alt: string;
  sort: number;
}
