#!/usr/bin/env node
/**
 * Seed Airtable tables (Courses, Projects, Team) with records from the app's hardcoded data.
 * Run after creating tables (create-base-from-schema.js). Does not touch Contacts.
 *
 * Requires: AIRTABLE_BASE_ID, AIRTABLE_API_KEY (from .env or shell)
 *
 *   node airtable-setup/seed-records.js
 *   node -r dotenv/config airtable-setup/seed-records.js
 */
const BASE = process.env.AIRTABLE_BASE_ID?.trim() || "";
const TOKEN = process.env.AIRTABLE_API_KEY?.trim() || "";
const API = "https://api.airtable.com/v0";

// --- Seed data (from app: courseData.ts, translations.en, projects/about pages) ---
const COURSES = [
  {
    Slug: "project-management-fundamentals",
    "Title (EN)": "Fundamentals of Project Management",
    "Overview (EN)":
      "Get essential PM tools, planning methods, and practical communication approaches. The program is designed for direct application to real projects.",
    Topics: "Project Life Cycle\nScope and Requirements\nSchedule and Resources\nRisk and Communication Management",
    Outcomes:
      "Understand project phases from initiation to completion\nDefine clear scope, requirements, and priorities\nCreate a schedule and allocate resources effectively\nManage risks and communication with confidence",
    Audience:
      "For beginners and junior project managers\nFor specialists and team leads coordinating work",
    "Register URL": "https://docs.google.com/forms/",
    Location: "Yerevan, Armenia",
    Instructor: "Mushegh Avetisyan",
    Format: "In-person",
    Duration: "6 weeks",
    Schedule: "Tuesday and Thursday, 18:00–20:00",
    Sort: 0,
  },
  {
    Slug: "construction-project-management",
    "Title (EN)": "Construction Project Management",
    "Overview (EN)":
      "Learn practical approaches to construction project management from planning to delivery. The course includes stakeholder coordination, cost and quality control, and maintaining work according to the schedule.",
    Topics:
      "Construction Planning\nDesign and Construction Coordination\nConstruction Scheduling\nCost and Quality Control\nContractor Management\nDigital Project Management with Gectaro",
    Outcomes:
      "Plan construction work in stages and dependencies\nEffectively coordinate design, contractors, and the site\nApply cost and quality control methods throughout the project\nUse digital monitoring methods with modern PM tools",
    Audience:
      "For construction engineers and site coordinators\nFor developers, contractors, and construction project managers",
    "Register URL": "https://docs.google.com/forms/",
    Sort: 1,
  },
];

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80",
  "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1000&q=80",
];

const PROJECTS = [
  {
    "Name (EN)": "Zephyr Residential District",
    "Description (EN)":
      "Large residential district with modern infrastructure and green zones. We manage project planning, construction, and final delivery.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[0],
    Sort: 0,
  },
  {
    "Name (EN)": "Townhouses in Yeghvard",
    "Description (EN)":
      "Boutique urban residential project. We manage the entire process from design coordination to final delivery and launch.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[1],
    Sort: 1,
  },
  {
    "Name (EN)": "Nur Residential Complex",
    "Description (EN)":
      "Residential complex with full development and construction management within a single controlled framework.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[2],
    Sort: 2,
  },
  {
    "Name (EN)": "Kanach Tagh Residential District",
    "Description (EN)":
      "Residential district implemented with a set schedule, controlled budget, and high quality control from concept to completion.",
    Status: "Completed",
    "Image URL": PROJECT_IMAGES[3],
    Sort: 3,
  },
  {
    "Name (EN)": "Level 16 Residential Complex",
    "Description (EN)":
      "High-rise residential complex with full project management including tender organization, contractor coordination, and final delivery.",
    Status: "Completed",
    "Image URL": PROJECT_IMAGES[4],
    Sort: 4,
  },
];

const TEAM = [
  { Name: "Management", "Role (EN)": "Project Management and Strategy", Sort: 0 },
  { Name: "Operations", "Role (EN)": "Construction and Development Implementation", Sort: 1 },
  { Name: "Digital and Systems", "Role (EN)": "Gectaro System Implementation and Process Management", Sort: 2 },
];

async function createRecord(table, fields) {
  const url = `${API}/${BASE}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function seedTable(tableName, records, options = {}) {
  const { idField = "Slug", idLabel = "slug" } = options;
  let created = 0;
  let failed = 0;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const id = record[idField] ?? record.Name ?? `#${i + 1}`;
    try {
      await createRecord(tableName, record);
      created++;
      console.log(`  [${tableName}] Created: ${id}`);
    } catch (e) {
      failed++;
      console.error(`  [${tableName}] Failed (${id}): ${e.message}`);
    }
    await sleep(220);
  }
  return { created, failed };
}

async function main() {
  if (!TOKEN || !BASE) {
    console.error("Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY.");
    console.error("  AIRTABLE_BASE_ID=appXXX AIRTABLE_API_KEY=patXXX node airtable-setup/seed-records.js");
    process.exit(1);
  }

  console.log("Seeding Airtable base:", BASE);
  console.log("");

  const results = { courses: null, projects: null, team: null };

  console.log("Courses...");
  results.courses = await seedTable("Courses", COURSES, { idField: "Slug", idLabel: "slug" });
  console.log("");

  console.log("Projects...");
  results.projects = await seedTable("Projects", PROJECTS, { idField: "Name (EN)", idLabel: "name" });
  console.log("");

  console.log("Team...");
  results.team = await seedTable("Team", TEAM, { idField: "Name", idLabel: "name" });
  console.log("");

  const totalCreated =
    results.courses.created + results.projects.created + results.team.created;
  const totalFailed =
    results.courses.failed + results.projects.failed + results.team.failed;

  console.log("Summary:");
  console.log(`  Courses: ${results.courses.created} created, ${results.courses.failed} failed`);
  console.log(`  Projects: ${results.projects.created} created, ${results.projects.failed} failed`);
  console.log(`  Team: ${results.team.created} created, ${results.team.failed} failed`);
  console.log(`  Total: ${totalCreated} created, ${totalFailed} failed`);

  if (totalFailed > 0) process.exit(1);
  console.log("\nDone. The app will fetch this data from Airtable.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
