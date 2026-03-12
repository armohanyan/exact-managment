#!/usr/bin/env node
/**
 * Create Airtable tables and fields from airtable-setup/schema.json
 *
 * Requires:
 *   - AIRTABLE_API_KEY (Personal Access Token with scope schema.bases:write + schema.bases:read)
 *   - AIRTABLE_BASE_ID (the base must already exist; this script only adds tables to it)
 *
 * Run from project root:
 *   node airtable-setup/create-base-from-schema.js
 *
 * Or with env from .env (e.g. node -r dotenv/config airtable-setup/create-base-from-schema.js)
 */

const fs = require("fs");
const path = require("path");

const BASE = process.env.AIRTABLE_BASE_ID?.trim() || "";
const TOKEN = process.env.AIRTABLE_API_KEY?.trim() || "";
const SCHEMA_PATH = path.join(__dirname, "schema.json");
const META_URL = (baseId) => `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;

// Field types the Meta API can create (createdTime, formula, etc. cannot be created via API)
const CREATABLE_TYPES = new Set([
  "singleLineText",
  "multilineText",
  "url",
  "email",
  "number",
  "singleSelect",
  "multipleSelects",
  "checkbox",
  "date",
  "dateTime",
  "currency",
  "percent",
  "duration",
  "phoneNumber",
  "rating",
  "multipleAttachments",
  "multipleRecordLinks",
  "singleCollaborator",
  "multipleCollaborators",
  "richText",
  "barcode",
]);

function buildApiField(f) {
  const type = f.type;
  if (!CREATABLE_TYPES.has(type)) {
    return null; // skip createdTime, formula, etc.
  }
  const apiField = { name: f.name, type };
  if (type === "singleSelect" && Array.isArray(f.options)) {
    apiField.options = {
      choices: f.options.map((name) => ({ name: String(name) })),
    };
  }
  if (type === "number") {
    apiField.options = { precision: 0 };
  }
  return apiField;
}

async function createTable(baseId, tableSpec) {
  const fields = tableSpec.fields
    .map(buildApiField)
    .filter(Boolean);

  const skipped = tableSpec.fields.filter((f) => !CREATABLE_TYPES.has(f.type));
  if (skipped.length) {
    console.warn(
      `  [${tableSpec.name}] Skipped ${skipped.length} field(s) (not creatable via API): ${skipped.map((s) => s.name + " (" + s.type + ")").join(", ")}`
    );
    console.warn(
      "  Add them manually in Airtable if needed (e.g. Created = “Created time”)."
    );
  }

  if (fields.length === 0) {
    throw new Error(`Table "${tableSpec.name}" has no creatable fields. Add at least one (e.g. Name) in Airtable.`);
  }

  const body = { name: tableSpec.name, fields };
  const res = await fetch(META_URL(baseId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401) {
      throw new Error(
        `Airtable API 401: ${text}\n` +
          "Fix: Use a Personal Access Token (not legacy API key) from https://airtable.com/create/tokens\n" +
          "  - Add scopes: schema.bases:read, schema.bases:write\n" +
          "  - Under 'Access', add your base (Exact Management / this base)\n" +
          "  - Use the full token value in AIRTABLE_API_KEY (no quotes)."
      );
    }
    throw new Error(`Airtable API ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data;
}

async function main() {
  if (!TOKEN || !BASE) {
    console.error("Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID.");
    console.error("Create a base in Airtable first, then run:");
    console.error("  AIRTABLE_BASE_ID=appXXX AIRTABLE_API_KEY=patXXX node airtable-setup/create-base-from-schema.js");
    console.error("Token must have scopes: schema.bases:read, schema.bases:write (and data.records:read/write for the app).");
    process.exit(1);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
  } catch (e) {
    console.error("Failed to read schema.json:", e.message);
    process.exit(1);
  }

  const tables = schema.tables || [];
  if (tables.length === 0) {
    console.error("No tables defined in schema.json.");
    process.exit(1);
  }

  console.log(`Using base ${BASE}. Creating ${tables.length} table(s)...`);

  for (const table of tables) {
    try {
      await createTable(BASE, table);
      console.log(`  Created table: ${table.name}`);
    } catch (e) {
      console.error(`  Failed to create table "${table.name}":`, e.message);
      process.exit(1);
    }
  }

  console.log("Done. You can now add the “Created” (Created time) field to the Contacts table in Airtable if you want it for automations.");
}

main();
