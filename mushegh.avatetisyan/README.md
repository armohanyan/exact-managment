# Courses site – Mushegh Avetisyan

A small, general-purpose course site: **listing page**, **course detail page** with registration via Google Form, and an **About** page for the instructor. All courses are **hardcoded** in `js/app.js` (no CMS).

## Pages

- **`index.html`** – Lists all courses (project management, coaching, and others). Click a course to open its detail page.
- **`course.html?id=1`** or **`course.html?slug=course-slug`** – One course: title, duration, schedule, images, description, and a “Register” button that opens your Google Form.
- **`about.html`** – Introduces the instructor, Mushegh Avetisyan (background, what he teaches, why learn with him). Uses images from the **`images/`** folder (see below).

## Setup

### Google Form (registration)

In **`js/app.js`** and **`js/course-detail.js`**, set:

- `REGISTER_GOOGLE_FORM_URL`  
Replace `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform` with your real form URL.

### Site URL (for SEO)

Replace **`https://yoursite.com`** with your real site URL in:

- **`sitemap.xml`** – all `<loc>` URLs
- **`robots.txt`** – `Sitemap:` URL
- **`index.html`**, **`about.html`**, **`course.html`** – `og:url`, `canonical`, `hreflang`, `og:image`, and JSON-LD
- **`course.html`** – `<meta name="site-base-url" content="...">`
- **`js/seo-config.js`** – `window.SITE_BASE_URL` (optional, for any JS that needs the base URL)

### Images (SEO-friendly filenames)

Use **descriptive, readable filenames** (lowercase, hyphens). Place files in **`images/`**:

- **`mushegh-avetisyan-instructor-portrait.jpg`** – Main instructor photo (square).
- **`mushegh-avetisyan-coaching-session.jpg`**, **`mushegh-avetisyan-workshop-training.jpg`**, **`mushegh-avetisyan-group-session.jpg`** – Optional gallery.

Course images live in **`images/courses/`** with names like **`project-management-fundamentals.svg`** (placeholders included). Replace with `.jpg` or `.webp` and update the `url` in **`js/app.js`** if you change the extension. See **`images/README.md`** for the full list.

### Adding or editing courses

Edit the **`COURSES`** array in **`js/app.js`**. Each course can have:

- `id`, `documentId`, `title`, `slug`, `excerpt`, `description`
- `duration`, `schedule`
- `images`: array of `{ url, alt }` (optional)
- `registerUrl`: optional; defaults to `REGISTER_GOOGLE_FORM_URL`

## Language (English / Armenian)

The site supports **English** and **Armenian**. Use the **EN | HY** switcher in the header. The choice is saved in `localStorage`. Course titles and excerpts are translated in **`js/app.js`** (e.g. `title_hy`, `excerpt_hy`); static UI strings are in **`js/i18n.js`**.

## SEO

- **Meta & Open Graph:** Unique `title`, `description`, `keywords`, `theme-color`; `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`, `og:locale`, `og:locale:alternate` (hy_AM); Twitter cards.
- **Canonical & hreflang:** Every page has `rel="canonical"` and `rel="alternate" hreflang="en"|"hy"|"x-default"` for English/Armenian.
- **Structured data (JSON-LD):** `WebSite` + `Organization` on the homepage; `Person` on the about page; `Course` on each course detail (injected by JS with name, description, image, provider, url).
- **Sitemap & robots:** **`sitemap.xml`** lists index, about, and all course URLs. **`robots.txt`** allows all and points to the sitemap. Replace the domain with your live URL.
- **Images:** Descriptive filenames (e.g. `mushegh-avetisyan-instructor-portrait.jpg`, `project-management-fundamentals.svg`) and clear `alt` text on all images.

## File structure

```
├── index.html        # Course listing
├── course.html       # Course detail (?id= or ?slug=)
├── about.html        # Instructor (Mushegh Avetisyan)
├── sitemap.xml       # SEO sitemap (update domain)
├── robots.txt        # Points to sitemap (update domain)
├── css/styles.css    # Shared styles
├── images/           # Descriptive filenames (see images/README.md)
│   └── courses/      # One image per course (SVG placeholders included)
├── js/
│   ├── app.js       # Hardcoded COURSES, list rendering
│   ├── i18n.js      # English/Armenian translations + lang switcher
│   ├── seo-config.js # SITE_BASE_URL (optional)
│   └── course-detail.js # Detail page render + Course JSON-LD + og:image
└── README.md
```
