# Images folder

Use **descriptive, SEO-friendly filenames** (lowercase, words separated by hyphens). Search engines and screen readers use file paths and alt text.

## About page (instructor)

Place your coach/training images in the project root `images/` folder:

| Filename | Purpose |
|----------|--------|
| **mushegh-avetisyan-instructor-portrait.jpg** | Main instructor photo (square, e.g. 600×600 px) |
| **mushegh-avetisyan-coaching-session.jpg** | One-on-one or coaching session |
| **mushegh-avetisyan-workshop-training.jpg** | Workshop or training scene |
| **mushegh-avetisyan-group-session.jpg** | Group or classroom session |

If a file is missing, the page shows a placeholder instead of a broken image.

## Course images

The **`courses/`** subfolder contains one image per course (descriptive filenames matching the course topic):

| Filename | Course |
|----------|--------|
| **project-management-fundamentals.svg** | Project Management Fundamentals |
| **agile-scrum-practice.svg** | Agile & Scrum in Practice |
| **leadership-project-managers.svg** | Leadership for Project Managers |
| **professional-career-coaching.svg** | Professional & Career Coaching |
| **crisis-management-decision-making.svg** | Crisis Management & Decision-Making |

These are placeholder SVGs by default. For best SEO and visuals, replace them with real photos (same filenames with `.jpg` or `.webp`) and update the `images` array in **`js/app.js`** to use the new extension (e.g. `project-management-fundamentals.jpg`).
