# Airtable setup for Exact Management

Use this guide to create your Airtable base and connect it to the app. The **free plan** gives you 1 base with 1,200 records and 1,000 API calls per month—enough for courses, projects, team, and contacts.

---

## 1. Create a base and tables

You can either create tables **by hand** (see field list below) or **from the schema** with the script.

### Option A: Create tables automatically from schema.json

1. Create a new base in Airtable (e.g. **Exact Management**). It can be empty (with the default “Table 1”).
2. Get your **Base ID** (see section 2) and a **Personal Access Token** with scopes:
   - `schema.bases:read`
   - `schema.bases:write`
   - (and for the app: `data.records:read`, `data.records:write`)
3. From the project root, run:
   ```bash
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX AIRTABLE_API_KEY=patXXX node airtable-setup/create-base-from-schema.js
   ```
   Or copy `.env` from `.env.example`, set `AIRTABLE_BASE_ID` and `AIRTABLE_API_KEY`, then:
   ```bash
   node -r dotenv/config airtable-setup/create-base-from-schema.js
   ```
   (If you use the second form, install dotenv once: `yarn add -D dotenv`.)
4. The script creates the **Courses**, **Projects**, **Team**, and **Contacts** tables with the right fields. The **Created** (Created time) field cannot be created via API—add it manually in the Contacts table in Airtable if you want it (field type “Created time”).

5. **Seed records** (optional): to fill the new tables with the app’s default content (courses, projects, team), run:
   ```bash
   node airtable-setup/seed-records.js
   ```
   or `node -r dotenv/config airtable-setup/seed-records.js` if using `.env`. This creates records in **Courses**, **Projects**, and **Team** (not Contacts).

### Option B: Create tables by hand

1. Go to [airtable.com](https://airtable.com) and create a new base (e.g. **Exact Management**).
2. Create **4 tables** with the exact names and fields below. You can rename the default “Table 1” etc. by double‑clicking the tab.

### Table: **Courses**

| Field name     | Type        | Notes |
|----------------|-------------|--------|
| Slug           | Single line | URL-friendly id, e.g. `project-management-fundamentals` (must be unique) |
| Title (EN)     | Single line | English title |
| Title (HY)     | Single line | Armenian title (optional) |
| Title (RU)     | Single line | Russian title (optional) |
| Overview (EN)  | Long text   | Course overview in English |
| Overview (HY)  | Long text   | Optional |
| Overview (RU)  | Long text   | Optional |
| Topics         | Long text   | One topic per line (used for all languages unless you add Topics HY/RU) |
| Outcomes       | Long text   | One outcome per line |
| Audience       | Long text   | One audience item per line |
| Register URL   | URL         | Link to registration form |
| Location       | Single line | e.g. "Yerevan" |
| Instructor     | Single line | |
| Format         | Single line | e.g. "In-person" |
| Duration       | Single line | e.g. "2 days" |
| Schedule       | Single line | e.g. "TBD" |
| Image URL      | URL         | Optional cover image |
| Sort           | Number      | Optional; lower = first |

### Table: **Projects**

| Field name   | Type        | Notes |
|--------------|-------------|--------|
| Name (EN)    | Single line | Project name in English |
| Name (HY)    | Single line | Optional |
| Name (RU)    | Single line | Optional |
| Description (EN) | Long text | Short description |
| Description (HY) | Long text | Optional |
| Description (RU) | Long text | Optional |
| Status       | Single select | Values: **Ongoing** \| **Completed** (exact spelling) |
| Image URL    | URL         | Cover image |
| Sort         | Number      | Optional; lower = first |

### Table: **Team**

| Field name | Type        | Notes |
|------------|-------------|--------|
| Name       | Single line | Full name |
| Role (EN)  | Single line | Role in English |
| Role (HY)  | Single line | Optional |
| Role (RU)  | Single line | Optional |
| Image URL  | URL         | Optional photo |
| Sort       | Number      | Optional; lower = first |

### Table: **Contacts**

| Field name | Type      | Notes |
|------------|-----------|--------|
| Name       | Single line | From contact form |
| Email      | Email or Single line | From contact form |
| Message    | Long text | From contact form |
| Created    | Created time | Auto-filled by Airtable |

---

## 2. Get your Base ID and API token

1. **Base ID**  
   Open your base, then **Help → API documentation**. In the intro you’ll see something like:  
   `https://api.airtable.com/v0/appXXXXXXXXXXXXXX/TableName`  
   The **Base ID** is `appXXXXXXXXXXXXXX`.

2. **Personal Access Token**  
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens).  
   - Create a token with:  
     - **Scopes**: `data.records:read`, `data.records:write` (for the app).  
     - If you use the **create-base-from-schema.js** script, also add: `schema.bases:read`, `schema.bases:write`.  
     - **Access**: the base you created (Exact Management).  
   - Copy the token and store it somewhere safe (you won’t see it again).

---

## 3. Configure “new contact” → email (automation)

So that every new contact submission sends an email to your manager:

1. In your base, open the **Contacts** table.
2. Click **Automations** (top right) → **Create automation**.
3. **Trigger**: “When record is created” → choose base and **Contacts** table.
4. **Action**: “Send email”.
   - Connect your email (Gmail/Outlook etc.) if asked.
   - **To**: your manager’s email (e.g. `manager@yourcompany.com`).
   - **Subject**: e.g. `New contact from Exact Management website`.
   - **Body**: use the contact fields, e.g.:  
     `New message from {{Name}} ({{Email}}): {{Message}}`
5. Turn the automation **On**.

New form submissions that create a record in **Contacts** will trigger this email.

---

## 4. Connect the app to Airtable

1. In the project root, copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and set:
   ```env
   AIRTABLE_API_KEY=your_personal_access_token_here
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```
   Use your real token and Base ID. Do not commit `.env` to git.

3. Restart the dev server:
   ```bash
   yarn dev
   ```

The app will:
- **Training**: list and detail pages use the **Courses** table.
- **Projects**: ongoing and completed lists use the **Projects** table.
- **About**: team section uses the **Team** table.
- **Contact form**: submits to an API route that creates a record in **Contacts** (and your automation sends the email).

---

## 5. Optional: import schema reference

The file `schema.json` in this folder describes the same tables and fields in JSON form. Airtable does not import it directly; use it as a reference when creating or checking your base.

---

## Limits (free plan)

- **Records**: 1,200 per base (shared across all tables).
- **API calls**: 1,000 per workspace per month. The app caches Airtable responses to reduce calls.
- **Rate limit**: 5 requests per second per base.

If you hit limits, consider caching for longer or upgrading the Airtable plan.

