#!/usr/bin/env node
/**
 * Reset Airtable base: delete all records in schema tables, create any missing tables,
 * then seed with data from seed-records.js (EN, AM, RU).
 *
 * Requires: AIRTABLE_BASE_ID, AIRTABLE_API_KEY (in .env or environment)
 *
 * Run from project root:
 *   node airtable-setup/reset-airtable.js
 */
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const BASE = process.env.AIRTABLE_BASE_ID?.trim() || "";
const TOKEN = process.env.AIRTABLE_API_KEY?.trim() || "";
const API = "https://api.airtable.com/v0";
const META_URL = (baseId) => `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;

const SCHEMA_PATH = path.join(__dirname, "schema.json");

// Reuse field builder from create-base-from-schema
const CREATABLE_TYPES = new Set([
  "singleLineText", "multilineText", "url", "email", "number", "singleSelect",
  "multipleSelects", "checkbox", "date", "dateTime", "currency", "percent",
  "duration", "phoneNumber", "rating", "multipleAttachments", "multipleRecordLinks",
  "singleCollaborator", "multipleCollaborators", "richText", "barcode",
]);

function buildApiField(f) {
  const type = f.type;
  if (!CREATABLE_TYPES.has(type)) return null;
  const apiField = { name: f.name, type };
  if (type === "singleSelect" && Array.isArray(f.options)) {
    apiField.options = { choices: f.options.map((name) => ({ name: String(name) })) };
  }
  if (type === "number") apiField.options = { precision: 0 };
  return apiField;
}

async function fetchMetaTables() {
  const res = await fetch(META_URL(BASE), {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Meta API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.tables || [];
}

async function listAllRecordIds(tableName) {
  const ids = [];
  let offset = null;
  const tableEnc = encodeURIComponent(tableName);
  do {
    const url = offset
      ? `${API}/${BASE}/${tableEnc}?pageSize=100&offset=${offset}`
      : `${API}/${BASE}/${tableEnc}?pageSize=100`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      if (res.status === 404) return []; // table might not exist
      throw new Error(`List ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    for (const r of data.records || []) if (r.id) ids.push(r.id);
    offset = data.offset || null;
  } while (offset);
  return ids;
}

async function deleteRecordsInBatches(tableName, recordIds) {
  const BATCH = 10;
  const tableEnc = encodeURIComponent(tableName);
  for (let i = 0; i < recordIds.length; i += BATCH) {
    const batch = recordIds.slice(i, i + BATCH);
    const params = new URLSearchParams();
    batch.forEach((id) => params.append("records[]", id));
    const res = await fetch(`${API}/${BASE}/${tableEnc}?${params.toString()}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error(`Delete ${res.status}: ${await res.text()}`);
    await sleep(250);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function clearTable(tableName) {
  const ids = await listAllRecordIds(tableName);
  if (ids.length === 0) return 0;
  await deleteRecordsInBatches(tableName, ids);
  return ids.length;
}

async function createTable(tableSpec) {
  const fields = tableSpec.fields.map(buildApiField).filter(Boolean);
  const skipped = tableSpec.fields.filter((f) => !CREATABLE_TYPES.has(f.type));
  if (skipped.length) {
    console.warn(`  [${tableSpec.name}] Skipped non-creatable fields: ${skipped.map((s) => s.name).join(", ")}`);
  }
  if (fields.length === 0) throw new Error(`Table "${tableSpec.name}" has no creatable fields.`);
  const res = await fetch(META_URL(BASE), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: tableSpec.name, fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 422 && /already exists|duplicate/i.test(text)) return; // table already there
    throw new Error(`Create table ${res.status}: ${text}`);
  }
  await res.json();
}

async function main() {
  if (!TOKEN || !BASE) {
    console.error("Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY.");
    console.error("  Put them in a .env file in the project root, then run from project root:");
    console.error("  node airtable-setup/reset-airtable.js");
    console.error("  (Folder is airtable-setup, not airtable.)");
    process.exit(1);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
  } catch (e) {
    console.error("Failed to read schema.json:", e.message);
    process.exit(1);
  }

  const schemaTables = schema.tables || [];
  const schemaNames = new Set(schemaTables.map((t) => t.name));

  console.log("Fetching existing tables...");
  const existingTables = await fetchMetaTables();
  const existingByName = new Map(existingTables.map((t) => [t.name, t]));

  // 1) Clear records in tables that exist and are in our schema (skip Contacts to preserve submissions)
  const tablesToClear = schemaTables.filter((t) => t.name !== "Contacts" && existingByName.has(t.name));
  console.log("Clearing records in", tablesToClear.length, "table(s)...");
  for (const table of tablesToClear) {
    const deleted = await clearTable(table.name);
    console.log(`  Cleared ${table.name}: ${deleted} record(s)`);
    await sleep(300);
  }

  // 2) Create tables that are in schema but don't exist
  for (const table of schemaTables) {
    if (existingByName.has(table.name)) continue;
    console.log("Creating table:", table.name);
    try {
      await createTable(table);
      console.log("  Created:", table.name);
    } catch (e) {
      console.error("  Failed:", e.message);
      process.exit(1);
    }
    await sleep(300);
  }

  // 3) Seed (load seed module and run)
  console.log("\nSeeding...");
  const seed = require("./seed-records.js");
  if (typeof seed.runSeed === "function") {
    await seed.runSeed();
  } else {
    console.error("seed-records.js must export runSeed(). Run seed manually: node airtable-setup/seed-records.js");
    process.exit(1);
  }

  console.log("\nReset and seed done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
