# Aski Art Evaluation Summary

## Comparison Table

| # | Prompt | CLI Score | Freehand Score | Winner | Notes |
|---|--------|-----------|----------------|--------|-------|
| 01 | K8s Architecture | 7/10 | 9/10 | Freehand | CLI can't show nesting/containment |
| 02 | OAuth2 Flow | 8/10 | 8/10 | Tie | CLI is fast; Freehand is more readable |
| 03 | Crypto Dashboard | 7/10 | 9/10 | Freehand | CLI can't do sparklines/side-by-side |
| 04 | Cloud Comparison | 9/10 | 7/10 | CLI | Tables are CLI's killer feature |
| 05 | Zen Garden | 1/10 | 10/10 | Freehand | CLI has no art capability |
| 06 | Retro Game Screen | 3/10 | 9/10 | Freehand | CLI can only do title text |
| 07 | Fantasy Weather | 5/10 | 9/10 | Freehand | CLI gives data; Freehand gives world |
| 08 | Hacker Terminal | 7/10 | 9/10 | Tie | CLI dashboard is functional but flat |
| 09 | Synthwave Album | 2/10 | 10/10 | Freehand | CLI can't do visual art |
| 10 | Dungeon Map | 4/10 | 9/10 | Freehand | CLI tables are not spatial maps |

**Averages:** CLI 5.3/10 | Freehand 8.9/10

**Wins:** CLI 1 | Freehand 7 | Tie 2

---

## Where CLI Excels

- **Structured data tables.** When the task is presenting rows and columns of data (comparison charts, feature matrices, spec sheets), the CLI produces clean, consistent output in one command. Eval 04 (Cloud Comparison) showed this clearly -- the CLI table was the better deliverable.
- **Quick dashboards and interfaces.** Progress bars, key-value lists, and status indicators are fast to assemble with `aski interface`. Eval 08 (Hacker Terminal) demonstrated that a functional dashboard takes one command.
- **Sequence diagrams and flowcharts.** For linear flows with labeled arrows, CLI output is reliable and paste-ready.
- **PR/README content.** Anything you would embed in a Markdown document -- tables, simple diagrams, formatted text -- is the CLI's sweet spot. It is consistent, reproducible, and version-controllable.

## Where Freehand Excels

- **Visual art and illustration.** Scenes, landscapes, characters, album covers -- anything that requires composition, shape, and creative arrangement is exclusively freehand territory. The CLI has zero art primitives.
- **Spatial layouts.** Maps, architecture diagrams with nesting, multi-panel screens -- anything where the position of elements relative to each other carries meaning. Eval 10 (Dungeon Map) was the clearest example.
- **Emotional and atmospheric work.** A zen garden, a retro game screen, a synthwave album cover -- these need mood, not data. Freehand art can evoke feeling; CLI output cannot.
- **Composite scenes.** When a deliverable combines multiple visual elements (title + art + menu + border + footer), freehand is the only option. The CLI can produce one component at a time but cannot compose them spatially.

## The Sweet Spot

The most effective workflow combines both approaches:

1. **Use CLI for structured components.** Generate tables, progress bars, dashboards, and text banners with `aski table`, `aski interface`, and `aski text`. These are your building blocks.
2. **Use freehand for artistic composition.** Draw the surrounding scene, spatial layout, decorative borders, and illustrative elements by hand.
3. **Compose them together.** Embed CLI-generated tables inside freehand-drawn frames. Place a CLI banner at the top of a hand-drawn scene. Use CLI data displays within a freehand multi-panel layout.

Example: For the Hacker Terminal (Eval 08), you could generate the progress bars and status list via CLI, then hand-draw the network topology map and hex dump around them. For the Fantasy Weather (Eval 07), generate the data table via CLI, then embed it inside a hand-drawn parchment map.

## Recommendations for Improvement

To close the gap between CLI and freehand, the following features would have the highest impact:

1. **Sparkline/mini-chart support.** Inline charts using `▁▂▃▄▅▆▇█` characters would dramatically improve dashboards (Eval 03).
2. **Side-by-side panel layout.** A `--columns` or `--layout` flag to place multiple components horizontally would enable multi-panel screens (Eval 08).
3. **Grid/spatial layout mode.** A canvas-based mode where components can be placed at (x, y) coordinates would unlock maps and architecture diagrams (Evals 01, 10).
4. **ASCII art shape primitives.** Basic shapes (box, circle, arrow, line) that can be drawn and positioned would bridge the gap for diagrams and maps.
5. **Border/frame composition.** The ability to wrap any output in decorative borders (double-line, rounded, ASCII scroll) would improve presentation across all use cases.
6. **Template system.** Pre-built templates for common layouts (game screen, dashboard, album cover, map) would let users start from a good foundation and customize.

---

## Overall Verdict

**CLI wins on speed, consistency, and structured data. Freehand wins on creativity, spatial layout, and visual art. The ideal workflow combines both.**

The CLI is the right tool when you need a table in a README, a quick dashboard mockup, or a sequence diagram for a design doc. Freehand is the right tool when you need to create something that looks and feels like art -- something with composition, atmosphere, and spatial meaning. The best results come from knowing when to reach for each, and from combining their strengths.
