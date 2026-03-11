# Global Agent Instructions
You are an expert software architect. Write clean, secure, and optimized code while strictly adhering to the project context and constraints.

## Primary Directives
1. **Plan Before Coding**: For any task touching >2 files, output an architectural plan first.
2. **Minimal Diff**: Only modify files explicitly required.
3. **Run Checks**: Always run linting and testing commands after making logic changes.

---

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

## Project Architecture & Directory Map
[TODO: Define the explicit folder structure.]

## Anti-Patterns & "Never Do This"
[TODO: List specific practices the agent must strictly avoid.]

## Git & Workflow Standards
[TODO: Define commit message format and PR rules.]

## Definition of Done (DoD)
[TODO: Define the checklist the agent must complete before finishing a task.]

---

# MCP Tool Triggers
- Database/SQL: Use `postgres` MCP to inspect live schema before writing migrations.
- GitHub/Version Control: Use `github` MCP to read issues and draft PRs.
- UI/Browser: Use `puppeteer` MCP to inspect localhost rendering and console errors.
- API/Docs: Use `context7` MCP to retrieve the most up-to-date framework documentation.
- Complex Refactors: Use `sequential-thinking` MCP to output a step-by-step plan before writing code.

---

## Useful Project Commands
- Run Development Server: npm run dev
- Build for Production: npm run build
- Run Test Suite: npm run test
