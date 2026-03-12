---
type: project
updated: 2026-03-11
---

# Project State

**Status**: All four pages implemented and passing all checks.
- `npm run test` → 51 tests, 8 files, all passing
- `npm run build` → exits 0, all 4 routes statically rendered
- `npx tsc --noEmit` → zero errors

**Stack**: Next.js 16.1.6 (App Router, Turbopack), TypeScript, React 19, Tailwind CSS v4, Three.js, Vitest + RTL

**Active backlog**: see `documentation/PLAN.md` for prioritized backlog.
Top P0 items: 8-bit background art PNGs, school photos for EducationCard.

**Key decisions**:
- Tailwind v4 uses CSS-based config in `app/globals.css` (@theme block) — no `tailwind.config.ts`
- `next/dynamic` with `ssr: false` requires a Client Component wrapper → `HeroSceneWrapper.tsx`
- `@import url(...)` for Google Fonts must precede `@import "tailwindcss"` in globals.css
- Only 3 Client Components permitted: `HeroScene.tsx`, `HeroSceneWrapper.tsx`, `ProjectGrid.tsx`
- All content sourced from `data/resume.json` via `lib/resume.ts` — never hard-coded in JSX
