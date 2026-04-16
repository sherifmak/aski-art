# ASCII Art Scene Recipes

Step-by-step construction patterns for common scene types. Follow these recipes layer by layer — background first, then midground, then foreground.

## Recipe 1: Landscape / Nature Scene

**Layer order:** Sky → Horizon → Terrain → Details → Frame

```
Step 1 — SKY (top 8-10 lines)
  Fill with sparse stars: ·  *  .  ✦  ·    (random placement)
  Or gradient: dark at top (empty), lighter toward horizon

Step 2 — CELESTIAL BODY
  Moon: Place a ◐ or build from curves: _.·'
  Sun: Build with rays:  \|/  ─☼─  /|\
  Stars: scatter ✦ · * ⋆ at varied densities

Step 3 — HORIZON LINE
  Mountains: /\  /\/\  using / and \, filled with ░▒▓ for depth
  Hills: smooth curves ___/‾‾‾\___
  Water: ≈≈≈≈≈≈≈ or ～～～～ at horizon level

Step 4 — MIDGROUND
  Trees: /\ with || trunk, vary sizes
  Buildings: □-shaped boxes with window dots
  Water: ≋≈∿ characters, denser than horizon

Step 5 — FOREGROUND (bottom 3-5 lines)
  Ground texture: .:·.·:. or ^^^ or ,,,
  Objects: detailed items (flowers, rocks, paths)
  Shadows: ░ beneath objects

Step 6 — FRAME
  Match mood: ornate ╔══╗ for fantasy, rough +--+ for rustic
  Add title in top border if appropriate
```

## Recipe 2: Character / Creature

**Build from skeleton outward.**

```
Step 1 — POSE SKELETON
  Map the basic shape: head position, body line, limb angles
  Use | for vertical body, / \ for limbs, O or () for head

Step 2 — BODY VOLUME
  Fill the skeleton with density characters
  Head: (  ) or /  \ curves
  Body: | |  or { } for torso, thicken with extra columns
  Limbs: / \ diagonal strokes

Step 3 — FEATURES
  Eyes: o O ◉ ● ◎ · (choose based on character mood)
  Mouth: ‿ ◡ ∪ ω ^ v (happy, neutral, etc.)
  Horns/ears/wings: use ^ < > / \ ∧ ∨

Step 4 — TEXTURE
  Scales: ≋≋≋ or ><><><
  Fur: }{}{  or ∿∿∿
  Armor: ═══ ║║║ ╬╬╬
  Wings: large / \ sweeps with ─ internal structure

Step 5 — ENVIRONMENT
  Ground line beneath the character
  Shadow on the ground using ░
  Small environmental details (grass, stones, smoke)
```

## Recipe 3: Game Title Screen

**Composition: Title → Art → Menu → Footer, all within a decorative frame.**

```
Step 1 — OUTER FRAME
  Use ╔═══════════════════════════════════╗ style
  Make it at least 60-70 chars wide
  Add stars or decorations in the margin between frame and content

Step 2 — TITLE (lines 3-10)
  Build large block letters manually or use existing font patterns
  Add glow effect: surround title with ░▒▓ gradient fading outward
  Or emboss: shadow characters below-right of each letter

Step 3 — ILLUSTRATION (lines 11-25)
  Draw the main character/scene using Recipe 2
  Center it horizontally
  Add terrain/environment beneath

Step 4 — MENU (lines 26-30)
  Centered options with selection indicator:
    ▸ NEW GAME
      CONTINUE
      OPTIONS
  Use ▸ ▹ ► ▶ for selection cursor

Step 5 — FOOTER (lines 31-33)
  Centered: "PRESS START" or "PRESS ANY KEY"
  Copyright: "(C) 2026 STUDIO NAME"
  Version: "v1.0"

Step 6 — ATMOSPHERIC DETAILS
  Scatter stars ✦ · * in empty space within frame
  Add subtle particle effects near the illustration
```

## Recipe 4: Dashboard / Terminal Screen

**Multi-panel layout with data-dense content.**

```
Step 1 — OUTER SHELL
  Terminal window chrome: ┌── title ──┐ at top
  Traffic light dots: ● ● ● for macOS feel
  Status bar at bottom

Step 2 — PANEL GRID
  Divide space into panels using ├─┤ and ┬┴ characters
  Common layouts:
    2-column:  │ left │ right │
    3-panel:   │ left │ right-top ──│
               │      │ right-bot ──│
    Quad:      │ TL │ TR │
               │ BL │ BR │

Step 3 — DATA CONTENT per panel
  Progress bars: ████████░░░░ 67%
  Sparklines: ▁▂▃▄▅▆▇█ from data
  Tables: aligned columns with headers
  Graphs: mini line charts using ╭╮│─
  Status indicators: ● ○ ▲ ✓ ✗
  Log entries: [timestamp] message
  Hex dumps: groups of hex pairs

Step 4 — INFORMATION HIERARCHY
  Headers: CAPS, centered, bordered above and below
  Primary data: full brightness characters
  Secondary data: lighter characters or indented
  Labels: left-aligned, values right-aligned
```

## Recipe 5: Map / Spatial Layout

**Rooms/areas connected by paths on a spatial grid.**

```
Step 1 — PLAN THE LAYOUT
  Sketch which rooms connect to which on paper/mentally
  Assign grid positions (which room is north/south/east/west)

Step 2 — DRAW ROOMS
  Each room: ┌─────────────┐
              │  ROOM NAME  │
              │  items here  │
              └──────┬──────┘
  Size rooms proportionally to importance

Step 3 — CONNECT WITH CORRIDORS
  Vertical: │ between rooms
  Horizontal: ── between rooms
  Corners: ┌┐└┘ where corridors turn
  Doors: ═╡D╞═ or ─┤ ├─
  Secret passages: ····· (dotted lines)

Step 4 — POPULATE ROOMS
  Items as symbols: ⚔ sword, 🗝 key, 💎 gem, ☠ skull
  Or ASCII: [SWORD] [KEY] [CHEST]
  Enemies: Use mini character art or labels
  Traps: ⚠ or !! markers

Step 5 — COMPASS & LEGEND
  Compass rose in a corner:   N
                            W + E
                              S
  Legend box: ┌─ LEGEND ─┐ explaining all symbols
  Quest/objective text at bottom
```

## Recipe 6: Album Cover / Poster Art

**Full-bleed artistic composition with typography.**

```
Step 1 — BACKGROUND GRADIENT
  Build a sunset/gradient using horizontal bands:
    Line 1-2:  (empty — dark sky)
    Line 3-4:  · · (sparse stars)
    Line 5-6:  ████████████████ (solid band)
    Line 7:    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Line 8:    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    Line 9:    ░░░░░░░░░░░░░░░░
    Line 10+:  (open for foreground)

Step 2 — SILHOUETTES
  Draw objects as solid █ blocks against the gradient
  Trees: ||| trunk with /|||||\ canopy in █
  Buildings: rectangular █ blocks with ░ windows
  Mountains: /\ filled with █

Step 3 — PERSPECTIVE ELEMENT
  Grid road to horizon:
    \  |  |  |  /
     \ | | | | /
      \|_|_|_|/
  Creates depth and the classic retro/synthwave look

Step 4 — TYPOGRAPHY
  Band name: large block letters at top
  Album title: smaller spaced letters: M I D N I G H T
  Track listing: numbered list in a bordered section at bottom
  Label/copyright: small text at very bottom

Step 5 — BORDER
  Scan-line effect: alternate ─ lines between content rows
  Heavy outer border: ▓▓▓▓ or ████ frame
  Inner margin of 1-2 characters

Step 6 — DETAILS
  Lens flare: * ✦ ⊹ near sun/bright spots
  Particle effects: scattered · ˙ in sky
  Reflection in water: lighter/inverted copies of above elements
```

## Universal Quality Checklist

Before finalizing any piece:

1. **Count your lines** — is it at least 30? 40+ for complex scenes?
2. **Check line lengths** — are they consistent? Pad shorter lines with spaces
3. **Squint test** — if you squint at it, can you still see the shapes? Good art has strong silhouettes
4. **Density balance** — is there a good mix of dense and sparse areas? All-dense is muddy, all-sparse is empty
5. **Focal point** — does your eye go somewhere specific first?
6. **Frame quality** — does the border/frame match the content's mood?
7. **Detail gradient** — more detail in foreground, less in background?
8. **Consistent style** — are you mixing incompatible character styles? Pick a cohesive palette
