# Portfolio Website — Project Documentation

> Source of truth for current state, backlog, and completed work.
> Design mockups live in `documentation/views/`.

---

## Current State

The application is fully scaffolded and all pages are live. All checks pass:

```
npm run test   → 88 tests, 13 files, all passing
npm run build  → exits 0, all 4 routes statically rendered
npx tsc --noEmit → zero type errors
```

**Stack:** Next.js 16.1.6 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Three.js · Vitest + RTL

---

## Directory Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx                  # Root layout, metadata, global CSS, PixelCursor
│   ├── globals.css                 # Tailwind v4 @theme tokens, pixel palette, scanline overlay,
│   │                               #   cursor: none, cursor-selecting, view-transition keyframes
│   ├── page.tsx                    # / Landing — Server Component
│   ├── experience/page.tsx         # /experience — Work History
│   ├── academics/page.tsx          # /academics — Academic Status
│   └── projects/page.tsx           # /projects — Projects
├── app/components/
│   ├── Navbar.tsx                  # Server Component — renders NavLink (client leaf) + ThemeToggle
│   ├── NavLink.tsx                 # CLIENT COMPONENT — active route + hover ▶ indicator
│   ├── ThemeToggle.tsx             # CLIENT COMPONENT — light/dark toggle, persists to localStorage
│   ├── Footer.tsx                  # Server Component
│   ├── PageBackground.tsx          # Server Component — auto-detects .mp4 alongside .png via fs.existsSync
│   ├── Badge.tsx                   # Server Component — status/placement chip
│   ├── PixelButton.tsx             # Server Component — CTA button or anchor
│   ├── SectionHeader.tsx           # Server Component — pixel-font heading + optional badge
│   ├── HeroContent.tsx             # CLIENT COMPONENT — boot sequence, typewriter name, parallax
│   ├── PixelCursor.tsx             # CLIENT COMPONENT — custom crosshair cursor, cursor-selecting toggle
│   ├── ExperienceTimeline.tsx      # Server Component — alternating two-column grid timeline
│   ├── SkillInventory.tsx          # Server Component — skill grid with RPG level bars on hover
│   ├── EducationCard.tsx           # Server Component — single school card
│   ├── CourseTable.tsx             # Server Component — course inventory table
│   ├── QuestLog.tsx                # Server Component — hackathon list with badges
│   ├── ProjectGrid.tsx             # CLIENT COMPONENT — filter useState + project grid
│   ├── ProjectCard.tsx             # Server Component — single project card
│   ├── ExtracurricularsPanel.tsx   # Server Component — extracurricular activities
│   ├── HeroScene.tsx               # CLIENT COMPONENT — Three.js WebGL scene (landing bg)
│   └── HeroSceneWrapper.tsx        # CLIENT COMPONENT — thin shell for dynamic import (ssr:false)
├── data/
│   ├── resume.txt                  # Raw resume source (do not modify)
│   └── resume.json                 # Single source of truth for all portfolio content
├── lib/
│   ├── resume.ts                   # TypeScript interfaces + data loading utilities
│   └── sprites.ts                  # Three.js pixel sprite type + BIKE_RIDER / STAR data
├── public/images/
│   ├── backgrounds/                # PNG + MP4 background art per page
│   └── schools/                    # TODO: add CMU and Mizzou campus photos
├── __tests__/
│   ├── setup.ts
│   ├── lib/resume.test.ts
│   └── components/
│       ├── Badge.test.tsx
│       ├── PixelButton.test.tsx
│       ├── ExperienceTimeline.test.tsx
│       ├── CourseTable.test.tsx
│       ├── QuestLog.test.tsx
│       ├── ProjectCard.test.tsx
│       ├── ProjectGrid.test.tsx
│       ├── SkillInventory.test.tsx
│       ├── NavLink.test.tsx
│       ├── ThemeToggle.test.tsx
│       ├── PixelCursor.test.tsx
│       └── HeroContent.test.tsx
├── documentation/
│   ├── PLAN.md                     # This file
│   └── views/                      # Design mockup PNGs
├── vitest.config.ts
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

### Pages

| Route | Page | Background | Client Components |
|---|---|---|---|
| `/` | Landing/Hero | landing-bg.png (+ .mp4 auto-detected) | `HeroContent`, `PixelCursor` |
| `/experience` | Work History | experience-bg.mp4 / .png | `NavLink`, `ThemeToggle` |
| `/academics` | Academic Status | academics-bg.png | `NavLink`, `ThemeToggle` |
| `/projects` | Projects | projects-bg.png | `ProjectGrid`, `NavLink`, `ThemeToggle` |

### Data Flow

```
data/resume.json → lib/resume.ts utilities → Server Component pages → component props
```

### Client Components

| Component | Reason |
|---|---|
| `NavLink.tsx` | `usePathname()`, `useState` hover — active route detection |
| `ThemeToggle.tsx` | `localStorage`, `document.documentElement` — browser APIs |
| `HeroContent.tsx` | `useState` + `setTimeout` boot sequence, `useRef` parallax |
| `PixelCursor.tsx` | `window.addEventListener('mousemove')`, DOM mutation |
| `ProjectGrid.tsx` | Filter `useState`; receives all project data as props from server parent |
| `HeroScene.tsx` | Three.js requires browser APIs (`window`, WebGL) |
| `HeroSceneWrapper.tsx` | `next/dynamic` with `ssr: false` must be inside a Client Component |

### Theming Architecture

All colors flow from a single source:
1. `:root` (light) and `[data-theme="dark"]` CSS vars (`--px-*`)
2. `@theme inline` Tailwind tokens reference those vars
3. All components use semantic Tailwind classes (`text-pixel-accent`, etc.)
4. `ThemeToggle` sets `data-theme` on `<html>` + persists to `localStorage`
5. `suppressHydrationWarning` on `<html>` prevents hydration mismatch

### Background Auto-Detection (PageBackground.tsx)

`getVideoUrl()` uses `fs.existsSync` server-side to check for `.mp4` alongside `.png`.
Drop an `.mp4` file next to a `.png` background and it automatically becomes a looping video.

### Tailwind v4 Notes

No `tailwind.config.ts` — all custom tokens live in `app/globals.css` `@theme inline {}` block.
`@import url(...)` for Google Fonts **must precede** `@import "tailwindcss"`.

---

## Prioritized Backlog

### P0 — Blocking / Visual completeness

- [ ] **School photos** — Add `public/images/schools/cmu.jpg` and `mizzou.jpg`; wire into `EducationCard`
- [ ] **Add more projects** — only 2 projects in resume.json; mockup shows fuller grid. Add 3–5 real projects with github/live links

### P1 — Content & polish

- [ ] **Expand project categories** — add `'FULL_STACK'`, `'ML'` etc. as real projects are added; update `ProjectCategory` type and filter bar
- [ ] **Mobile nav** — Navbar links wrap awkwardly on small screens; add hamburger/drawer for <640px
- [ ] **Open Graph / SEO meta** — per-page `<head>` metadata (og:image, og:title, description) in each `page.tsx`
- [ ] **Keyboard navigation audit** — verify all interactive elements are reachable via Tab; add visible focus rings where missing
- [ ] **Resume PDF download** — PixelButton linking to a hosted PDF in `public/`

### P2 — Enhancement

- [ ] **Project detail pages** — `/projects/[slug]` dynamic route with full case-study content
- [ ] **Puppeteer visual regression** — screenshot all 4 routes at 768px and 1280px, compare against `documentation/views/` mockups
- [ ] **Deployed URL** — deploy to Vercel; add URL to README and personal info

### P3 — Nice to have

- [ ] **Blog / devlog section** — optional `/devlog` route using MDX
- [ ] **Bike HUD** — retro in-game overlay showing speed/distance/items on landing page

---

## Completed

- [x] Next.js 16 App Router project scaffolded (TypeScript, Tailwind v4, Turbopack)
- [x] `three` + `@types/three` installed
- [x] Vitest + React Testing Library configured (`vitest.config.ts`, `__tests__/setup.ts`)
- [x] `data/resume.json` fully populated from `resume.txt`
- [x] `lib/resume.ts` — all interfaces and utility functions
- [x] `app/globals.css` — Tailwind v4 `@theme` tokens, dual-theme CSS vars (`:root` light / `[data-theme="dark"]`), scanline overlay, `font-pixel` class, `cursor: none`, page view transitions
- [x] `app/layout.tsx` — root layout with `suppressHydrationWarning`, `PixelCursor` mounted globally
- [x] Primitive components: `Badge`, `PixelButton`, `SectionHeader`
- [x] Layout components: `Navbar`, `Footer`, `PageBackground` (auto-detects .mp4 alongside .png)
- [x] `ExperienceTimeline` — two-column CSS grid alternating layout, accent-colored timeline line, centered dots
- [x] `SkillInventory` — skill grid with RPG proficiency level bars (hover reveal, 5 blocks, `aria-label`)
- [x] `/academics` page: `EducationCard`, `CourseTable`, `QuestLog`, `ExtracurricularsPanel`
- [x] `/projects` page: `ProjectCard`, `ProjectGrid` (client-side filter)
- [x] **Custom pixel crosshair cursor** (`PixelCursor.tsx`) — zero-size container, 4 arms, 4px gap, hides over nav links
- [x] **Terminal boot sequence** (`HeroContent.tsx`) — `> INITIALIZING...`, typewriter name, tagline reveal, CTA buttons
- [x] **Hero parallax** (`HeroContent.tsx`) — mouse movement shifts card ±4px, direct DOM mutation
- [x] **Nav ▶ active indicator** (`NavLink.tsx`) — renders only when `isActive && hovered`, no persistent animation
- [x] **Page pixel-wipe transitions** — CSS View Transitions API, `steps(4)` slide keyframes
- [x] **Dark/light mode toggle** (`ThemeToggle.tsx`) — `data-theme` attribute, `localStorage` persistence
- [x] **`cursor-selecting` CSS class** — `body.cursor-selecting nav a:hover::before` shows blinking ▶
- [x] `HeroScene.tsx` — Three.js orthographic camera, DataTexture sprites, bike animation (landing bg removed from page, component retained)
- [x] 88 unit tests across 13 test files — all passing
- [x] `npm run build` exits 0
- [x] `npx tsc --noEmit` zero errors
- [x] `AGENTS.md` and `CLAUDE.md` documented
