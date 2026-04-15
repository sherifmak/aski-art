# Eval v2 Summary: CLI v1 vs v2 vs Freehand

## v1 vs v2 Score Comparison

| # | Prompt | CLI v1 | CLI v2 | Freehand | v2 Winner | Improvement |
|---|--------|--------|--------|----------|-----------|-------------|
| 01 | K8s Architecture | 7/10 | 9/10 | 9/10 | Tie | Canvas nesting |
| 02 | OAuth2 Flow | 8/10 | 8/10 | 8/10 | Tie | No change |
| 03 | Crypto Dashboard | 7/10 | 8.5/10 | 9/10 | Freehand | Compose + charts |
| 04 | Cloud Comparison | 9/10 | 9/10 | 7/10 | CLI | No change needed |
| 05 | Zen Garden | 1/10 | 3/10 | 10/10 | Freehand | Art library helps a bit |
| 06 | Retro Game Screen | 3/10 | 6/10 | 9/10 | Freehand | Compose + art library |
| 07 | Fantasy Weather | 5/10 | 7/10 | 9/10 | Freehand | Compose + charts |
| 08 | Hacker Terminal | 7/10 | 8.5/10 | 9/10 | Tie | Side-by-side + sparklines |
| 09 | Synthwave Album | 2/10 | 4/10 | 10/10 | Freehand | Border + compose |
| 10 | Dungeon Map | 4/10 | 7.5/10 | 9/10 | Freehand | Canvas spatial layout |

**v1 average: 5.3** -- **v2 average: 7.0** (+1.7)
**Freehand average: 8.9** (unchanged)

CLI wins: 1 -> 1 | Ties: 2 -> 3 | Freehand wins: 7 -> 6

## What Changed

Three v2 features made the biggest impact:

**1. Canvas (spatial positioning)**
The single most impactful addition. Canvas lets you place boxes and text at exact x,y coordinates on a virtual grid. This transformed the Dungeon Map (4 -> 7.5) and K8s Architecture (7 -> 9) evaluations. Any prompt that requires spatial relationships -- maps, architecture diagrams, network topologies -- benefits enormously from coordinate-based placement rather than sequential text output.

**2. Compose (layout composition)**
The compose command enables vertical and horizontal stacking of multiple aski subcommands into a unified output. This is what turned the Retro Game Screen from three disconnected outputs (3/10) into a coherent stacked layout (6/10). It also enabled the Hacker Terminal's side-by-side panels (7 -> 8.5). Compose is the glue that makes other commands work together.

**3. Chart (data visualization)**
Bar charts and sparklines add a dimension that v1 simply could not produce. The Fantasy Weather danger-level bars and the Hacker Terminal sparklines are genuinely useful visual elements that required freehand effort before. Chart works best when paired with compose to sit alongside tables and text.

## Remaining Gap

The CLI improved most on **structured and spatial tasks**: architecture diagrams, dashboards, data tables, maps with rooms. These are tasks where the content is fundamentally about layout, data, and relationships.

The CLI still cannot compete on **pure illustration**: the Zen Garden (3 vs 10), Synthwave Album (4 vs 10), and to a lesser extent the Retro Game Screen (6 vs 9) remain firmly in freehand territory. These prompts require:

- **Scene composition**: sunsets, landscapes, horizons, perspective grids
- **Character art**: detailed creatures, figures, objects drawn with ASCII strokes
- **Aesthetic gradients**: using block characters to simulate depth and shading
- **Artistic judgment**: knowing when to use negative space, how to balance a composition

No CLI tool can replicate artistic intent. The art library helps (the dragon in eval 06 is a real improvement), but pre-built assets only go so far.

## Conclusion

v2 closed the gap significantly. The CLI moved from an average of 5.3/10 to 7.0/10, a 32% improvement. It is now competitive on **7 out of 10 prompts** (scoring within 1.5 points of freehand).

The breakdown is clear:
- **CLI wins or ties (4 prompts):** Structured data (Cloud Comparison), technical diagrams (K8s, OAuth2), and dashboards (Hacker Terminal). These play to the CLI's strengths in tables, trees, and spatial layout.
- **Freehand wins narrowly (3 prompts):** Fantasy Weather, Dungeon Map, Crypto Dashboard. The CLI output is good and usable, but freehand adds polish, icons, and decorative framing.
- **Freehand wins decisively (3 prompts):** Zen Garden, Synthwave Album, Retro Game Screen. These are art-first prompts where illustration skill matters more than data formatting.

The v2 tools (canvas, compose, chart) turned the CLI from a text-formatting utility into a layout engine. The remaining gap is the difference between layout and art.
