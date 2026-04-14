---
description: Generate ASCII art — tables, flowcharts, sequence diagrams, wireframes, TUI dashboards, and text banners using the aski CLI
---

# Aski Art — ASCII Art Generator

You have access to a local CLI tool called `aski` that generates ASCII art directly in the terminal. Use it whenever the user needs visual representations in plain text.

**CLI path:** `node /Users/sherif.maktabi/aski-art/cli/bin/aski.js`

---

## When to Use This Skill

Invoke `aski` when the user:

- Asks for a diagram, flowchart, or visual representation in ASCII
- Wants a formatted table for a README, PR description, or documentation
- Asks for an ASCII banner or header text
- Wants to mock up a UI wireframe in the terminal
- Needs a sequence diagram for architecture or API docs
- Wants a terminal dashboard or status panel layout
- Describes a process or flow (proactively suggest a flowchart)
- Has tabular data in any form (proactively suggest formatting it as a table)

---

## Command Reference

The CLI has 6 subcommands: `table`, `text`, `sequence`, `flow`, `interface`, `wireframe`.

---

### 1. `table` — Render Tabular Data

Formats data into bordered ASCII tables. Accepts CSV via stdin, a `--data` flag, or JSON with `--json`.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js table [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--data "H1,H2;R1C1,R1C2;..."` | Inline data using semicolons for rows, commas for columns |
| `--json` | Parse stdin as a JSON array of objects |
| `--style <name>` | Border style: `ascii`, `unicode`, `rounded`, `bold`, `double` |
| `--align <spec>` | Column alignment: `left`, `center`, `right`, or per-column like `left,center,right` |
| `--compact` | Remove inner row separators for a denser look |

**Examples:**

```bash
# Inline data with rounded borders
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js table --data "Status,Count;Active,142;Inactive,38;Pending,7" --style rounded
```

```bash
# Pipe CSV data with unicode borders
echo "Endpoint,Method,Auth\n/users,GET,token\n/login,POST,none\n/health,GET,none" | node /Users/sherif.maktabi/aski-art/cli/bin/aski.js table --style unicode
```

```bash
# JSON array input for service status
echo '[{"name":"api-1","status":"healthy","latency":"12ms"},{"name":"api-2","status":"degraded","latency":"340ms"},{"name":"api-3","status":"healthy","latency":"8ms"}]' | node /Users/sherif.maktabi/aski-art/cli/bin/aski.js table --json --style unicode
```

**Tips:**
- Default to `--style unicode` for most contexts. Use `--style ascii` only when targeting environments that lack unicode support (e.g., some CI logs).
- Use `--compact` for large datasets to save vertical space.
- When piping CSV, use `echo -e` or `printf` to interpret `\n` as newlines.

---

### 2. `text` — ASCII Text Banners

Renders large stylized text banners from a string.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js text "<message>" [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--font <name>` | Font style: `block`, `shadow`, `slant`, `small`, `standard`, `banner` |
| `--width <n>` | Maximum width in characters |
| `--align <dir>` | Alignment: `left`, `center`, `right` |

**Examples:**

```bash
# Bold block banner for a deploy header
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js text "DEPLOY" --font block
```

```bash
# Shadow-styled warning banner
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js text "WARNING" --font shadow
```

```bash
# Compact small banner for log headers
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js text "v2.4.0" --font small --align center
```

**Tips:**
- `block` and `shadow` are the most visually impactful fonts — great for headers and announcements.
- `small` and `standard` work well when you need readable text that does not dominate the screen.
- Keep input text short (1-3 words) for best results; long strings get unwieldy.

---

### 3. `sequence` — Sequence Diagrams

Generates UML-style sequence diagrams showing interactions between actors.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js sequence [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--actors "A,B,C"` | Comma-separated list of participant names (rendered left to right) |
| `--messages "A->B:msg,B-->A:reply"` | Comma-separated message list. Use `->` for solid (request) and `-->` for dashed (response) arrows |
| `--title "Diagram Title"` | Optional title displayed above the diagram |
| `--width <n>` | Override auto-calculated width |

**Examples:**

```bash
# HTTP request lifecycle
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js sequence \
  --actors "Browser,CDN,API,DB" \
  --messages "Browser->CDN:GET /page,CDN->API:cache miss,API->DB:SELECT *,DB-->API:rows,API-->CDN:200 + HTML,CDN-->Browser:200 cached"
```

```bash
# Auth flow
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js sequence \
  --actors "Client,Auth,API" \
  --messages "Client->Auth:POST /login,Auth-->Client:JWT token,Client->API:GET /data + JWT,API->Auth:verify token,Auth-->API:valid,API-->Client:200 JSON" \
  --title "JWT Authentication"
```

```bash
# Pub/sub event flow
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js sequence \
  --actors "Producer,Broker,Consumer" \
  --messages "Producer->Broker:publish(event),Broker-->Producer:ack,Broker->Consumer:push(event),Consumer-->Broker:ack"
```

**Tips:**
- Use `->` for requests/calls and `-->` for responses/returns. This convention makes the diagram immediately readable.
- Keep actor names short (5-10 chars) to avoid overly wide diagrams.
- Order actors left-to-right to match the primary flow direction.

---

### 4. `flow` — Flowcharts and Process Diagrams

Renders directed flowcharts with different node shapes.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js flow [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--nodes "Name(shape),..."` | Define nodes. Shapes: `rect`, `round`, `diamond`, `parallelogram` |
| `--edges "A->B,B->C:label,..."` | Define directed edges with optional labels |
| `--direction <dir>` | Layout direction: `TB` (top-bottom), `LR` (left-right) |
| `--title "Title"` | Optional title above the flowchart |

**Examples:**

```bash
# Input validation flow
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js flow \
  --nodes "Start(round),Validate(rect),Valid?(diamond),Process(rect),Error(rect),End(round)" \
  --edges "Start->Validate,Validate->Valid?,Valid?->Process:yes,Valid?->Error:no,Process->End,Error->End"
```

```bash
# CI/CD pipeline
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js flow \
  --nodes "Push(round),Build(rect),Test(rect),Pass?(diamond),Deploy(rect),Alert(rect),Done(round)" \
  --edges "Push->Build,Build->Test,Test->Pass?,Pass?->Deploy:yes,Pass?->Alert:no,Deploy->Done" \
  --title "CI/CD Pipeline"
```

```bash
# Left-to-right data pipeline
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js flow \
  --nodes "Ingest(parallelogram),Transform(rect),Validate(diamond),Store(rect),Reject(rect)" \
  --edges "Ingest->Transform,Transform->Validate,Validate->Store:valid,Validate->Reject:invalid" \
  --direction LR
```

**Tips:**
- Use `diamond` for decision/branch points, `round` for start/end, `rect` for process steps, and `parallelogram` for I/O.
- Add edge labels on decision branches (`:yes`, `:no`, `:valid`, `:error`) for clarity.
- Default direction is `TB` (top-to-bottom). Use `LR` for pipeline-style flows.

---

### 5. `interface` — TUI Dashboards and Status Panels

Builds terminal-style dashboard panels from components or templates.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js interface [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--template <name>` | Use a preset: `server-status`, `build-status`, `deploy-status`, `system-monitor` |
| `--components "type:key=val,..."` | Build a custom panel from components (see component types below) |
| `--width <n>` | Panel width in characters (default: 60) |
| `--title "Title"` | Override the panel title |

**Component types:**
| Type | Keys | Description |
|------|------|-------------|
| `header` | `text` | Section header text |
| `divider` | — | Horizontal rule |
| `progress` | `label`, `value`, `max` | Progress/gauge bar |
| `kvlist` | `items=Key1\|Val1;Key2\|Val2` | Key-value list (use `\|` to separate key from value, `;` between pairs) |
| `text` | `content` | Plain text block |
| `status` | `label`, `state` | Status indicator (`ok`, `warn`, `error`) |

**Examples:**

```bash
# Quick server status from a template
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js interface --template server-status
```

```bash
# Custom build dashboard
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js interface \
  --components "header:text=BUILD STATUS,divider,progress:label=Tests:value=47:max=50,progress:label=Coverage:value=82:max=100,kvlist:items=Branch|main;Commit|a3f2c1d;Duration|2m 34s" \
  --width 50
```

```bash
# Deployment status panel
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js interface \
  --components "header:text=DEPLOY v3.1.0,divider,status:label=API:state=ok,status:label=Worker:state=ok,status:label=Cron:state=warn,divider,kvlist:items=Region|us-east-1;Replicas|3/3;Uptime|14d 6h" \
  --width 55 \
  --title "Production Status"
```

**Tips:**
- Start with a `--template` if one matches your use case, then customize from there.
- Templates produce complete, realistic-looking dashboards with no extra effort.
- Combine `progress`, `status`, and `kvlist` components for rich information displays.

---

### 6. `wireframe` — UI Wireframe Mockups

Generates ASCII wireframe mockups of common UI patterns.

**Syntax:**
```
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js wireframe [options]
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--template <name>` | Use a preset: `login`, `dashboard`, `settings`, `list`, `form`, `landing` |
| `--width <n>` | Wireframe width in characters |
| `--components "type:key=val,..."` | Build custom wireframe from UI components |

**Examples:**

```bash
# Login page wireframe
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js wireframe --template login
```

```bash
# Dashboard wireframe
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js wireframe --template dashboard
```

```bash
# Settings page wireframe
node /Users/sherif.maktabi/aski-art/cli/bin/aski.js wireframe --template settings --width 70
```

**Tips:**
- Wireframes are ideal for early-stage UI discussions, PRs that add new pages, or design doc illustrations.
- Templates cover the most common patterns. Use them as starting points.
- Keep widths between 50-80 characters for best readability in markdown and terminals.

---

## General Usage Guidelines

1. **Always wrap output in code fences.** When inserting ASCII art into markdown files, README docs, PR descriptions, or comments, wrap the output in triple-backtick code fences to preserve formatting:
   ````
   ```
   (ascii art here)
   ```
   ````

2. **Default to `--style unicode` for tables** unless the user's context suggests an ASCII-only environment (CI logs, legacy terminals, email).

3. **Keep widths under 80-100 characters** for readability across terminals, GitHub rendering, and code review tools.

4. **Be proactive.** When the user:
   - Describes a process or workflow, suggest generating a `flow` diagram.
   - Shares tabular data in any format, suggest formatting it with `table`.
   - Discusses system architecture or API interactions, suggest a `sequence` diagram.
   - Talks about building a new page or feature, suggest a `wireframe`.

5. **Capture output for insertion.** Run the command via Bash, capture stdout, and insert the result where the user needs it (e.g., into a markdown file, PR body, or comment).

6. **Combine commands for rich documents.** A good architecture doc might use a `text` banner as a title, a `sequence` diagram for the API flow, a `table` for endpoint reference, and a `flow` chart for error handling — all generated with `aski`.

7. **Escape special characters.** When data contains commas or semicolons that are part of the content (not delimiters), use the JSON input mode (`--json` via stdin) instead of `--data` for tables, or wrap values carefully.
