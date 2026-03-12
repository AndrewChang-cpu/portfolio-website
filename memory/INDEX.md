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
