```
    █████╗ ███████╗██╗  ██╗██╗
   ██╔══██╗██╔════╝██║ ██╔╝██║
   ███████║███████╗█████╔╝ ██║
   ██╔══██║╚════██║██╔═██╗ ██║
   ██║  ██║███████║██║  ██╗██║
   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝
```

# Aski Art

ASCII art tools for developers. Visual editors + CLI for creating flowcharts, sequence diagrams, tables, wireframes, TUI dashboards, and text banners — all in ASCII.

**Live site:** [sherifmak.github.io/aski-art](https://sherifmak.github.io/aski-art)

---

## Install the Skill (Claude Code, Cursor, Windsurf, any AI coding agent)

The skill teaches your AI coding agent how to generate ASCII art on demand. One command to install:

### Claude Code

```bash
# Install the skill globally (works in any project)
claude install-skill https://github.com/sherifmak/aski-art
```

Or manually: copy `skill/aski-art/` into your project's `.claude/skills/` directory or `~/.claude/skills/` for global access.

### Cursor / Windsurf / Other Agents

Copy the skill instructions into your agent's system prompt or rules file:

1. Copy the contents of [`skill/aski-art/SKILL.md`](skill/aski-art/SKILL.md) into your `.cursorrules`, `.windsurfrules`, or equivalent config file
2. Make sure `npx aski-art` is available (Node.js 18+ required)

### Any Agent with Terminal Access

If your coding agent can run shell commands, it can use aski. Just add this to its instructions/system prompt:

```
You have access to the `aski` CLI for generating ASCII art.
Run commands with: npx aski-art <command> [options]

Commands:
- npx aski-art table --data "Name,Age;Alice,30" --style unicode
- npx aski-art text "HELLO" --font block
- npx aski-art sequence --actors "A,B" --messages "A->B:hello,B-->A:hi"
- npx aski-art flow --nodes "Start(round),End(round)" --edges "Start->End"
- npx aski-art interface --template server-status
- npx aski-art wireframe --template login
```

---

## Web Tools

Open `index.html` or visit the [live site](https://sherifmak.github.io/aski-art) to use the visual editors:

| Tool | Description |
|------|-------------|
| **Flow Builder** | Figma-style diagram builder — boxes, diamonds, arrows |
| **Interface Builder** | Drag-and-drop TUI dashboards with progress bars, panels, tables |
| **Sequence Diagrams** | Actor lifelines and message arrows for service interactions |
| **Wireframes** | 20 UI components — mock up app screens in ASCII |
| **Tables** | Paste CSV/TSV/Markdown → 7 table styles |
| **Image Converter** | Drop an image → ASCII art with multiple character sets |

---

## CLI

Zero-dependency Node.js CLI. Requires Node.js 18+.

```bash
# Run directly with npx (no install needed)
npx aski-art table --data "Name,Age;Alice,30;Bob,25"

# Or install globally
npm install -g aski-art
```

### Tables

```bash
# Pipe CSV data
echo "Name,Age,City\nAlice,30,NYC\nBob,25,LA" | npx aski-art table --style unicode

# Inline data
npx aski-art table --data "Status,Count;Active,142;Pending,7" --style rounded

# JSON input
echo '[{"name":"api-1","status":"up"}]' | npx aski-art table --json
```

Styles: `unicode` (default), `grid`, `double`, `rounded`, `simple`, `markdown`, `compact`

### Text Banners

```bash
npx aski-art text "DEPLOY" --font block
npx aski-art text "WARNING" --font shadow
```

Fonts: `block` (default), `banner`, `mini`, `shadow`

### Sequence Diagrams

```bash
npx aski-art sequence \
  --actors "Client,Server,DB" \
  --messages "Client->Server:GET /users,Server->DB:SELECT,DB-->Server:rows,Server-->Client:200 OK"
```

Arrow types: `->` (solid), `-->` (dashed/return)

### Flowcharts

```bash
npx aski-art flow \
  --nodes "Start(round),Validate(rect),OK?(diamond),Process(rect),End(round)" \
  --edges "Start->Validate,Validate->OK?,OK?->Process:yes,OK?->Start:no,Process->End"
```

Node types: `rect` (default), `diamond`, `round`

### TUI Dashboards

```bash
npx aski-art interface --template server-status

npx aski-art interface \
  --components "header:text=BUILD,progress:label=Tests:value=47:max=50"
```

Templates: `server-status`, `deploy-log`, `migration`, `api-response`

### Wireframes

```bash
npx aski-art wireframe --template login
npx aski-art wireframe --template dashboard
```

Templates: `dashboard`, `login`, `settings`, `landing`, `chat`

---

## License

MIT
