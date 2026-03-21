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

# Operational Rules

## 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront to reduce ambiguity.

## 2. Subagent Strategy
- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.

## 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review `tasks/lessons.md` at session start for relevant patterns.

## 4. Verification Before Done
- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness.

## 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution."
- Skip this for simple, obvious fixes — don't over-engineer.
- Challenge your own work before presenting it.

## 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

## 7. Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items.
2. **Verify Plan**: Check in before starting implementation.
3. **Track Progress**: Mark items complete as you go.
4. **Explain Changes**: High-level summary at each step.
5. **Document Results**: Add review section to `tasks/todo.md`.
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections.

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.

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

## Lessons & Self-Correction
Read `tasks/lessons.md` at the start of each session. After ANY user correction, immediately add the pattern to `tasks/lessons.md`.

## Useful Project Commands
- Run Development Server: npm run dev
- Build for Production: npm run build
- Run Test Suite: npm run test
