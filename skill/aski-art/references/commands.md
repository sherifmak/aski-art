# Aski Art — Command Reference

## Table of Contents
- [table](#table)
- [text](#text)
- [sequence](#sequence)
- [flow](#flow)
- [interface](#interface)
- [wireframe](#wireframe)

---

## table

Format data into bordered ASCII tables.

**Input methods:**
- Stdin: `echo "Name,Age\nAlice,30" | npx aski-art table`
- Inline: `npx aski-art table --data "Name,Age;Alice,30;Bob,25"`
- JSON: `echo '[{"name":"Alice"}]' | npx aski-art table --json`

**Flags:**

| Flag | Description |
|------|-------------|
| `--data "H1,H2;R1C1,R1C2"` | Inline data (semicolons = rows, commas = columns) |
| `--json` | Parse stdin as JSON array of objects |
| `--style <name>` | `unicode` (default), `grid`, `double`, `rounded`, `simple`, `markdown`, `compact` |
| `--align <spec>` | Per-column alignment: `left,center,right` |
| `--padding <n>` | Cell padding (default: 1) |
| `--header` / `--no-header` | First row is header (default: true) |

**Examples:**

```bash
# Rounded table from inline data
npx aski-art table --data "Status,Count;Active,142;Inactive,38;Pending,7" --style rounded

# Unicode table from CSV pipe
echo "Endpoint,Method,Auth\n/users,GET,token\n/login,POST,none\n/health,GET,none" | npx aski-art table --style unicode

# JSON array input
echo '[{"name":"api-1","status":"healthy","latency":"12ms"},{"name":"api-2","status":"degraded","latency":"340ms"}]' | npx aski-art table --json --style unicode

# Right-aligned numbers
npx aski-art table --data "Item,Price;Widget,9.99;Gadget,24.50;Total,34.49" --align "left,right"
```

---

## text

Render large ASCII text banners.

**Flags:**

| Flag | Description |
|------|-------------|
| `--font <name>` | `block` (default), `banner`, `mini`, `shadow` |

Supports A-Z, 0-9, and space. Keep input to 1-3 words for best results.

**Examples:**

```bash
npx aski-art text "DEPLOY" --font block
npx aski-art text "WARNING" --font shadow
npx aski-art text "V2" --font banner
npx aski-art text "OK" --font mini
```

---

## sequence

Generate UML-style sequence diagrams.

**Flags:**

| Flag | Description |
|------|-------------|
| `--actors "A,B,C"` | Comma-separated participant names (left to right) |
| `--messages "A->B:msg,B-->A:reply"` | Comma-separated messages |
| `--width <n>` | Override column width |

**Arrow types:**
- `A->B:label` — solid arrow (request/call)
- `A-->B:label` — dashed arrow (response/return)
- `A->A:label` — self-call loop

**Examples:**

```bash
# HTTP request lifecycle
npx aski-art sequence \
  --actors "Browser,CDN,API,DB" \
  --messages "Browser->CDN:GET /page,CDN->API:cache miss,API->DB:SELECT *,DB-->API:rows,API-->CDN:200 HTML,CDN-->Browser:200 cached"

# Auth flow
npx aski-art sequence \
  --actors "Client,Auth,API" \
  --messages "Client->Auth:POST /login,Auth-->Client:JWT,Client->API:GET /data,API->Auth:verify,Auth-->API:valid,API-->Client:200 JSON"

# Pub/sub
npx aski-art sequence \
  --actors "Producer,Broker,Consumer" \
  --messages "Producer->Broker:publish,Broker-->Producer:ack,Broker->Consumer:push,Consumer-->Broker:ack"
```

**Tips:** Keep actor names short (5-10 chars). Order actors left-to-right matching primary flow.

---

## flow

Generate directed flowcharts with auto-layout.

**Flags:**

| Flag | Description |
|------|-------------|
| `--nodes "Name(shape),..."` | Shapes: `rect` (default), `diamond`, `round` |
| `--edges "A->B,B->C:label,..."` | Directed edges with optional `:label` |
| `--direction <dir>` | `TB` (top-bottom, default) or `LR` (left-right) |

**Conventions:** `diamond` = decision, `round` = start/end, `rect` = process step.

**Examples:**

```bash
# Validation flow
npx aski-art flow \
  --nodes "Start(round),Validate(rect),Valid?(diamond),Process(rect),Error(rect),End(round)" \
  --edges "Start->Validate,Validate->Valid?,Valid?->Process:yes,Valid?->Error:no,Process->End,Error->End"

# CI/CD pipeline
npx aski-art flow \
  --nodes "Push(round),Build(rect),Test(rect),Pass?(diamond),Deploy(rect),Done(round)" \
  --edges "Push->Build,Build->Test,Test->Pass?,Pass?->Deploy:yes,Pass?->Push:no,Deploy->Done"

# Left-to-right pipeline
npx aski-art flow \
  --nodes "Ingest(round),Transform(rect),Validate(diamond),Store(rect)" \
  --edges "Ingest->Transform,Transform->Validate,Validate->Store:valid" \
  --direction LR
```

---

## interface

Build terminal-style dashboard panels.

**Flags:**

| Flag | Description |
|------|-------------|
| `--template <name>` | `server-status`, `deploy-log`, `migration`, `api-response` |
| `--components "type:key=val,..."` | Custom component stack |
| `--width <n>` | Panel width (default: 60) |
| `--border <style>` | `unicode` (default), `ascii`, `double`, `rounded` |

**Component types:**

| Type | Syntax | Description |
|------|--------|-------------|
| `header` | `header:text=TITLE` | Centered title |
| `divider` | `divider` | Horizontal line |
| `progress` | `progress:label=CPU:value=72:max=100` | Progress bar with ██░░ |
| `kvlist` | `kvlist:items=Key\|Val;Key2\|Val2` | Key-value pairs |
| `statuslist` | `statuslist:items=✓ Done;✗ Failed` | Status list |
| `text` | `text:content=Hello` | Text block |
| `badge` | `badge:text=OK:style=success` | Status badge |

**Examples:**

```bash
# Template
npx aski-art interface --template server-status

# Custom dashboard
npx aski-art interface \
  --components "header:text=BUILD STATUS,divider,progress:label=Tests:value=47:max=50,progress:label=Coverage:value=82:max=100,kvlist:items=Branch|main;Commit|a3f2c1d;Duration|2m 34s" \
  --width 50

# Deploy status
npx aski-art interface \
  --components "header:text=DEPLOY v3.1,divider,progress:label=Rollout:value=80:max=100,statuslist:items=✓ API healthy;✓ DB migrated;● Workers scaling" \
  --width 55
```

---

## wireframe

Generate ASCII UI wireframe mockups.

**Flags:**

| Flag | Description |
|------|-------------|
| `--template <name>` | `login`, `dashboard`, `settings`, `landing`, `chat` |
| `--width <n>` | Wireframe width |

**Examples:**

```bash
npx aski-art wireframe --template login
npx aski-art wireframe --template dashboard
npx aski-art wireframe --template settings --width 70
npx aski-art wireframe --template chat
npx aski-art wireframe --template landing
```

Templates produce complete, realistic wireframes ready to paste into docs or PRs.
