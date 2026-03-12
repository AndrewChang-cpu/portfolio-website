#!/bin/bash
# Universal AI Agent Environment Bootstrapper
# Cross-Platform: Works on Linux and Windows (via cmd calling bash)
# NOTE: On Windows, Claude MCP registration is handled by vibe-setup.bat
#       Run vibe-setup.bat from cmd instead of this script directly.

echo "[INFO] Initializing AI Agent Environment in $PWD..."

# ==============================================================================
# 0. DETECT OS
# ==============================================================================
IS_WINDOWS=false
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OS" == "Windows_NT" || -n "$WSL_DISTRO_NAME" ]]; then
  IS_WINDOWS=true
  echo "[INFO] Detected Windows"
else
  echo "[INFO] Detected Linux/macOS"
fi

# ==============================================================================
# 1. UNIVERSAL BASE
# ==============================================================================
echo "[INFO] Configuring Universal Base directories..."

source .env
mkdir -p .vibe/skills

if [ ! -f .vibe/rules.md ]; then
cat << 'EOF' > .vibe/rules.md
# Project Context
- Name: Interactive Developer Portfolio
- Stack: Next.js (App Router), TypeScript, React, Tailwind CSS, Three.js
- Architecture: Component-driven UI. Next.js Server Components by default; Three.js WebGL restricted to Client Components. Data sourced from data/resume.json.

# Agent Constraints
- Test Coverage: Core UI components must include Jest/Vitest unit tests.
- Code Style: Functional React components, strict TypeScript typing, absolute imports, Tailwind utility classes.
EOF
echo "[CREATED] .vibe/rules.md"
fi

if [ ! -f .vibe/mcp-triggers.md ]; then
cat << 'EOF' > .vibe/mcp-triggers.md
# MCP Tool Triggers
- Database/SQL: Use postgres MCP to inspect live schema.
- GitHub/VC: Use github MCP to read issues and draft PRs.
- UI/Browser: Use puppeteer MCP to inspect localhost rendering.
- API/Docs: Use context7 MCP for framework documentation.
- Planning: Use sequential-thinking MCP before writing code.
EOF
echo "[CREATED] .vibe/mcp-triggers.md"
fi

# ------------------------------------------------------------------------------
# 1b. PROJECT MEMORY
# ------------------------------------------------------------------------------
echo "[INFO] Initializing project memory..."

mkdir -p memory

if [ ! -f memory/INDEX.md ]; then
cat << 'EOF' > memory/INDEX.md
# Memory Index

Read this file at the start of every session to orient yourself.
Update the relevant memory files after completing significant work.

| File | Type | Description |
|---|---|---|
| user.md | user | Owner preferences, working style, expertise |
| project.md | project | Current state, active goals, key decisions |
| feedback.md | feedback | Corrections and things to avoid repeating |
| reference.md | reference | Where things live — external systems, URLs, docs |

## Memory Format

Each memory file uses this structure:

```markdown
---
type: user | project | feedback | reference
updated: YYYY-MM-DD
---

[content]
```

For **feedback** and **project** entries, include:
- The rule or fact
- **Why:** the reason behind it
- **How to apply:** when this guidance kicks in

## Notes for AI models

- **Claude Code**: reconcile this folder with your native `.claude/projects/.../memory/` store.
  Prefer the repo copy for project/feedback/reference; prefer your native store for user preferences.
- **All other models**: this folder is your only persistent memory. Read it at session start;
  write back any new learnings before the session ends.
- Do not save: code patterns, file structure, or anything already in CLAUDE.md/AGENTS.md.
- Do not duplicate entries. Update existing files rather than creating new ones.
EOF
echo "[CREATED] memory/INDEX.md"
fi

if [ ! -f memory/user.md ]; then
cat << 'EOF' > memory/user.md
---
type: user
updated: YYYY-MM-DD
---

# User Profile

[To be populated as preferences and working style become clear.]

Examples of what belongs here:
- Preferred response length and format
- Domain expertise (what to assume vs. explain)
- Tool and workflow preferences
EOF
echo "[CREATED] memory/user.md"
fi

if [ ! -f memory/project.md ]; then
cat << 'EOF' > memory/project.md
---
type: project
updated: YYYY-MM-DD
---

# Project State

[To be populated after first working session.]

Examples of what belongs here:
- Current build status (passing/failing)
- Active workstreams and their status
- Key architectural decisions and why they were made
- Known blockers or TODOs
EOF
echo "[CREATED] memory/project.md"
fi

if [ ! -f memory/feedback.md ]; then
cat << 'EOF' > memory/feedback.md
---
type: feedback
updated: YYYY-MM-DD
---

# Feedback & Corrections

[Populated when the user corrects AI behavior.]

Format per entry:
**Rule**: [what to do / not do]
**Why**: [reason the user gave]
**How to apply**: [when this kicks in]
EOF
echo "[CREATED] memory/feedback.md"
fi

if [ ! -f memory/reference.md ]; then
cat << 'EOF' > memory/reference.md
---
type: reference
updated: YYYY-MM-DD
---

# External References

[Populated as external systems are introduced.]

Examples of what belongs here:
- Issue tracker project names/URLs
- Key dashboard or monitoring URLs
- Relevant documentation pages
- Environment-specific connection strings (non-secret)
EOF
echo "[CREATED] memory/reference.md"
fi

RULES_CONTENT=$(cat .vibe/rules.md)
MCP_CONTENT=$(cat .vibe/mcp-triggers.md)

# ==============================================================================
# 2. CURSOR CONFIGURATION
# ==============================================================================
echo "[INFO] Configuring Cursor..."

mkdir -p .cursor/rules

# Cursor MCP config differs: Windows needs 'cmd /c' wrappers, Linux runs npx directly
if [ ! -f .cursor/mcp.json ]; then
  if [ "$IS_WINDOWS" = true ]; then
cat << 'EOF' > .cursor/mcp.json
{
  "mcpServers": {
    "postgres": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/postgres"]
    },
    "github": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-github"]
    },
    "sequential-thinking": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "puppeteer": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "context7": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@upstash/context7-mcp"]
    }
  }
}
EOF
  else
cat << 'EOF' > .cursor/mcp.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/postgres"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
EOF
  fi
  echo "[CREATED] .cursor/mcp.json"
fi

cp .vibe/rules.md .cursor/rules/000-main-rules.mdc
cp .vibe/mcp-triggers.md .cursor/rules/001-mcp-triggers.mdc

cat << 'EOF' > .cursor/rules/002-memory.mdc
## Memory
Project memory lives in `memory/`. Read `memory/INDEX.md` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
If you have a native memory system, reconcile it with the `memory/` folder at session start.
EOF

# ==============================================================================
# 3. CLAUDE CODE CONFIGURATION
# ==============================================================================
echo "[INFO] Configuring Claude Code..."

# On Linux/macOS, register MCP servers directly.
# On Windows, this is skipped — vibe-setup.bat handles claude CLI calls instead.
if [ "$IS_WINDOWS" = false ]; then
  claude mcp remove postgres 2>/dev/null || true
  claude mcp remove github 2>/dev/null || true
  claude mcp remove sequential-thinking 2>/dev/null || true
  claude mcp remove puppeteer 2>/dev/null || true
  claude mcp remove context7 2>/dev/null || true

  claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost:5432/postgres
  claude mcp add --transport stdio github -- npx -y @modelcontextprotocol/server-github
  claude mcp add --transport stdio sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
  claude mcp add --transport stdio puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
  claude mcp add --scope user --transport stdio context7 -- npx -y @upstash/context7-mcp --api-key $CONTEXT7_API_KEY
  # Note: Ensure GITHUB_PERSONAL_ACCESS_TOKEN and CONTEXT7_API_KEY are set in your .env
else
  echo "[INFO] Skipping Claude MCP registration on Windows. Run these commands manually in cmd after setup:
claude mcp remove postgres
claude mcp remove github
claude mcp remove sequential-thinking
claude mcp remove puppeteer
claude mcp remove context7 --scope user

claude mcp add --transport stdio postgres -- npx.cmd -y @modelcontextprotocol/server-postgres postgresql://localhost:5432/postgres
claude mcp add --transport stdio github -- npx.cmd -y @modelcontextprotocol/server-github
claude mcp add --transport stdio sequential-thinking -- npx.cmd -y @modelcontextprotocol/server-sequential-thinking
claude mcp add --transport stdio puppeteer -- npx.cmd -y @modelcontextprotocol/server-puppeteer
claude mcp add --scope user --transport stdio context7 -- npx.cmd -y @upstash/context7-mcp --api-key %CONTEXT7_API_KEY%
"
fi

cat << EOF > CLAUDE.md
# Global Agent Instructions
You are an expert software architect. Write clean, secure, and optimized code while strictly adhering to the project context and constraints.

## Primary Directives
1. **Plan Before Coding**: For any task touching >2 files, output an architectural plan first.
2. **Minimal Diff**: Only modify files explicitly required.
3. **Run Checks**: Always run linting and testing commands after making logic changes.

---

$RULES_CONTENT

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

$MCP_CONTENT

---

## Memory
Project memory lives in \`memory/\`. Read \`memory/INDEX.md\` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.

## Useful Project Commands
- Run Development Server: npm run dev
- Build for Production: npm run build
- Run Test Suite: npm run test
EOF

# ==============================================================================
# 4. GITHUB COPILOT CLI & GENERIC STANDARDS
# ==============================================================================
echo "[INFO] Configuring GitHub Copilot & Generic Standards..."

mkdir -p .github

cat << EOF > .github/copilot-instructions.md
$RULES_CONTENT

---

$MCP_CONTENT

---

## Memory
Project memory lives in \`memory/\`. Read \`memory/INDEX.md\` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
If you have a native memory system, reconcile it with the \`memory/\` folder at session start.
EOF

cp CLAUDE.md AGENTS.md

echo "[SUCCESS] Bootstrapping complete. Core files generated and synchronized."