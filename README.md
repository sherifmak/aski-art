```
    █████╗ ███████╗██╗  ██╗██╗
   ██╔══██╗██╔════╝██║ ██╔╝██║
   ███████║███████╗█████╔╝ ██║
   ██╔══██║╚════██║██╔═██╗ ██║
   ██║  ██║███████║██║  ██╗██║
   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝
```

# Aski Art

ASCII art tools for developers. A suite of web-based visual editors and a CLI tool for creating flowcharts, sequence diagrams, tables, wireframes, TUI dashboards, and more — all in ASCII.

## Web Tools

Open `index.html` or visit the [live site](https://sherifmak.github.io/aski-art) to access all tools:

| Tool | Description |
|------|-------------|
| **Flow Builder** | Figma-style diagram builder — boxes, diamonds, arrows |
| **Interface Builder** | Drag-and-drop TUI dashboards with progress bars, panels, tables |
| **Sequence Diagrams** | Actor lifelines and message arrows for service interactions |
| **Wireframes** | 20 UI components — mock up app screens in ASCII |
| **Tables** | Paste CSV/TSV/Markdown → 7 table styles |
| **Image Converter** | Drop an image → ASCII art with multiple character sets |

## CLI

Zero-dependency Node.js CLI for generating ASCII art from the terminal.

### Install

```bash
# Run directly with npx
npx aski-art table --data "Name,Age;Alice,30;Bob,25"

# Or install globally
npm install -g aski-art
```

### Commands

#### Tables

```bash
# Pipe CSV data
echo "Name,Age,City\nAlice,30,NYC\nBob,25,LA" | aski table --style unicode

# Inline data
aski table --data "Status,Count;Active,142;Pending,7" --style rounded

# JSON input
echo '[{"name":"api-1","status":"up"}]' | aski table --json
```

Styles: `unicode` (default), `grid`, `double`, `rounded`, `simple`, `markdown`, `compact`

#### Text Banners

```bash
aski text "DEPLOY" --font block
aski text "WARNING" --font shadow
```

Fonts: `block` (default), `banner`, `mini`, `shadow`

#### Sequence Diagrams

```bash
aski sequence \
  --actors "Client,Server,DB" \
  --messages "Client->Server:GET /users,Server->DB:SELECT,DB-->Server:rows,Server-->Client:200 OK"
```

Arrow types: `->` (solid), `-->` (dashed/return), `A->A` (self-call)

#### Flowcharts

```bash
aski flow \
  --nodes "Start(round),Validate(rect),OK?(diamond),Process(rect),End(round)" \
  --edges "Start->Validate,Validate->OK?,OK?->Process:yes,OK?->Start:no,Process->End"
```

Node types: `rect` (default), `diamond`, `round`

#### TUI Dashboards

```bash
# Use a template
aski interface --template server-status

# Custom components
aski interface --components "header:text=BUILD,progress:label=Tests:value=47:max=50"
```

Templates: `server-status`, `deploy-log`, `migration`, `api-response`

#### Wireframes

```bash
aski wireframe --template login
aski wireframe --template dashboard
```

Templates: `dashboard`, `login`, `settings`, `landing`, `chat`

## Claude Code Integration

Add the skill to use ASCII art generation directly in Claude Code:

```bash
# From the aski-art directory, the skill is automatically available
# Use /aski in Claude Code to generate ASCII art
```

## License

MIT
