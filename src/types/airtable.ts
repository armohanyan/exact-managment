export interface AirtableCourseRecord {
  id?: string;
  fields: {
    Slug?: string;
    "Title (EN)"?: string;
    "Title (HY)"?: string;
    "Title (RU)"?: string;
    "Overview (EN)"?: string;
    "Overview (HY)"?: string;
    "Overview (RU)"?: string;
    Topics?: string;
    Outcomes?: string;
    Audience?: string;
    "Register URL"?: string;
    Location?: string;
    Instructor?: string;
    Format?: string;
    Duration?: string;
    Schedule?: string;
    "Image URL"?: string;
    Sort?: number;
  };
}

export interface AirtableProjectRecord {
  id?: string;
  fields: {
    "Name (EN)"?: string;
    "Name (HY)"?: string;
    "Name (RU)"?: string;
    "Description (EN)"?: string;
    "Description (HY)"?: string;
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
    "Role (EN)"?: string;
    "Role (HY)"?: string;
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
