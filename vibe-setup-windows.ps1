# Universal AI Agent Environment Bootstrapper
# Cross-Platform: Works on Windows, Linux, and macOS via PowerShell
# NOTE: On Windows, Claude MCP registration is handled by vibe-setup.bat
#       Run vibe-setup.bat from cmd instead of this script directly.

Write-Host "[INFO] Initializing AI Agent Environment in $($PWD.Path)..."

# ==============================================================================
# 0. DETECT OS
# ==============================================================================
$IS_WINDOWS = $false
if ($IsWindows -or ([System.Environment]::OSVersion.Platform -eq "Win32NT") -or $env:WSL_DISTRO_NAME) {
    $IS_WINDOWS = $true
    Write-Host "[INFO] Detected Windows"
} else {
    Write-Host "[INFO] Detected Linux/macOS"
}

# ==============================================================================
# 1. UNIVERSAL BASE
# ==============================================================================
Write-Host "[INFO] Configuring Universal Base directories..."

# Source .env
if (Test-Path ".env") {
    Get-Content ".env" | Where-Object { $_ -match '^\s*[^#]' } | ForEach-Object {
        $k, $v = $_ -split '=', 2
        Set-Item -Path "env:\$($k.Trim())" -Value $v.Trim()
    }
}

New-Item -ItemType Directory -Force -Path ".vibe/skills" | Out-Null

if (-not (Test-Path ".vibe/rules.md")) {
@'
# Project Context
- Name: Interactive Developer Portfolio
- Stack: Next.js (App Router), TypeScript, React, Tailwind CSS, Three.js
- Architecture: Component-driven UI. Next.js Server Components by default; Three.js WebGL restricted to Client Components. Data sourced from data/resume.json.

# Agent Constraints
- Test Coverage: Core UI components must include Jest/Vitest unit tests.
- Code Style: Functional React components, strict TypeScript typing, absolute imports, Tailwind utility classes.
'@ | Out-File -FilePath ".vibe/rules.md" -Encoding utf8
Write-Host "[CREATED] .vibe/rules.md"
}

if (-not (Test-Path ".vibe/mcp-triggers.md")) {
@'
# MCP Tool Triggers
- Database/SQL: Use postgres MCP to inspect live schema.
- GitHub/VC: Use github MCP to read issues and draft PRs.
- UI/Browser: Use puppeteer MCP to inspect localhost rendering.
- API/Docs: Use context7 MCP for framework documentation.
- Planning: Use sequential-thinking MCP before writing code.
'@ | Out-File -FilePath ".vibe/mcp-triggers.md" -Encoding utf8
Write-Host "[CREATED] .vibe/mcp-triggers.md"
}

# ------------------------------------------------------------------------------
# 1b. PROJECT MEMORY
# ------------------------------------------------------------------------------
Write-Host "[INFO] Initializing project memory..."

New-Item -ItemType Directory -Force -Path "memory" | Out-Null

if (-not (Test-Path "memory/INDEX.md")) {
@'
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

---
type: user | project | feedback | reference
updated: YYYY-MM-DD
---

[content]

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
'@ | Out-File -FilePath "memory/INDEX.md" -Encoding utf8
Write-Host "[CREATED] memory/INDEX.md"
}

if (-not (Test-Path "memory/user.md")) {
@'
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
'@ | Out-File -FilePath "memory/user.md" -Encoding utf8
Write-Host "[CREATED] memory/user.md"
}

if (-not (Test-Path "memory/project.md")) {
@'
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
'@ | Out-File -FilePath "memory/project.md" -Encoding utf8
Write-Host "[CREATED] memory/project.md"
}

if (-not (Test-Path "memory/feedback.md")) {
@'
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
'@ | Out-File -FilePath "memory/feedback.md" -Encoding utf8
Write-Host "[CREATED] memory/feedback.md"
}

if (-not (Test-Path "memory/reference.md")) {
@'
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
'@ | Out-File -FilePath "memory/reference.md" -Encoding utf8
Write-Host "[CREATED] memory/reference.md"
}

$RULES_CONTENT = Get-Content -Raw -Path ".vibe/rules.md"
$MCP_CONTENT = Get-Content -Raw -Path ".vibe/mcp-triggers.md"

# ==============================================================================
# 2. CURSOR CONFIGURATION
# ==============================================================================
Write-Host "[INFO] Configuring Cursor..."

New-Item -ItemType Directory -Force -Path ".cursor/rules" | Out-Null

# Cursor MCP config differs: Windows needs 'cmd /c' wrappers, Linux runs npx directly
if (-not (Test-Path ".cursor/mcp.json")) {
  if ($IS_WINDOWS) {
@'
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
'@ | Out-File -FilePath ".cursor/mcp.json" -Encoding utf8
  } else {
@'
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
'@ | Out-File -FilePath ".cursor/mcp.json" -Encoding utf8
  }
  Write-Host "[CREATED] .cursor/mcp.json"
}

Copy-Item -Path ".vibe/rules.md" -Destination ".cursor/rules/000-main-rules.mdc" -Force
Copy-Item -Path ".vibe/mcp-triggers.md" -Destination ".cursor/rules/001-mcp-triggers.mdc" -Force

@'
## Memory
Project memory lives in `memory/`. Read `memory/INDEX.md` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
If you have a native memory system, reconcile it with the `memory/` folder at session start.
'@ | Out-File -FilePath ".cursor/rules/002-memory.mdc" -Encoding utf8

# ==============================================================================
# 3. CLAUDE CODE CONFIGURATION
# ==============================================================================
Write-Host "[INFO] Configuring Claude Code..."

# On Linux/macOS, register MCP servers directly.
# On Windows, this is skipped — vibe-setup.bat handles claude CLI calls instead.
if (-not $IS_WINDOWS) {
  # Suppress errors explicitly on removal
  claude mcp remove postgres 2>$null
  claude mcp remove github 2>$null
  claude mcp remove sequential-thinking 2>$null
  claude mcp remove puppeteer 2>$null
  claude mcp remove context7 2>$null

  claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost:5432/postgres
  claude mcp add --transport stdio github -- npx -y @modelcontextprotocol/server-github
  claude mcp add --transport stdio sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
  claude mcp add --transport stdio puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
  claude mcp add --scope user --transport stdio context7 -- npx -y @upstash/context7-mcp --api-key $env:CONTEXT7_API_KEY
  # Note: Ensure GITHUB_PERSONAL_ACCESS_TOKEN and CONTEXT7_API_KEY are set in your .env
} else {
  Write-Host @"
[INFO] Skipping Claude MCP registration on Windows. Run these commands manually in cmd after setup:
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
"@
}

# Double backticks are required to print a literal Markdown backtick in a PS double-quoted string
@"
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
Project memory lives in ``memory/``. Read ``memory/INDEX.md`` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.

## Useful Project Commands
- Run Development Server: npm run dev
- Build for Production: npm run build
- Run Test Suite: npm run test
"@ | Out-File -FilePath "CLAUDE.md" -Encoding utf8

# ==============================================================================
# 4. GITHUB COPILOT CLI & GENERIC STANDARDS
# ==============================================================================
Write-Host "[INFO] Configuring GitHub Copilot & Generic Standards..."

New-Item -ItemType Directory -Force -Path ".github" | Out-Null

@"
$RULES_CONTENT

---

$MCP_CONTENT

---

## Memory
Project memory lives in ``memory/``. Read ``memory/INDEX.md`` at the start of each session.
After completing significant work, update the relevant memory files with key learnings, decisions, and corrections.
If you have a native memory system, reconcile it with the ``memory/`` folder at session start.
"@ | Out-File -FilePath ".github/copilot-instructions.md" -Encoding utf8

Copy-Item -Path "CLAUDE.md" -Destination "AGENTS.md" -Force

Write-Host "[SUCCESS] Bootstrapping complete. Core files generated and synchronized."