#!/usr/bin/env node
/**
 * Seed Airtable tables (Courses, Projects, Team, Hero, HeroSlides) with records.
 * All content includes EN, AM (Armenian), and RU.
 * Run from project root after creating tables (create-base-from-schema.js) or use reset-airtable.js.
 *
 * Requires: AIRTABLE_BASE_ID, AIRTABLE_API_KEY (in .env or environment)
 *
 *   node airtable-setup/seed-records.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const BASE = process.env.AIRTABLE_BASE_ID?.trim() || "";
const TOKEN = process.env.AIRTABLE_API_KEY?.trim() || "";
const API = "https://api.airtable.com/v0";

// --- Courses (EN, AM, RU) ---
const COURSES = [
  {
    Slug: "project-management-fundamentals",
    "Title (EN)": "Fundamentals of Project Management",
    "Title (AM)": "Նախագծերի կառավարման հիմունքներ",
    "Title (RU)": "Основы управления проектами",
    "Overview (EN)":
      "Get essential PM tools, planning methods, and practical communication approaches. The program is designed for direct application to real projects.",
    "Overview (AM)":
      "Ստացեք PM-ի հիմնական գործիքները, պլանավորման մեթոդները և հաղորդակցության գործնական մոտեցումներ։ Ծրագիրը նախատեսված է անմիջապես իրական նախագծերում կիրառելու համար։",
    "Overview (RU)":
      "Получите основные инструменты PM, методы планирования и практические подходы к коммуникации. Программа предназначена для прямого применения в реальных проектах.",
    "Topics (EN)": "Project Life Cycle\nScope and Requirements\nSchedule and Resources\nRisk and Communication Management",
    "Topics (AM)": "Նախագծի կյանքի ցիկլ\nՇրջանակ և պահանջներ\nԺամանակացույց և ռեսուրսներ\nՌիսկի և հաղորդակցության կառավարում",
    "Topics (RU)": "Жизненный цикл проекта\nРамки и требования\nГрафик и ресурсы\nУправление рисками и коммуникациями",
    "Outcomes (EN)":
      "Understand project phases from initiation to completion\nDefine clear scope, requirements, and priorities\nCreate a schedule and allocate resources effectively\nManage risks and communication with confidence",
    "Outcomes (AM)":
      "Հասկանալ նախագծի փուլերը՝ մեկնարկից մինչև ավարտ\nՍահմանել հստակ շրջանակ, պահանջներ և առաջնահերթություններ\nԿազմել ժամանակացույց և արդյունավետ բաշխել ռեսուրսները\nԿառավարել ռիսկերը և հաղորդակցությունը վստահությամբ",
    "Outcomes (RU)":
      "Понимать этапы проекта от инициации до завершения\nОпределять четкие рамки, требования и приоритеты\nСоставлять график и эффективно распределять ресурсы\nУверенно управлять рисками и коммуникациями",
    "Audience (EN)":
      "For beginners and junior project managers\nFor specialists and team leads coordinating work",
    "Audience (AM)":
      "Սկսնակ և կրտսեր նախագծերի կառավարիչների համար\nՄասնագետների և թիմերի ղեկավարների համար, ովքեր համակարգում են աշխատանքները",
    "Audience (RU)":
      "Для начинающих и младших менеджеров проектов\nДля специалистов и руководителей команд, координирующих работу",
    "Register URL": "https://docs.google.com/forms/",
    "Location (EN)": "Yerevan, Armenia",
    "Location (AM)": "Երևան, Հայաստան",
    "Location (RU)": "Ереван, Армения",
    "Instructor (EN)": "Mushegh Avetisyan",
    "Instructor (AM)": "Մուշեղ Ավետիսյան",
    "Instructor (RU)": "Мушег Аветисян",
    "Format (EN)": "In-person",
    "Format (AM)": "Անձնակազմ",
    "Format (RU)": "Очно",
    "Duration (EN)": "6 weeks",
    "Duration (AM)": "6 շաբաթ",
    "Duration (RU)": "6 недель",
    "Schedule (EN)": "Tuesday and Thursday, 18:00–20:00",
    "Schedule (AM)": "Երեքշաբթի և Հինգշաբթի, 18:00–20:00",
    "Schedule (RU)": "Вторник и Четверг, 18:00–20:00",
    Sort: 0,
  },
  {
    Slug: "construction-project-management",
    "Title (EN)": "Construction Project Management",
    "Title (AM)": "Շինարարական նախագծերի կառավարում",
    "Title (RU)": "Управление строительными проектами",
    "Overview (EN)":
      "Learn practical approaches to construction project management from planning to delivery. The course includes stakeholder coordination, cost and quality control, and maintaining work according to the schedule.",
    "Overview (AM)":
      "Սովորեք շինարարական նախագծերի կառավարման գործնական մոտեցումներ՝ պլանավորումից մինչև հանձնում։ Դասընթացը ներառում է շահակիցների համակարգում, ծախսերի և որակի վերահսկում, ինչպես նաև աշխատանքների պահպանում ըստ ժամանակացույցի։",
    "Overview (RU)":
      "Изучите практические подходы к управлению строительными проектами от планирования до сдачи. Курс включает координацию стейкхолдеров, контроль затрат и качества, а также соблюдение графика работ.",
    "Topics (EN)":
      "Construction Planning\nDesign and Construction Coordination\nConstruction Scheduling\nCost and Quality Control\nContractor Management\nDigital Project Management with Gectaro",
    "Topics (AM)":
      "Շինարարության պլանավորում\nՆախագծման և շինարարության համակարգում\nՇինարարության ժամանակացույց\nԾախսերի և որակի վերահսկում\nԿատարողների կառավարում\nԹվային նախագծերի կառավարում Gectaro-ով",
    "Topics (RU)":
      "Планирование строительства\nКоординация проектирования и строительства\nГрафик строительства\nКонтроль затрат и качества\nУправление подрядчиками\nЦифровое управление проектами с Gectaro",
    "Outcomes (EN)":
      "Plan construction work in stages and dependencies\nEffectively coordinate design, contractors, and the site\nApply cost and quality control methods throughout the project\nUse digital monitoring methods with modern PM tools",
    "Outcomes (AM)":
      "Պլանավորել շինարարական աշխատանքները փուլերով և կախվածություններով\nԱրդյունավետ համակարգել նախագծումը, կատարողներին և հրապարակը\nԿիրառել ծախսերի և որակի վերահսկման մեթոդներ ամբողջ նախագծի ընթացքում\nԿիրառել թվային մոնիտորինգի մեթոդներ ժամանակակից PM գործիքներով",
    "Outcomes (RU)":
      "Планировать строительные работы по этапам и зависимостям\nЭффективно координировать проектирование, подрядчиков и площадку\nПрименять методы контроля затрат и качества на протяжении всего проекта\nИспользовать методы цифрового мониторинга с современными инструментами PM",
    "Audience (EN)":
      "For construction engineers and site coordinators\nFor developers, contractors, and construction project managers",
    "Audience (AM)":
      "Շինարարական ինժեներների և հրապարակի համակարգողների համար\nԴևելոպերների, կատարողների և շինարարական նախագծերի կառավարիչների համար",
    "Audience (RU)":
      "Для инженеров-строителей и координаторов площадок\nДля девелоперов, подрядчиков и руководителей строительных проектов",
    "Register URL": "https://docs.google.com/forms/",
    "Image URL": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
    Sort: 1,
  },
];

// --- Projects (EN, AM, RU) ---
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
    "Name (AM)": "Zephyr բնակելի թաղամաս",
    "Name (RU)": "Жилой район Zephyr",
    "Description (EN)":
      "Large residential district with modern infrastructure and green zones. We manage project planning, construction, and final delivery.",
    "Description (AM)":
      "Խոշոր բնակելի թաղամաս ժամանակակից ենթակառուցվածքով և կանաչ գոտիներով։ Մենք կառավարում ենք նախագծի պլանավորումը, շինարարությունը և վերջնական հանձնումը։",
    "Description (RU)":
      "Крупный жилой район с современной инфраструктурой и зелеными зонами. Мы управляем планированием, строительством и сдачей проекта.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[0],
    Sort: 0,
  },
  {
    "Name (EN)": "Townhouses in Yeghvard",
    "Name (AM)": "Թաունհաուսներ Եղվարդում",
    "Name (RU)": "Таунхаусы в Егварде",
    "Description (EN)":
      "Boutique urban residential project. We manage the entire process from design coordination to final delivery and launch.",
    "Description (AM)":
      "Բուտիկ քաղաքային բնակելի նախագիծ։ Կառավարում ենք ամբողջ գործընթացը՝ նախագծման համակարգումից մինչև վերջնական հանձնում և շահագործման մեկնարկ։",
    "Description (RU)":
      "Бутиковый городской жилой проект. Управляем всем процессом от координации проектирования до сдачи и запуска.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[1],
    Sort: 1,
  },
  {
    "Name (EN)": "Nur Residential Complex",
    "Name (AM)": "Nur բնակելի համալիր",
    "Name (RU)": "Жилой комплекс Nur",
    "Description (EN)":
      "Residential complex with full development and construction management within a single controlled framework.",
    "Description (AM)":
      "Բնակելի համալիր՝ զարգացման և շինարարության ամբողջական կառավարմամբ մեկ միասնական և վերահսկվող շրջանակում։",
    "Description (RU)":
      "Жилой комплекс с полным управлением девелопментом и строительством в рамках единой контролируемой структуры.",
    Status: "Ongoing",
    "Image URL": PROJECT_IMAGES[2],
    Sort: 2,
  },
  {
    "Name (EN)": "Kanach Tagh Residential District",
    "Name (AM)": "Կանաչ Թաղ բնակելի թաղամաս",
    "Name (RU)": "Жилой квартал Kanach Tagh",
    "Description (EN)":
      "Residential district implemented with a set schedule, controlled budget, and high quality control from concept to completion.",
    "Description (AM)":
      "Բնակելի թաղամաս՝ իրականացված սահմանված ժամանակացույցով, վերահսկվող բյուջեով և բարձր որակի վերահսկմամբ՝ կոնցեպցիայից մինչև ավարտ։",
    "Description (RU)":
      "Жилой квартал, реализованный в установленные сроки, с контролируемым бюджетом и высоким контролем качества от концепции до завершения.",
    Status: "Completed",
    "Image URL": PROJECT_IMAGES[3],
    Sort: 3,
  },
  {
    "Name (EN)": "Level 16 Residential Complex",
    "Name (AM)": "Level 16 բնակելի համալիր",
    "Name (RU)": "Жилой комплекс Level 16",
    "Description (EN)":
      "High-rise residential complex with full project management including tender organization, contractor coordination, and final delivery.",
    "Description (AM)":
      "Բարձրահարկ բնակելի համալիր՝ լիարժեք նախագծերի կառավարմամբ, ներառյալ թենդերների կազմակերպում, կատարողների համակարգում և վերջնական հանձնում։",
    "Description (RU)":
      "Высотный жилой комплекс с полным управлением проектом, включая организацию тендеров, координацию подрядчиков и финальную сдачу.",
    Status: "Completed",
    "Image URL": PROJECT_IMAGES[4],
    Sort: 4,
  },
];

// --- Team (EN, AM, RU) ---
const TEAM = [
  {
    Name: "Management",
    "Name (EN)": "Management",
    "Name (AM)": "Կառավարում",
    "Name (RU)": "Управление",
    "Role (EN)": "Project Management and Strategy",
    "Role (AM)": "Նախագծերի կառավարում և ռազմավարություն",
    "Role (RU)": "Управление проектами и стратегия",
    Sort: 0,
  },
  {
    Name: "Operations",
    "Name (EN)": "Operations",
    "Name (AM)": "Գործառնություններ",
    "Name (RU)": "Операции",
    "Role (EN)": "Construction and Development Implementation",
    "Role (AM)": "Շինարարության և զարգացման իրականացում",
    "Role (RU)": "Реализация строительства и девелопмента",
    Sort: 1,
  },
  {
    Name: "Digital and Systems",
    "Name (EN)": "Digital and Systems",
    "Name (AM)": "Թվային և համակարգեր",
    "Name (RU)": "Цифровые технологии и системы",
    "Role (EN)": "Gectaro System Implementation and Process Management",
    "Role (AM)": "Gectaro համակարգի ներդրում և գործընթացների կառավարում",
    "Role (RU)": "Внедрение системы Gectaro и управление процессами",
    Sort: 2,
  },
];

// --- Hero (EN, AM, RU) ---
const HERO = [
  {
    "Title (EN)": "Construction and Development Project Management",
    "Title (AM)": "Շինարարության և Զարգացման Նախագծերի Կառավարում",
    "Title (RU)": "Управление строительными и девелоперскими проектами",
    "Subtitle (EN)": "Manage with confidence",
    "Subtitle (AM)": "Կառավարեք վստահությամբ",
    "Subtitle (RU)": "Управляйте с уверенностью",
    "Lead (EN)":
      "Construction and development projects are complex. Poor planning leads to delays, budget overruns, and quality issues. We help you avoid them.",
    "Lead (AM)":
      "Շինարարական և զարգացման նախագծերը բարդ են: Վատ պլանավորումը հանգեցնում է ուշացումների, բյուջեի գերազանցման և որակի խնդիրների: Մենք օգնում ենք դրանց խուսափել:",
    "Lead (RU)":
      "Строительные и девелоперские проекты сложны. Плохое планирование ведет к задержкам, перерасходу бюджета и проблемам с качеством. Мы помогаем их избежать.",
    Sort: 0,
  },
];

// --- HeroSlides (EN, AM, RU) ---
const HERO_SLIDES = [
  {
    "Image URL": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    "Alt (EN)": "Construction site",
    "Alt (AM)": "Շինհրապարակ",
    "Alt (RU)": "Строительная площадка",
    Sort: 0,
  },
  {
    "Image URL": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    "Alt (EN)": "Modern building",
    "Alt (AM)": "Ժամանակակից շենք",
    "Alt (RU)": "Современное здание",
    Sort: 1,
  },
  {
    "Image URL": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    "Alt (EN)": "Construction project",
    "Alt (AM)": "Շինարարական նախագիծ",
    "Alt (RU)": "Строительный проект",
    Sort: 2,
  },
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
    const id = record[idField] ?? record.Name ?? record["Title (EN)"] ?? `#${i + 1}`;
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

async function runSeed() {
  if (!TOKEN || !BASE) {
    throw new Error("Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY. Add them to .env in project root and run from project root.");
  }

  console.log("Seeding Airtable base:", BASE);

  const results = {};

  console.log("Courses...");
  results.courses = await seedTable("Courses", COURSES, { idField: "Slug", idLabel: "slug" });
  console.log("");

  console.log("Projects...");
  results.projects = await seedTable("Projects", PROJECTS, { idField: "Name (EN)", idLabel: "name" });
  console.log("");

  console.log("Team...");
  results.team = await seedTable("Team", TEAM, { idField: "Name", idLabel: "name" });
  console.log("");

  try {
    console.log("Hero...");
    results.hero = await seedTable("Hero", HERO, { idField: "Title (EN)", idLabel: "title" });
    console.log("");
  } catch (e) {
    console.warn("  Hero table may not exist:", e.message);
  }

  try {
    console.log("HeroSlides...");
    results.heroSlides = await seedTable("HeroSlides", HERO_SLIDES, { idField: "Sort", idLabel: "slide" });
    console.log("");
  } catch (e) {
    console.warn("  HeroSlides table may not exist:", e.message);
  }

  const totalCreated =
    (results.courses?.created ?? 0) +
    (results.projects?.created ?? 0) +
    (results.team?.created ?? 0) +
    (results.hero?.created ?? 0) +
    (results.heroSlides?.created ?? 0);
  const totalFailed =
    (results.courses?.failed ?? 0) +
    (results.projects?.failed ?? 0) +
    (results.team?.failed ?? 0) +
    (results.hero?.failed ?? 0) +
    (results.heroSlides?.failed ?? 0);

  console.log("Summary:");
  console.log(`  Courses: ${results.courses?.created ?? 0} created, ${results.courses?.failed ?? 0} failed`);
  console.log(`  Projects: ${results.projects?.created ?? 0} created, ${results.projects?.failed ?? 0} failed`);
  console.log(`  Team: ${results.team?.created ?? 0} created, ${results.team?.failed ?? 0} failed`);
  console.log(`  Hero: ${results.hero?.created ?? 0} created, ${results.hero?.failed ?? 0} failed`);
  console.log(`  HeroSlides: ${results.heroSlides?.created ?? 0} created, ${results.heroSlides?.failed ?? 0} failed`);
  console.log(`  Total: ${totalCreated} created, ${totalFailed} failed`);

  if (totalFailed > 0) throw new Error(`${totalFailed} record(s) failed to create.`);
}

async function main() {
  if (!TOKEN || !BASE) {
    console.error("Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY.");
    console.error("  Put them in a .env file in the project root, then run from project root:");
    console.error("  node airtable-setup/seed-records.js");
    console.error("  (Folder is airtable-setup, not airtable.)");
    process.exit(1);
  }
  await runSeed();
  console.log("\nDone. The app will fetch this data from Airtable.");
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { runSeed, createRecord, seedTable, COURSES, PROJECTS, TEAM, HERO, HERO_SLIDES };
