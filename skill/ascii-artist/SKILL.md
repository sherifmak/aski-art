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
- [ ] **Is the width under 50 chars?** (or confirmed wider terminal)
- [ ] **If for a TUI/dashboard: does it auto-detect terminal width?**

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

## Terminal Awareness (CRITICAL)

ASCII art that wraps in a terminal is broken art. Follow these rules:

1. **Know your target.** Before creating art, ask: will this be displayed in a terminal, embedded in code, or shown in a markdown file? Terminal art has hard width constraints.

2. **Default to 50 characters wide.** Unless you know the terminal is wide, assume 50 chars max. This fits virtually every terminal, including narrow IDE panels, phone screens, and split-pane setups. Only go wider if the user explicitly says their terminal is wider.

3. **Never exceed 76 characters.** Even on wide terminals, 76 chars is the safe maximum. Beyond this, many terminals wrap and the art breaks catastrophically — borders misalign, icons split across lines, everything looks garbled.

4. **If the art is for a live dashboard/TUI**, it MUST adapt to terminal width:
   - Use `shutil.get_terminal_size().columns` in Python
   - Use `$(tput cols)` in shell
   - Make bar widths, padding, and borders relative to the detected width
   - NEVER use fixed-width borders (like `░░` on both sides of a 74-char line) for dynamic content

5. **Prefer borderless designs for terminal tools.** Heavy borders (░░, ▓▓, ║║) on every line are fragile — if a single line is one character off, the whole thing looks broken. Simple indentation + horizontal dividers (`───`) are more robust and look cleaner.

6. **Test at 40 columns mentally.** If your art still reads at 40 chars wide, it's robust. If it requires 70+ chars, it WILL break for someone.

## Output Rules

1. Always output art inside triple-backtick code fences
2. Use a monospace font assumption — every character is the same width
3. Test alignment mentally — count characters per line for consistency
4. Keep line lengths consistent within a piece (pad with spaces if needed)
5. Never describe the art before showing it — lead with the visual
6. Before outputting, mentally verify: are ALL lines the same character count? If not, fix it.
7. **State the width.** After the art, note the character width so the user knows the minimum terminal size needed (e.g., "Width: 48 chars").
