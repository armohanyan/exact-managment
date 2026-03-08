# Exact Management – Website

Modern, professional website for **Exact Management**, a construction and development project management company. Built with **Next.js 14**, TypeScript, and Tailwind CSS. Design inspired by the Mushegh Avetisyan courses site: clean typography (DM Sans, Fraunces), structured layout, and brand colors from the Exact Management logo (teal primary, lime accent).

## Structure

- **Home** – Hero, value proposition, “Why Choose Exact Management” cards, CTA
- **About** – Mission, professional areas, team
- **Services** – Development & construction PM, tenders, planning & cost control
- **Projects** – Grid of completed and ongoing projects (placeholder images)
- **Gectaro** – Digital platform description and services
- **Training** – Course cards (Project Management Fundamentals, Construction PM) with “Register Now”
- **FAQ** – Accordion with common questions
- **Contact** – Phone, website, CTA

## Design

- **Colors:** Primary teal (`#1e4d4b`), accent lime (`#b8d430`), light grey/muted text, cream background (`#f8f7f4`)
- **Fonts:** DM Sans (body), Fraunces (headings)
- **Components:** Reusable Hero, Card, CTA, FAQ accordion, and **PlaceholderImage** for easy image swap later

## Getting started

```bash
cd exact.managment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replacing placeholder images

1. Add your images under `public/images/` (e.g. `hero.jpg`, `construction.jpg`, `team.jpg`).
2. Use the **PlaceholderImage** component with the `src` prop:
   ```tsx
   <PlaceholderImage src="/images/hero.jpg" alt="Construction site" theme="construction" />
   ```
3. Optional: use themes `construction`, `building`, `planning`, `team` for consistent alt text and layout.

## Logo

Copy logo files from `logos/` into `public/logos/`. Then in `src/components/Header.tsx` you can switch from the text “Exact Management” to an `<Image src="/logos/image.png" … />` (see `public/logos/README.md`).

## Build

```bash
npm run build
npm start
```

## Two applications in this repo

This folder (`exact.managment`) is the **new** Exact Management Next.js app. The **mushegh.avatetisyan** folder in the parent directory is the separate courses site (static HTML/CSS/JS). Keep both as two separate applications in the same repo.
