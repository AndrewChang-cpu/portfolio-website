# Portfolio Website — Project Documentation

> Source of truth for current state, backlog, and completed work.
> Design mockups live in `documentation/views/`.

---

## Current State

The application is fully scaffolded and all four pages are live. All checks pass:

```
npm run test   → 51 tests, 8 files, all passing
npm run build  → exits 0, all 4 routes statically rendered
npx tsc --noEmit → zero type errors
```

**Stack:** Next.js 16.1.6 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Three.js · Vitest + RTL

---

## Directory Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx                  # Root layout, metadata, global CSS
│   ├── globals.css                 # Tailwind v4 @theme tokens, pixel palette, scanline overlay
│   ├── page.tsx                    # / Landing — Server Component
│   ├── experience/page.tsx         # /experience — Work History
│   ├── academics/page.tsx          # /academics — Academic Status
│   └── projects/page.tsx           # /projects — Projects
├── app/components/
│   ├── Navbar.tsx                  # Server Component
│   ├── Footer.tsx                  # Server Component
│   ├── PageBackground.tsx          # Server Component — per-page background wrapper
│   ├── Badge.tsx                   # Server Component — status/placement chip
│   ├── PixelButton.tsx             # Server Component — CTA button or anchor
│   ├── SectionHeader.tsx           # Server Component — pixel-font heading + optional badge
│   ├── HeroScene.tsx               # CLIENT COMPONENT — Three.js WebGL scene
│   ├── HeroSceneWrapper.tsx        # CLIENT COMPONENT — thin shell for dynamic import (ssr:false)
│   ├── ExperienceTimeline.tsx      # Server Component — alternating vertical timeline
│   ├── SkillInventory.tsx          # Server Component — skill grid by category
│   ├── EducationCard.tsx           # Server Component — single school card
│   ├── CourseTable.tsx             # Server Component — course inventory table
│   ├── QuestLog.tsx                # Server Component — hackathon list with badges
│   ├── ProjectGrid.tsx             # CLIENT COMPONENT — filter useState + project grid
│   └── ProjectCard.tsx             # Server Component — single project card
├── data/
│   ├── resume.txt                  # Raw resume source (do not modify)
│   └── resume.json                 # Single source of truth for all portfolio content
├── lib/
│   ├── resume.ts                   # TypeScript interfaces + data loading utilities
│   └── sprites.ts                  # Three.js pixel sprite type + BIKE_RIDER / STAR data
├── public/images/
│   ├── backgrounds/                # TODO: replace .txt placeholders with real 8-bit PNGs
│   └── schools/                    # TODO: add CMU and Mizzou campus photos
├── __tests__/
│   ├── setup.ts
│   ├── lib/resume.test.ts
│   └── components/                 # Badge, PixelButton, ExperienceTimeline, CourseTable,
│                                   #   QuestLog, ProjectCard, ProjectGrid
├── documentation/
│   ├── PLAN.md                     # This file
│   └── views/                      # Design mockup PNGs (source of truth for layout)
├── vitest.config.ts
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

### Pages

| Route | Page | Background | Client Components |
|---|---|---|---|
| `/` | Landing/Hero | landing-bg.png | `HeroSceneWrapper` → `HeroScene` |
| `/experience` | Work History | experience-bg.png | — |
| `/academics` | Academic Status | academics-bg.png | — |
| `/projects` | Projects | projects-bg.png | `ProjectGrid` |

### Data Flow

```
data/resume.json → lib/resume.ts utilities → Server Component pages → component props
```

### Client Components (only 3 permitted)

| Component | Reason |
|---|---|
| `HeroScene.tsx` | Three.js requires browser APIs (`window`, WebGL) |
| `HeroSceneWrapper.tsx` | `next/dynamic` with `ssr: false` must be inside a Client Component |
| `ProjectGrid.tsx` | Holds filter `useState`; receives all project data as props from server parent |

### Tailwind v4 Notes

Tailwind v4 uses CSS-based config — there is no `tailwind.config.ts`. All custom tokens live in the `@theme inline` block in `app/globals.css`:
- `--color-pixel-*` — full monochrome pixel palette
- `--font-pixel` — "Press Start 2P"
- `--animate-blink`, `--animate-scanline` — keyframe animations

`@import url(...)` for Google Fonts **must precede** `@import "tailwindcss"`.

---

## Prioritized Backlog

### P0 — Blocking / Visual completeness

- [ ] **8-bit background art** — Replace the four `.txt` placeholder files in `public/images/backgrounds/` with real PNG art:
  - `landing-bg.png` — Hunt Library pixel scene (dark navy)
  - `experience-bg.png` — 8-bit city skyline (dark slate)
  - `academics-bg.png` — 8-bit field/meadow (dark green-gray)
  - `projects-bg.png` — 8-bit space/stars (near-black)
- [ ] **School photos** — Add `public/images/schools/cmu.jpg` and `mizzou.jpg`; wire into `EducationCard`

### P1 — Content & polish

- [ ] **Add more projects to resume.json** — only 2 projects exist; the mockup shows a fuller grid
- [ ] **Expand project categories** — add `'FULL_STACK'`, `'ML'` etc. as real projects are added, update `ProjectCategory` type and filter bar
- [ ] **Mobile nav** — Navbar links wrap awkwardly on small screens; add a hamburger/drawer for <640px
- [ ] **Active nav link highlight** — current route should be visually distinguished in the Navbar
- [ ] **Puppeteer visual regression** — screenshot all 4 routes at 768px and 1280px, compare against `documentation/views/` mockups

### P2 — Enhancement

- [ ] **Project detail pages** — `/projects/[slug]` dynamic route with full case-study content
- [ ] **Open Graph / SEO meta** — per-page `<head>` metadata (og:image, og:title, description)
- [ ] **Smooth page transitions** — pixel-wipe or fade between routes using View Transitions API
- [ ] **Keyboard navigation audit** — verify all interactive elements are reachable and announced correctly
- [ ] **Deployed URL** — deploy to Vercel; add URL to README and personal info

### P3 — Nice to have

- [ ] **Dark/light mode toggle** — currently forced dark; add theme toggle if desired
- [ ] **Resume PDF download** — PixelButton linking to a hosted PDF
- [ ] **Blog / devlog section** — optional `/devlog` route using MDX

---

## Completed

- [x] Next.js 16 App Router project scaffolded (TypeScript, Tailwind v4, Turbopack)
- [x] `three` + `@types/three` installed
- [x] Vitest + React Testing Library configured (`vitest.config.ts`, `__tests__/setup.ts`)
- [x] `data/resume.json` fully populated from `resume.txt`
- [x] `lib/resume.ts` — all interfaces and utility functions (`getResumeData`, `getPersonal`, `getEducation`, `getExperience`, `getSkills`, `getProjects`, `getHackathons`)
- [x] `lib/sprites.ts` — `PixelSprite` type + `BIKE_RIDER_SPRITE` + `STAR_SPRITE`
- [x] `app/globals.css` — Tailwind v4 `@theme` tokens, pixel palette, scanline overlay, `font-pixel` class
- [x] `app/layout.tsx` — root layout with metadata
- [x] Primitive components: `Badge`, `PixelButton`, `SectionHeader`
- [x] Layout components: `Navbar`, `Footer`, `PageBackground`
- [x] `HeroScene.tsx` — Three.js orthographic camera, DataTexture sprites, bike animation, ResizeObserver, full useEffect cleanup
- [x] `HeroSceneWrapper.tsx` — Client Component shell for `next/dynamic` with `ssr: false`
- [x] `/experience` page: `ExperienceTimeline` (alternating layout), `SkillInventory`
- [x] `/academics` page: `EducationCard`, `CourseTable`, `QuestLog`
- [x] `/projects` page: `ProjectCard`, `ProjectGrid` (client-side filter)
- [x] `/` landing page: hero section, stats bar, CTA buttons
- [x] 51 unit tests across 8 test files — all passing
- [x] `npm run build` exits 0
- [x] `npx tsc --noEmit` zero errors
- [x] `AGENTS.md` and `CLAUDE.md` fully documented
