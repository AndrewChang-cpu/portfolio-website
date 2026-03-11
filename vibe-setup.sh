#!/bin/bash
# Universal AI Agent Environment Bootstrapper

echo "[INFO] Initializing AI Agent Environment in $PWD..."

# ==============================================================================
# 1. UNIVERSAL BASE (The Single Source of Truth)
# ==============================================================================
echo "[INFO] Configuring Universal Base..."

mkdir -p .vibe/skills

# Generate Universal Vibe Template
if [ ! -f .vibe/rules.md ]; then
cat << 'EOF' > .vibe/rules.md
# Project Context
- Name: Interactive Developer Portfolio
- Stack: Next.js (App Router), TypeScript, React, Tailwind CSS, Three.js
- Architecture: Component-driven UI with a strict separation of concerns. Data is statically sourced from data/resume.json to populate sections like Education, Experience, Projects, and Hackathons. UI elements are built as functional components in the app/components/ directory. Next.js Server Components should be used by default, isolating Three.js WebGL rendering exclusively to Client Components

# Agent Constraints
- Test Coverage: All data-parsing utilities and core UI components must include Jest or Vitest unit tests.
- Code Style: Follow best practices for React development and future-proofing for later development. Use functional React components with Hooks. Enforce strict TypeScript typing for all component props, ensuring interfaces perfectly mirror the structured resume data. Prefer absolute imports (e.g., @/components/ExperienceTimeline) and avoid inline CSS in favor of Tailwind utility classes

## Extended Capabilities
ALWAYS read `.vibe/mcp-triggers.md` before executing complex tasks or using external tools.
EOF
fi

# Generate MCP Triggers Template
if [ ! -f .vibe/mcp-triggers.md ]; then
cat << 'EOF' > .vibe/mcp-triggers.md
# MCP Tool Triggers
- Database/SQL: Use `postgres` MCP to inspect live schema before writing migrations.
- GitHub/Version Control: Use `github` MCP to read issues and draft PRs.
- UI/Browser: Use `puppeteer` MCP to inspect localhost rendering and console errors.
- API/Docs: Use `context7` MCP to retrieve the most up-to-date framework documentation.
- Complex Refactors: Use `sequential-thinking` MCP to output a step-by-step plan before writing code.
EOF
fi

# ==============================================================================
# 2. CURSOR CONFIGURATION
# ==============================================================================
echo "[INFO] Configuring Cursor..."

mkdir -p .cursor/rules

# Configure Cursor MCP Server Workspace
if [ ! -f .cursor/mcp.json ]; then
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
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
EOF
fi

# Link Universal Rules to Cursor's MDC format
ln -sf ../../.vibe/rules.md .cursor/rules/000-main-rules.mdc
ln -sf ../../.vibe/mcp-triggers.md .cursor/rules/001-mcp-triggers.mdc

# ==============================================================================
# 3. CLAUDE CODE CONFIGURATION
# ==============================================================================
echo "[INFO] Configuring Claude Code..."

# Register MCP servers globally via Claude CLI
claude mcp add postgres npx @modelcontextprotocol/server-postgres "postgresql://localhost:5432/postgres"
claude mcp add github npx @modelcontextprotocol/server-github
claude mcp add sequential-thinking npx @modelcontextprotocol/server-sequential-thinking
claude mcp add puppeteer npx @modelcontextprotocol/server-puppeteer
claude mcp add context7 npx @context7/mcp-server

# Link Universal Rules to Claude's root configuration
ln -sf .vibe/rules.md CLAUDE.md

# ==============================================================================
# 4. GITHUB COPILOT CLI CONFIGURATION
# ==============================================================================
echo "[INFO] Configuring GitHub Copilot..."

mkdir -p .github

# Link Universal Rules to Copilot's specific instruction file
ln -sf ../.vibe/rules.md .github/copilot-instructions.md

# ==============================================================================
# 5. OPENAI CODEX & GENERIC STANDARDS
# ==============================================================================
echo "[INFO] Configuring Generic Agent Standards..."

# Link Universal Rules to the generic AGENTS.md standard
ln -sf .vibe/rules.md AGENTS.md

echo "[SUCCESS] Bootstrapping complete. Fill out the bracketed fields in .vibe/rules.md."