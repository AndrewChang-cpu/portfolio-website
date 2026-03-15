# Interactive Project Demos — Architecture & Implementation Plan

> Embed lightweight, sandboxed versions of real projects directly into the portfolio website so visitors can interact with them in-browser without any backend infrastructure.

---

## Decisions (Resolved)

| Question | Decision |
|---|---|
| **Deployment** | 3 separate Vercel projects, each on a subdomain of `andrew.codes` (`kingseye.andrew.codes`, `scotty.andrew.codes`, `jobtrax.andrew.codes`). Portfolio iframes those URLs. Required for custom subdomains. |
| **Demo fidelity** | Fully functional replicas — all features work, backed by in-browser storage and mock services. No guided walkthrough / limited interactivity. |
| **Dependency versions** | No package version changes. Only the service layer is swapped (new mock files added, imports redirected). Exception: KingsEye Expo 49 web export bugs fixed at config level only. |
| **Project isolation** | Each demo is a fully independent static site on its own subdomain. No shared state. |
| **Mobile** | Scotty Market and KingsEye: fully responsive (Expo web is mobile-native by default). JobTrax: centered fixed-width card (max 480px) — looks like a phone app on all screen sizes, no layout redesign needed. |

---

## Executive Summary

Each project gets a `demo` branch with all external services replaced by in-browser equivalents. Databases become localStorage or sql.js WASM, cloud APIs become static mock responses, and authentication is bypassed. The demos are deployed as separate static Vercel projects on subdomains of `andrew.codes`. The portfolio embeds them via iframe on a `/projects/[slug]/demo` route and links from each project card.

---

## Project Inventory & Analysis

### 1. KingsEye (React Native / Expo — Chess Companion)

**What it does:** A chess companion app. Users log in, play chess against an engine, get best-move suggestions (via Stockfish), save/review past games. Uses a camera to scan physical boards.

| Layer | Production | Demo Replacement |
|---|---|---|
| **Frontend** | React Native (Expo) — screens: Login, Signup, Home, Profile, Game, Camera, Confirmation, Debug | Expo Web build (already has `expo start --web`). Remove Camera screen (requires device hardware). |
| **Auth** | Firebase Auth (email/password + Google Sign-In) | Mock auth — auto-login as "Demo User", skip Login/Signup screens entirely |
| **Database** | MongoDB Atlas (`kings-eye` cluster) — stores users, games | localStorage adapter matching MongoDB API surface. Pre-seed with 3 sample games. |
| **Backend API** | Express server on Heroku — `/bestMove`, `/evaluationScore`, `/principalVariation`, `/signUp`, `/getUser`, `/saveGame`, etc. | **Stockfish runs in-browser via Web Worker + stockfish.js WASM** (the 3.3MB `stockfish.js` is already in the repo). User/game CRUD hits localStorage mock. |
| **Camera/OCR** | expo-camera + image processing for board scanning | Remove entirely — provide a "paste FEN" input instead |

**Key insight:** Stockfish is the core value prop and it already runs in JS/WASM. The chess engine can run client-side with zero server. The MongoDB user store is trivially replaceable with localStorage.

**Demo branch changes:**
- Create `demo` branch from `main`
- Add `src/mock/auth.ts` — exports `FIREBASE_AUTH` mock that auto-returns a demo user
- Add `src/mock/store.ts` — localStorage adapter with `signUp`, `getUser`, `setUserData`, `saveGame`, `updateGame`, `getGames`, `deleteGame`
- Add `src/mock/stockfish-worker.ts` — Web Worker wrapper around existing `src/stockfish.js`
- Replace all `axios` calls (Heroku API) with calls to Stockfish worker or localStorage store
- Initial route goes to Home (skips Login/Signup)
- Remove Camera screen from navigator
- Add FEN-paste input on Game screen as alternative to camera
- `app.json`: set `web.output: "static"` for `expo export:web`
- Pre-seed localStorage with demo user + 3 annotated sample games

---

### 2. Scotty Market (Expo + Express — Gamified Finance)

**What it does:** A gamified personal finance app. Virtual pet "Scotty" that reflects spending health. Users set budgets, track transactions (via Nessie sandbox banking API), get AI-powered spending insights, earn rewards, and feed Scotty.

| Layer | Production | Demo Replacement |
|---|---|---|
| **Frontend** | Expo + React Native (expo-router), screens via `scotty-app/app/` | Expo Web build |
| **Backend** | TypeScript + Express, SQLite (better-sqlite3), REST API on port 3001 | **SQLite → sql.js (in-browser WASM SQLite)**. Route handlers become synchronous functions called directly from the frontend (no HTTP). |
| **Database** | SQLite file (`better-sqlite3`) with migrations + seed data | sql.js with identical schema. Run existing migrations + seed on first page load. Seed data from `backend/src/data/seed-transactions.json`. |
| **AI/LLM** | Anthropic Claude + Dedalus Labs for generating insights, quests, budgets | Pre-generated static JSON with 8 insight objects. Cycled on "refresh". |
| **Nessie Banking API** | External API for sandbox transaction/account data | Existing `backend/src/adapters/mock-bank.ts` used directly. |
| **Auth** | None | N/A |

**Key insight:** This is the easiest demo. Already uses SQLite (not a cloud DB), already has a mock bank adapter, and seed data is checked into the repo. The main work is moving SQLite to in-browser WASM and collapsing the HTTP layer.

**Demo branch changes:**
- Create `demo` branch from `main`
- Add `scotty-app/src/demo/db.ts` — initializes sql.js with existing schema + seed data on app load
- Add `scotty-app/src/demo/api.ts` — re-implements backend route handlers as pure functions over sql.js DB instance (no HTTP)
- Replace `scotty-app/services/` fetch calls with imports from `demo/api.ts`
- Replace Anthropic/Dedalus AI calls with static `demo/insights.json` (8 pre-generated insights)
- Use existing `mock-bank.ts` for transaction/account data
- `app.json`: set `web.output: "static"`

---

### 3. JobTrax (Chrome Extension + Express — Job Application Tracker)

**What it does:** A Chrome extension that tracks job applications via Gmail integration. Uses Google OAuth → Gmail API → Claude AI to parse job emails. Gamification with XP, achievements, streaks, friend system. Data in Firebase Firestore.

| Layer | Production | Demo Replacement |
|---|---|---|
| **Frontend** | Chrome Extension (React 19 + Vite + Tailwind, Manifest V3). Multi-screen popup: Home, Friends, Profile, AddFriend. | **Build as standalone web app.** The popup is already a React SPA — add a `demo/` Vite config that builds it as a standard web page. |
| **Backend** | Express + TypeScript. Routes: `/auth/google`, `/api/v1/refresh/applications`, `/api/v1/user_details`, `/api/v1/achievements`, `/api/v1/friends`, etc. | Static mock service layer. No server needed. |
| **Auth** | Google OAuth 2.0 → Firebase custom tokens | Mock auth — auto-login as demo user on load |
| **Database** | Firebase Firestore | In-memory store pre-seeded with sample data |
| **Gmail API** | Fetches real emails, parses with Claude AI | Skip entirely — pre-populate 15 sample applications |
| **Chrome APIs** | `chrome.storage`, `chrome.runtime`, `chrome.tabs` | `chrome.storage` → localStorage wrapper. Other APIs → no-ops. |
| **Gamification** | XP, levels, achievements, streaks, friend leaderboard | Pre-seed: Level 7, 45 applications, 5-day streak, 8/15 achievements, 3 friends |

**Key insight:** The hardest part is extracting the React popup from the Chrome extension Turbo monorepo build. The popup itself is standard React and can be compiled with a separate Vite config. All data is pre-seeded — gamification is the showcase, not the Gmail parsing.

**Mobile:** Centered card at max-width 480px. Popup's existing layout (designed for 400×600 extension window) naturally feels like a phone app at this size. No layout redesign needed.

**Demo branch changes:**
- Create `demo` branch in `JobTrax` repo (or within `extension/`)
- Add `extension/demo/` — standalone Vite app entry point that mounts the popup React tree
- Add `extension/demo/mock-chrome.ts` — `chrome.storage.local` → localStorage; `chrome.runtime`, `chrome.tabs` → no-ops
- Add `extension/demo/mock-api.ts` — all backend endpoint responses as static data
- Add `extension/demo/seed.ts` — pre-seeded demo state (user, 15 applications, achievements, friends)
- Remove all Firebase/OAuth/Gmail initialization from the demo entry point
- `extension/demo/vite.config.ts` — standalone build config (no extension manifest)
- CSS: wrap in a `max-w-[480px] mx-auto` container for mobile-friendly centering

---

## Architecture: Embedding Demos in Portfolio

### Deployment

| Demo | Subdomain | Build Command | Output |
|---|---|---|---|
| Scotty Market | `scotty.andrew.codes` | `expo export:web` | Static HTML/JS/CSS |
| KingsEye | `kingseye.andrew.codes` | `expo export:web` | Static HTML/JS/CSS |
| JobTrax | `jobtrax.andrew.codes` | `vite build` (demo config) | Static HTML/JS/CSS |

All three are separate Vercel projects. Each has its own Vercel deployment connected to the `demo` branch of its respective repo. Auto-deploys on push to `demo` branch.

The portfolio (`andrew.codes`) is a fourth Vercel project. It iframes the demo subdomains.

### Portfolio Integration

**New route:** `app/projects/[slug]/demo/page.tsx`

**New components:**

| Component | Type | Purpose |
|---|---|---|
| `DemoFrame.tsx` | Client Component | `<iframe>` with loading spinner, error boundary, resize observer for responsive height |
| `DemoHeader.tsx` | Server Component | Project name, tagline, "← Back to Projects" link, link to GitHub repo |
| `DemoDisclaimer.tsx` | Server Component | "Sandboxed demo with sample data. No real accounts, emails, or financial data." |

**Data model change** — add to `Project` interface in `lib/resume.ts`:
```typescript
demoUrl?: string;  // subdomain URL of deployed demo
```

Add to each demoable project in `resume.json`:
```json
{
  "demoUrl": "https://kingseye.andrew.codes"
}
```

**ProjectCard change** — add `[ TRY IT ]` button when `project.demoUrl` is set:
```tsx
{project.demoUrl && (
  <PixelButton label="[ TRY IT ]" href={`/projects/${project.slug}/demo`} variant="primary" />
)}
```

---

## Mock Service Pattern (used across all 3 demos)

Each demo uses a consistent module-swap pattern. On the `demo` branch, a build-time alias redirects service imports to mock implementations:

```
Production:   import { api } from '../services/api'      → real HTTP calls
Demo branch:  import { api } from '../services/api'      → resolves to mock-api.ts
```

This is done via path aliasing in the build config (Expo `tsconfig.json` paths or Vite `resolve.alias`), so no component code changes. Only the service modules are swapped.

---

## Technical Notes

### Stockfish in Browser (KingsEye)
`src/stockfish.js` (already in repo, 3.3MB) runs in a Web Worker:
```js
// stockfish-worker.ts
const worker = new Worker('/stockfish.js');
worker.postMessage('position fen ' + fen);
worker.postMessage('go depth 12');
worker.onmessage = (e) => { /* parse bestmove line */ };
```
Replaces the entire Heroku backend for chess engine endpoints. Loading is lazy with a spinner.

### sql.js for Scotty Market
```js
import initSqlJs from 'sql.js';
const SQL = await initSqlJs({ locateFile: f => `/wasm/${f}` });
const db = new SQL.Database();
// run existing migration SQL, then seed
```
Identical schema and query API to better-sqlite3. The existing migration and seed scripts can be re-used with minimal adaptation.

### Chrome API Mocks (JobTrax)
```typescript
// mock-chrome.ts — injected before extension code loads
window.chrome = {
  storage: {
    local: {
      get: (keys, cb) => { /* read from localStorage */ },
      set: (items, cb) => { /* write to localStorage */ },
    }
  },
  runtime: { sendMessage: () => {}, onMessage: { addListener: () => {} } },
  tabs: { query: () => Promise.resolve([]) },
};
```

---

## Implementation Order

| Phase | Work | Repo | Estimated Effort |
|---|---|---|---|
| **0** | Portfolio: `demoUrl` field, `/projects/[slug]/demo` route, `DemoFrame` component, `ProjectCard` TRY IT button | `portfolio-website` | 0.5 days |
| **1** | Scotty Market demo branch + Vercel deploy | `Scotty-Market` | 2 days |
| **2** | KingsEye demo branch + Vercel deploy | `KingsEye` | 3 days |
| **3** | JobTrax demo branch + Vercel deploy | `JobTrax` | 4 days |
| **Total** | | | **~9.5 days** |

Phase 0 can begin immediately in this repo. Phases 1–3 are work in the respective project repos.

---

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Expo 49 (KingsEye) web export bugs | Medium | Fix at Expo config level only (no package upgrades). Known workarounds exist for Expo 49 web. |
| Stockfish WASM load time (~3.3MB) | Low | Lazy-load via Web Worker; show chess board immediately with "Engine loading…" indicator |
| sql.js WASM (~1MB) load time | Low | Show loading skeleton on first visit; subsequent visits use cached WASM |
| Chrome extension popup styles break as web page | Low | Tailwind classes are portable. Only change needed: remove fixed extension popup dimensions. |
| iframe `localStorage` isolation | None | Each demo is on its own subdomain — localStorage is automatically isolated by browser same-origin policy |
| Expo web incompatibility with `react-native-vision-camera` (KingsEye) | High | Remove Camera screen entirely on demo branch. Replace with FEN-paste input. |
