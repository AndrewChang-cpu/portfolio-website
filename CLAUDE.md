# Global Agent Instructions

You are an expert software architect. Write clean, secure, and optimized code while strictly adhering to the project context and constraints.

## Primary Directives

1. **Plan Before Coding** — For any task touching >2 files, output an architectural plan first.
2. **Minimal Diff** — Only modify files explicitly required.
3. **Run Checks** — Always run linting and testing commands after making logic changes.

---

# Project Context

- **Name**: Interactive Developer Portfolio — Andrew Chang
- **Stack**: Next.js 16 (App Router, Turbopack), TypeScript, React 19, Tailwind CSS v4, Three.js
- **Design**: Retro 8-bit pixel aesthetic. "Press Start 2P" pixel font for headings, monospace body. Monochrome gray palette. Per-page 8-bit background art (placeholders in `public/images/backgrounds/`).
- **Architecture**: Component-driven UI with strict separation of concerns. All portfolio content is statically sourced from `data/resume.json`. UI is functional components in `app/components/`. Next.js Server Components by default; Three.js WebGL isolated exclusively to `HeroScene.tsx`.

---

# Project Architecture

Full directory map and current state: `documentation/PLAN.md`

## Key Facts

**Tailwind v4** — config lives entirely in `app/globals.css` inside `@theme inline {}`. There is no `tailwind.config.ts`.

**Only 3 Client Components** (adding more requires explicit justification):

| Component | Reason |
|---|---|
| `HeroScene.tsx` | Three.js requires browser APIs |
| `HeroSceneWrapper.tsx` | `next/dynamic` with `ssr: false` must be inside a Client Component |
| `ProjectGrid.tsx` | Filter `useState` |

**Data flow**: `data/resume.json` → `lib/resume.ts` → Server Component pages → component props

**Exported utilities** (`lib/resume.ts`): `getResumeData`, `getPersonal`, `getEducation`, `getExperience`, `getSkills(category?)`, `getProjects(category?)`, `getHackathons`

---

# Agent Constraints

- **Test Coverage**: All data utilities (`lib/resume.ts`) and core UI components must have Vitest + React Testing Library unit tests in `__tests__/`.
- **Code Style**: Functional React components with Hooks. Strict TypeScript — all props fully typed against interfaces in `lib/resume.ts`. Absolute imports via `@/`. Tailwind utility classes only — no inline CSS (one approved exception: `style={{ backgroundImage }}` in `PageBackground.tsx`).

---

# Anti-Patterns — Never Do This

- **Never import `three` outside a `'use client'` component.** It will crash the server renderer.
- **Never use inline CSS** except the one approved exception: `style={{ backgroundImage: ... }}` in `PageBackground.tsx`.
- **Never hard-code portfolio content in JSX.** All text content must come from `data/resume.json` via `lib/resume.ts`.
- **Never add `'use client'` to avoid a TypeScript error.** Only the 3 listed components are permitted Client Components.
- **Never use `any` type.** All props and return types must be fully typed against interfaces in `lib/resume.ts`.
- **Never use `<img>` directly.** Always use Next.js `<Image>` for optimized loading.
- **Never skip `alt` attributes on images.**
- **Never commit `resume.json` with placeholder or stub bullet points.**
- **Never create a new utility** when an existing one in `lib/resume.ts` already covers the use case.

---

# Git & Workflow Standards

**Branch naming**: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`, `test/<scope>`

**Commit message format** (Conventional Commits):
```
feat(timeline): add alternating layout for experience entries
fix(hero): resolve animation frame leak on component unmount
chore(data): populate resume.json with real experience bullets
test(resume): add unit tests for getProjects filter utility
```

**PR Rules**: Every PR must pass `npm run build`, `npm run test`, and `npx tsc --noEmit`. No `any` types. New components need tests. Squash merge to `main`.

---

# Definition of Done

A task is complete only when ALL of the following are true:

- [ ] `npm run build` exits 0
- [ ] `npm run test` passes (currently 51 tests, 8 files)
- [ ] `npx tsc --noEmit` reports zero errors
- [ ] No `any` types introduced
- [ ] No inline CSS added (except the approved `PageBackground.tsx` exception)
- [ ] All new data-driven components receive content exclusively via props from `lib/resume.ts`
- [ ] New UI components have a corresponding test in `__tests__/components/`
- [ ] New data utilities have a corresponding test in `__tests__/lib/resume.test.ts`
- [ ] Placeholder `TODO` comments are present wherever real assets are missing
- [ ] `HeroScene` `useEffect` return implements cleanup: `renderer.dispose()`, cancel animation frame, disconnect ResizeObserver

---

# MCP Tool Triggers

Read `.vibe/mcp-triggers.md` before executing complex tasks or using external tools.

- **Database/SQL**: Use `postgres` MCP to inspect live schema before writing migrations.
- **GitHub/Version Control**: Use `github` MCP to read issues and draft PRs.
- **UI/Browser**: Use `puppeteer` MCP to screenshot localhost routes and check console errors.
- **API/Docs**: Use `context7` MCP to retrieve up-to-date Next.js / Three.js / Tailwind documentation.
- **Complex Refactors**: Use `sequential-thinking` MCP to output a step-by-step plan before writing code.

---

# Memory
Project memory lives in `memory/`. Read `memory/INDEX.md` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
Claude Code: reconcile this folder with your native `.claude/projects/.../memory/` store.

---

# Useful Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run test       # Run Vitest test suite
npm run test:watch # Watch mode
npx tsc --noEmit   # Type check only
```
