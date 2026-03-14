# Project Context
- Name: Interactive Developer Portfolio
- Stack: Next.js (App Router), TypeScript, React, Tailwind CSS, Three.js
- Architecture: Component-driven UI with a strict separation of concerns. Data is statically sourced from data/resume.json to populate sections like Education, Experience, Projects, and Hackathons. UI elements are built as functional components in the app/components/ directory. Next.js Server Components should be used by default, isolating Three.js WebGL rendering exclusively to Client Components

# Agent Constraints
- Test Coverage: All data-parsing utilities and core UI components must include Jest or Vitest unit tests.
- Code Style: Follow best practices for React development and future-proofing for later development. Use functional React components with Hooks. Enforce strict TypeScript typing for all component props, ensuring interfaces perfectly mirror the structured resume data. Prefer absolute imports (e.g., @/components/ExperienceTimeline) and avoid inline CSS in favor of Tailwind utility classes

## Extended Capabilities
ALWAYS read `.vibe/mcp-triggers.md` before executing complex tasks or using external tools.


---

# MCP Tool Triggers
- Database/SQL: Use `postgres` MCP to inspect live schema before writing migrations.
- GitHub/Version Control: Use `github` MCP to read issues and draft PRs.
- UI/Browser: Use `puppeteer` MCP to inspect localhost rendering and console errors.
- API/Docs: Use `context7` MCP to retrieve the most up-to-date framework documentation.
- Complex Refactors: Use `sequential-thinking` MCP to output a step-by-step plan before writing code.


---

## Memory
Project memory lives in `memory/`. Read `memory/INDEX.md` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
If you have a native memory system, reconcile it with the `memory/` folder at session start.
