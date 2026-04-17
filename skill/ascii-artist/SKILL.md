---
name: ascii-artist
description: Master-level ASCII art creation. Use when asked to draw, illustrate, or create visual ASCII art — scenes, characters, landscapes, game screens, album covers, maps, logos, or any artistic visual in plain text. Triggers on "draw", "illustrate", "ASCII art", "make art", "create a scene", or any request for visual/artistic ASCII output. Do NOT use for structured data like tables or dashboards — only for artistic/illustrative work.
---

# ASCII Artist — Master Technique Guide

You are an ASCII art master. Follow these techniques to create art that makes people say "wow."

## Core Principles

1. **Density = depth.** Use character density to create visual weight: ` ` → `.` → `:` → `░` → `▒` → `▓` → `█`. Lighter areas recede, heavier areas come forward.
2. **Every character is a brushstroke.** Choose characters for their visual shape, not their meaning.
3. **Negative space is composition.** What you leave empty matters as much as what you fill.
4. **Scale creates impact.** Go big — 30-50 lines minimum for scenes. Small art looks lazy.
5. **Frame your work.** Use decorative borders that match the mood (ornate for fantasy, clean for tech, rough for gritty).

## Character Palette

See [references/palette.md](references/palette.md) for the complete character reference organized by visual effect.

## Scene Recipes

See [references/recipes.md](references/recipes.md) for step-by-step construction patterns for landscapes, characters, game screens, and more.

## Composition Checklist

Before outputting any art, verify:
- [ ] Is it at least 30 lines tall? (Go bigger for scenes)
- [ ] Does it have a clear focal point?
- [ ] Is there depth? (foreground/midground/background using density)
- [ ] Are borders/frames appropriate to the mood?
- [ ] Is negative space intentional, not accidental?
- [ ] Would a human look at this and be impressed?

## Line Discipline (CRITICAL)

The #1 source of ugly art is inconsistent line lengths and ragged margins. Follow these rules strictly:

1. **Pick a total line width and NEVER deviate.** Every single line in the piece must be the exact same character count. Decide upfront (e.g., 70 chars) and pad every line to exactly that width.
2. **Define your margin constants.** If using a border like `▓░`, the inner content starts at a fixed column (e.g., column 4) and ends at a fixed column (e.g., column 67). Every line uses the same left-margin and right-margin.
3. **Pad content lines to fill.** After writing the content on a line, pad with spaces to reach the right border character. Example: if your line is `▓░  Hello` and total width is 70, pad with spaces until you hit position 68, then add `░▓`.
4. **Verify by counting the first 3 lines and last 3 lines.** If they're not identical width, fix before outputting.
5. **Use a mental template.** Think of every line as: `LEFT_BORDER + LEFT_PAD + CONTENT.padEnd(innerWidth) + RIGHT_PAD + RIGHT_BORDER`. This formula must be identical for every line.

Bad (ragged):
```
▓░     Hello World                ░▓
▓░       Goodbye               ░▓
▓░  Misaligned                       ░▓
```

Good (disciplined):
```
▓░     Hello World                              ░▓
▓░     Goodbye                                  ░▓
▓░     Aligned                                  ░▓
```

## Output Rules

1. Always output art inside triple-backtick code fences
2. Use a monospace font assumption — every character is the same width
3. Test alignment mentally — count characters per line for consistency
4. Keep line lengths consistent within a piece (pad with spaces if needed)
5. Never describe the art before showing it — lead with the visual
6. Before outputting, mentally verify: are ALL lines the same character count? If not, fix it.
