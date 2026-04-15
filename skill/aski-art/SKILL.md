---
name: aski-art
description: Generate ASCII art for documentation, code comments, PRs, and terminal output. Supports tables, flowcharts, sequence diagrams, wireframes, TUI dashboards, and text banners. Use when the user asks for diagrams, formatted tables, ASCII banners, UI mockups, sequence diagrams, terminal dashboards, or any visual representation in plain text. Also trigger proactively when the user describes a process (suggest flowchart), shares tabular data (suggest table), discusses architecture (suggest sequence diagram), or plans a UI (suggest wireframe).
---

# Aski Art

Generate ASCII art via the `aski` CLI. Run with `npx aski-art <command> [options]`.

## Commands

| Command | Purpose | Quick Example |
|---------|---------|---------------|
| `table` | Formatted tables | `npx aski-art table --data "Name,Age;Alice,30" --style unicode` |
| `text` | Large text banners | `npx aski-art text "DEPLOY" --font block` |
| `sequence` | Sequence diagrams | `npx aski-art sequence --actors "A,B" --messages "A->B:hello,B-->A:hi"` |
| `flow` | Flowcharts | `npx aski-art flow --nodes "Start(round),End(round)" --edges "Start->End"` |
| `interface` | TUI dashboards | `npx aski-art interface --template server-status` |
| `wireframe` | UI wireframes | `npx aski-art wireframe --template login` |

For full flags, options, and examples per command, read [references/commands.md](references/commands.md).

## Key Patterns

**Tables from data:** Pipe CSV/TSV via stdin, use `--data` for inline, or `--json` for JSON arrays.

```bash
echo "Name,Age\nAlice,30\nBob,25" | npx aski-art table --style unicode
echo '[{"name":"api-1","status":"up"}]' | npx aski-art table --json
```

**Flowcharts:** Define nodes with shapes and edges with labels. Auto-layout handles positioning.

```bash
npx aski-art flow \
  --nodes "Start(round),Check(diamond),Process(rect),End(round)" \
  --edges "Start->Check,Check->Process:yes,Check->End:no,Process->End"
```

**Sequence diagrams:** Use `->` for requests, `-->` for responses.

```bash
npx aski-art sequence \
  --actors "Client,Server,DB" \
  --messages "Client->Server:GET /users,Server->DB:SELECT,DB-->Server:rows,Server-->Client:200 OK"
```

**Dashboards from components:**

```bash
npx aski-art interface \
  --components "header:text=BUILD,divider,progress:label=Tests:value=47:max=50,kvlist:items=Branch|main;Commit|a3f2c1d"
```

## Rules

1. Always wrap ASCII output in triple-backtick code fences when inserting into markdown.
2. Default to `--style unicode` for tables. Use `--style ascii` only for ASCII-only environments.
3. Keep output width under 80-100 characters.
4. Capture stdout and insert directly where needed (markdown file, PR body, comment).
5. Use `--json` input mode when data contains commas or semicolons.
6. Combine commands for rich docs: `text` banner + `sequence` diagram + `table` reference.
