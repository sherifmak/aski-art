# Eval v3: 3-Way Comparison Summary

CLI v2 (aski commands) vs Freehand (no skill) vs Freehand + ascii-artist Skill

---

## Score Table

| #  | Prompt              | CLI v2 | Freehand | +Skill | Winner       |
|----|---------------------|--------|----------|--------|--------------|
| 01 | K8s Architecture    | 7.0    | 7.0      | 8.5    | +Skill       |
| 02 | OAuth2 Flow         | 8.0    | 7.0      | 8.5    | +Skill       |
| 03 | Crypto Dashboard    | 7.0    | 7.0      | 9.0    | +Skill       |
| 04 | Cloud Comparison    | 8.0    | 8.0      | 8.5    | +Skill (tie-ish) |
| 05 | Zen Garden          | 4.0    | 6.0      | 9.5    | +Skill       |
| 06 | Retro Game Screen   | 7.0    | 7.5      | 9.5    | +Skill       |
| 07 | Fantasy Weather     | 8.0    | 7.0      | 9.0    | +Skill       |
| 08 | Hacker Terminal     | 8.0    | 7.0      | 9.5    | +Skill       |
| 09 | Synthwave Album     | 8.0    | 8.0      | 9.5    | +Skill       |
| 10 | Dungeon Map         | 7.0    | 7.5      | 9.5    | +Skill       |

---

## Final Rankings

| Approach           | Average Score |
|--------------------|---------------|
| CLI v2             | 7.20          |
| Freehand (no skill)| 7.20          |
| Freehand + Skill   | 9.05          |

The skill adds **+1.85 points** on average over plain freehand and **+1.85 points** over CLI v2. The biggest gains appear on art-heavy prompts (Zen Garden, Album, Game Screen, Dungeon Map) where the skill's compositional recipes and character-palette discipline make the largest impact.

---

## What the Skill Added

| Eval | Specific Techniques the Skill Contributed |
|------|-------------------------------------------|
| 01 K8s | Bold pod borders, status indicators (● ◉ ◎), shadow casting beneath deployments (░), legend box, resource annotations |
| 02 OAuth2 | Actor avatars, differentiated arrow styles (─▸ vs ═▸), security band (░░░), legend row, protocol metadata footer |
| 03 Crypto | Recipe 4 (Dashboard): terminal chrome, multi-panel grid, sparkline using ╭╮│ , section headers (◉), market status bar |
| 04 Cloud | ░▒▓ progress bars replacing star ratings, gradient totals, ✦ verdict bullets, separator rows for clarity |
| 05 Zen Garden | **Showpiece.** Recipe 1 (Landscape) — bamboo fence frame, raked sand .:·.·:., shaded rocks (▓█) with ░ shadows, lantern from ┌┘└┐, ╱╲ bamboo, ≋ koi pond with fish characters, stepping stones (◯), wooden bridge (═║), ⌇ moss, full legend |
| 06 Game Screen | Recipe 3 — ░▒▓ glow gradient on title letters, scattered ✦ ⋆ stars, dragon character with wings + scales + shadow, ╡ ╞ menu ornaments, PRESS START flourish, status bar |
| 07 Fantasy Weather | Celestial frame (☽ ☼), region icons (⌇ ▲ ◐ ✦ ✿), danger symbols (◉ ☠ ⚠), gradient bars, in-world advisory box, fantasy-styled byline footer |
| 08 Hacker Terminal | Recipe 4 — terminal chrome with ● ● ●, ░▒▓ ACCESS GRANTED banner, four-panel layout, hex dump, sparklines (▁▂▃▅▇█), port scan table, timestamped log entries |
| 09 Synthwave Album | **Showpiece.** Recipe 6 (Album) — heavy ▓▓▓▓ scan-line border, ████→▓→▒→░ sunset gradient bands, palm tree silhouettes (█│█│█), perspective grid road \/||, framed tracklist with run-times, label/copyright |
| 10 Dungeon Map | Recipe 5 — compass rose, dragon creature inside boss room, doors (═╡D╞═), secret passage (·····), item glyphs (⚔ ⚷ ◯ ◈ ⛓ ☠ ☼ ⚠), legend, in-world quest text |

---

## Skill ROI

### Where the skill helps most (+2.5 to +3.5 points)
- **Zen Garden** (4.0 → 9.5, +5.5 vs CLI): The CLI couldn't even compose a recognizable garden. The skill turned it into a layered atmospheric scene.
- **Game Title Screen** (7.0 → 9.5, +2.5): Recipe 3 transforms generic ASCII into a polished start-screen.
- **Synthwave Album** (8.0 → 9.5, +1.5): Recipe 6's gradient + grid-road + palms is the iconic synthwave look the prompt demanded.
- **Hacker Terminal** (8.0 → 9.5, +1.5): Recipe 4's multi-panel density makes a "real" terminal screen.
- **Dungeon Map** (7.0 → 9.5, +2.5): Recipe 5 turns disconnected boxes into a navigable adventure layout.

### Where the skill helps moderately (+0.5 to +1.5 points)
- **Crypto Dashboard, Fantasy Weather, K8s Architecture, OAuth2**: The skill adds polish, hierarchy, and atmosphere but the underlying CLI structures are already competent. The biggest wins are visual hierarchy (multi-panel layouts, headers, dividers) and semantic icons.

### Where the skill barely helps (<+0.5)
- **Cloud Comparison Table**: Tabular structured data benefits least. The skill replaces star ratings with progress bars, but the table's value is the data itself, not the rendering. CLI v2 already nails it.

### Pattern: Art prompts win, structured prompts plateau
- **Art-heavy prompts** (scenes, posters, creatures, maps) gain the most because they need composition, layering, and character-palette discipline — exactly what the skill provides.
- **Data-structure prompts** (tables, sequence diagrams, simple architecture) are closer to a plateau because the CLI already handles the hardest part (alignment and box-drawing).

---

## Conclusion

The ascii-artist skill is most valuable when the user wants **art**, not **structure**. For dashboards, scenes, posters, and game screens it raises output from "competent text" to "publishable artwork" — a meaningful, often dramatic, quality jump (averaging +1.85 over plain freehand). For pure tables and sequence diagrams, the CLI alone is already in the 8/10 range and the skill provides only modest polish.

**Recommendation:** Reach for the skill on creative/atmospheric prompts. Reach for the CLI alone (or with light skill polish) for structured data.
