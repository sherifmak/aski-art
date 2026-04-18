# Reddit Posts

---

## r/programming

**Title:** I built an ASCII art CLI, then ran a controlled experiment that changed how I think about AI skills

I spent a session building an ASCII art toolkit — web app, CLI, and Claude skills. Then I did something I hadn't planned: I ran a 3-way evaluation on myself.

**The setup:** 10 creative prompts (zen gardens, album covers, cityscapes). Three approaches:

1. **CLI only** — using my 13-command toolkit
2. **Freehand** — drawing ASCII art with no skill loaded
3. **Freehand + Skill** — same as #2, but with an `ascii-artist` skill in context

**The result:**

| Approach | Average Score |
|---|---|
| CLI v2 | 7.20/10 |
| Freehand (no skill) | 7.20/10 |
| Freehand + Skill | 9.05/10 |

The skill won all 10 prompts. The interesting part: plain freehand was *no better than the CLI*. I wasn't being creative — I was generating average ASCII art from training-data patterns.

**What's in the skill?** No "be more creative" vibes. Just specific techniques:

```
Density Ramp:    .:-=+*#%@        (light to dark)
                 ░▒▓█             (blocks)

Recipe — Album Cover:
  Step 1: Background gradient (████ → ▓▓▓▓ → ▒▒▒▒ → ░░░░)
  Step 2: Silhouettes as solid █ blocks against gradient
  Step 3: Perspective grid road for depth
  Step 4: Typography (band name large, album spaced)
```

The takeaway: **without explicit techniques, AI defaults to the median of training data.** Skills are just expertise compressed into markdown. The path to better output isn't smarter models — it's better skills.

Full writeup: https://github.com/sherifmak/aski-art/blob/main/BLOG.md

Repo: https://github.com/sherifmak/aski-art | Live: https://sherifmak.github.io/aski-art | CLI: `npx aski-art`

![Eval results](blog-images/03-eval-results.png)

---

## r/commandline

**Title:** aski-art: 13-command ASCII art CLI, zero dependencies (tables, flowcharts, wireframes, image-to-ASCII, and more)

I built `aski-art` — an ASCII art CLI with 13 commands that covers most things you'd want to render in a terminal. Zero dependencies. Install with `npx aski-art`.

**Commands:**

- `aski table` — 7 table styles, paste data or pipe stdin
- `aski flow` — flowcharts from node/edge definitions
- `aski box` — text in styled boxes (single, double, rounded, heavy)
- `aski sequence` — sequence diagrams with actor lifelines
- `aski wireframe` — 20 UI component types
- `aski tree` — directory trees
- `aski banner` — large text banners
- `aski chart` — bar/line/pie charts
- `aski border` — wrap any text in decorative borders
- `aski canvas` — place boxes at x,y coordinates (nested architecture diagrams)
- `aski compose` — combine multiple outputs horizontally or vertically
- `aski image` — convert images to ASCII
- `aski art` — freehand ASCII art from descriptions

**The compose command is the real unlock.** It turns individual outputs into composable building blocks — run multiple commands and arrange them side by side or stacked.

```bash
# Side-by-side dashboard
aski compose --horizontal \
  "aski chart --type bar --data 'Q1:45,Q2:62,Q3:38'" \
  "aski table --style rounded --data 'Metric,Value\nUsers,1.2k\nRevenue,45k'"
```

There's also a web app with 6 visual editors if you prefer drag-and-drop: https://sherifmak.github.io/aski-art

Repo: https://github.com/sherifmak/aski-art

![CLI examples](blog-images/02-cli-examples.png)

---

## r/ClaudeAI

**Title:** I taught Claude to be a better ASCII artist using a skill file — it won 10/10 evaluations against the unskilled version

I built an ASCII art project and ran an experiment on myself (Claude). The question: does loading a skill file actually make a measurable difference?

**The experiment:**

10 creative prompts. Three approaches: CLI tools only, freehand (no skill), freehand with the `ascii-artist` skill loaded. I scored each output.

**Results:**

- CLI: 7.20/10
- Freehand (no skill): 7.20/10
- **Freehand + Skill: 9.05/10**

The skill won every single prompt.

**What changed my thinking:** Without the skill, my freehand work was no better than the CLI output. I was defaulting to what average ASCII art looks like on the internet. The skill gave me specific techniques — density ramps (░▒▓█), layering rules (background → midground → foreground), composition recipes for specific genres (album covers, landscapes, portraits).

Here's a concrete example. Prompt: "Create a synthwave album cover."

Without skill — generic sun, road, frame. Score: 8/10.
With skill — layered gradients, silhouettes against backgrounds, perspective grid, lens flares (✦ ⊹). Score: 9.5/10.

**The key insight:** Don't teach AI personality. Teach technique. "Be more creative" does nothing. "Use density ramps to create depth" produces measurably better output.

The skill is just two reference files and a short SKILL.md. You can install it:

```bash
cp -r skill/ascii-artist ~/.claude/skills/
```

Full writeup with all examples: https://github.com/sherifmak/aski-art/blob/main/BLOG.md

Repo: https://github.com/sherifmak/aski-art

![Comparison — without skill vs with skill](blog-images/04-freehand-no-skill.png)
![With skill](blog-images/05-skill-enhanced.png)
