#!/usr/bin/env python3
"""Render ASCII art to PNG images for the blog post."""

from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = "/Users/sherif.maktabi/aski-art/blog-images"

# Try to find a good monospace font that handles unicode box-drawing chars well
FONT_CANDIDATES = [
    "/System/Library/Fonts/Menlo.ttc",
    "/System/Library/Fonts/SFNSMono.ttf",
    "/Library/Fonts/SF Mono.ttf",
    "/System/Library/Fonts/Monaco.dfont",
    "/System/Library/Fonts/Courier.dfont",
]

def find_font():
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return path
    return None

FONT_PATH = find_font()
print(f"Using font: {FONT_PATH}")


def render_ascii(text, filename, size=16, padding=24,
                 bg=(15, 15, 24), fg=(220, 220, 230),
                 title=None, accent=(168, 85, 247)):
    """Render ASCII art to a PNG file."""
    font = ImageFont.truetype(FONT_PATH, size)
    title_font = ImageFont.truetype(FONT_PATH, size + 4) if title else None

    lines = text.rstrip().split("\n")
    # Get character dimensions
    bbox = font.getbbox("M")
    char_w = bbox[2] - bbox[0]
    char_h = font.getbbox("Mg")[3] + 4  # add line spacing

    max_chars = max((len(line) for line in lines), default=0)

    width = max_chars * char_w + padding * 2
    height = len(lines) * char_h + padding * 2
    if title:
        height += char_h + 16
        title_w = title_font.getbbox(title)[2]
        width = max(width, title_w + padding * 2)

    img = Image.new("RGB", (width, height), bg)
    draw = ImageDraw.Draw(img)

    y = padding
    if title:
        draw.text((padding, y), title, fill=accent, font=title_font)
        y += char_h + 16

    for line in lines:
        draw.text((padding, y), line, fill=fg, font=font)
        y += char_h

    out_path = os.path.join(OUT_DIR, filename)
    img.save(out_path, "PNG")
    print(f"Wrote {out_path} ({width}x{height})")


# 1. HERO BANNER — the ASKI logo
render_ascii("""   █████╗ ███████╗██╗  ██╗██╗
  ██╔══██╗██╔════╝██║ ██╔╝██║
  ███████║███████╗█████╔╝ ██║
  ██╔══██║╚════██║██╔═██╗ ██║
  ██║  ██║███████║██║  ██╗██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝

         ASCII Art Tools for Developers""",
    "01-hero-logo.png", size=20, padding=40,
    bg=(10, 10, 18), fg=(168, 85, 247))


# 2. CLI EXAMPLE — sparkline + table side by side
render_ascii("""$ aski chart --type sparkline --data "10,25,40,32,55,70,48,62,80,45"
▁▃▄▃▆▇▅▆█▅

$ aski table --data "Name,Age;Alice,30;Bob,25" --style rounded
╭───────┬─────╮
│ Name  │ Age │
├───────┼─────┤
│ Alice │ 30  │
│ Bob   │ 25  │
╰───────┴─────╯

$ aski compose --horizontal --gap 3 \\
    --exec "aski art --name dragon" \\
    --exec "aski chart --type bar --data 'Fire,99;Wings,87'" """,
    "02-cli-examples.png", size=15, padding=28,
    title="The CLI", accent=(0, 212, 170))


# 3. SCORE TABLE
render_ascii("""                       CLI v2   Freehand   +Skill   Winner
                       ──────   ────────   ──────   ──────
01 K8s Architecture     7.0      7.0        8.5     +Skill
02 OAuth2 Flow          8.0      7.0        8.5     +Skill
03 Crypto Dashboard     7.0      7.0        9.0     +Skill
04 Cloud Comparison     8.0      8.0        8.5     +Skill
05 Zen Garden           4.0      6.0        9.5     +Skill ⭐
06 Retro Game Screen    7.0      7.5        9.5     +Skill ⭐
07 Fantasy Weather      8.0      7.0        9.0     +Skill
08 Hacker Terminal      8.0      7.0        9.5     +Skill ⭐
09 Synthwave Album      8.0      8.0        9.5     +Skill ⭐
10 Dungeon Map          7.0      7.5        9.5     +Skill ⭐
                       ──────   ────────   ──────
Average                 7.20     7.20       9.05    +1.85""",
    "03-eval-results.png", size=15, padding=28,
    title="3-Way Eval — Skill Wins 10 / 10", accent=(240, 165, 0))


# 4. FREEHAND (no skill) — Synthwave attempt
render_ascii("""+============================================+
|             *  *  N E O N  D R I V E  *  * |
|                                            |
|              \\   |   /                     |
|               \\ \\|/ /                      |
|                 ☼                          |
|               / /|\\ \\                      |
|              /   |   \\                     |
|     /\\         /\\        /\\                |
|    /  \\       /  \\      /  \\               |
|   /    \\____ /    \\____/    \\              |
|   ============= ROAD =============         |
|                                            |
|       MIDNIGHT PROTOCOL                    |
|                                            |
|  01 Neon Horizon                           |
|  02 Digital Pulse                          |
|  03 Midnight Protocol                      |
|  04 Retrograde                             |
|  05 Chrome Sunset                          |
+============================================+""",
    "04-freehand-no-skill.png", size=15, padding=28,
    title="Freehand (no skill) — 8 / 10", accent=(132, 132, 145))


# 5. SKILL-ENHANCED — Synthwave masterpiece
render_ascii("""▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓░                                                                  ░▓
▓░  ·   ⋆      ·    ·     ✦      ·     ⋆    ·       ·    ✦   ·    ░▓
▓░     ·    ·         ·       ·     ·         ·    ·          ·    ░▓
▓░ ·       ·     ·         ✦         ·              ·     ·   ⋆    ░▓
▓░──────────────────────────────────────────────────────────────────░▓
▓░████████████████████████████████████████████████████████████████░░▓
▓░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████ NEON DRIVE ██████████▓▓▓▓▓▓░░▓
▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▓
▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
▓░    █                                                █          ░▓
▓░   ███               ─── ✦ ───                      ███         ░▓
▓░  █████          M I D N I G H T                   █████        ░▓
▓░ ███████          P R O T O C O L                 ███████       ░▓
▓░  █│█│█           ─── ✦ ───                        █│█│█        ░▓
▓░   │█│                                              │█│         ░▓
▓░   │█│   \\              |              /            │█│         ░▓
▓░   │█│    \\      |      |     |       /             │█│         ░▓
▓░   │█│     \\     |      |      |     /              │█│         ░▓
▓░   │█│      \\    |      |      |    /               │█│         ░▓
▓░   │█│       \\   |      |      |   /                │█│         ░▓
▓░───│█│────────\\──|──────|──────|/───────────────────│█│─────────░▓
▓░───│█│─────────\\─────────────────────────────────────│█│─────────░▓
▓░                                                                  ░▓
▓░  ╭─ TRACKLIST ────────────────────────────────────────────────╮ ░▓
▓░  │  01.  Neon Horizon                              ◉  04:21    │ ░▓
▓░  │  02.  Digital Pulse                             ◉  03:48    │ ░▓
▓░  │  03.  Midnight Protocol                         ◉  06:12    │ ░▓
▓░  │  04.  Retrograde                                ◉  05:03    │ ░▓
▓░  │  05.  Chrome Sunset                             ◉  07:34    │ ░▓
▓░  ╰─────────────────────────────────────────────────────────────╯ ░▓
▓░                                                                  ░▓
▓░  ◐ NEON DRIVE      │   side A/B   │   © 2026 OUTRUN RECORDS   ░▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓""",
    "05-skill-enhanced.png", size=14, padding=28,
    title="Freehand + Skill — 9.5 / 10", accent=(168, 85, 247))


# 6. ARCHITECTURE
render_ascii("""                    ╔═══════════════════════════════════════╗
                    ║               ASKI ART                ║
                    ╚═══════════════════════════════════════╝
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
  ┌──────────┐                  ┌────────────┐                 ┌──────────┐
  │ Web App  │                  │    CLI     │                 │  Skills  │
  ├──────────┤                  ├────────────┤                 ├──────────┤
  │ 6 tools  │                  │ 13 cmds    │                 │ aski-art │
  │ Visual   │                  │ Zero deps  │                 │ ascii-   │
  │ Editors  │                  │ npx ready  │                 │ artist   │
  └──────────┘                  └────────────┘                 └──────────┘
        │                              │                              │
        ▼                              ▼                              ▼
  Browser users                 Terminal users               AI agents
  (humans)                      (humans + scripts)           (Claude, Cursor...)""",
    "06-architecture.png", size=15, padding=28,
    title="Three Layers, One Project", accent=(74, 158, 255))


# 7. CRYPTO DASHBOARD — showing what compose enables
render_ascii("""┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│                                      │  │      Prices                  │
│            TRADING                   │  │                              │
│                                      │  │  BTC  ████████████████████ │
├──────────────────────────────────────┤  │  ETH  █████████             │
│  BTC : ████████████░░░░░░░░░░  62%  │  │  SOL  ██                    │
│  ETH : █████░░░░░░░░░░░░░░░░░  24%  │  │  AVAX █                     │
│  SOL : ██░░░░░░░░░░░░░░░░░░░░  11%  │  │                              │
├──────────────────────────────────────┤  └──────────────────────────────┘
│  Total:    127K                      │
│  PnL:      +2841                     │
└──────────────────────────────────────┘""",
    "07-cli-compose.png", size=14, padding=28,
    title="aski compose — side-by-side dashboards", accent=(0, 212, 170))


# 8. ZEN GARDEN — the freehand showpiece
render_ascii("""┌─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┐
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ │
│   │ ╱╲  │ ╱╲ ╱╲  │                       ┌────┐             │
│   │╱  ╲ │╱╲╱╲╱ ╲ │     ～～～～～～～     │    │             │
│   │╲  ╱ │ ╲╱╲  ╱ │   ～              ～  ├────┤             │
│   │ ╲╱  │  ╱╲╲╱  │  ～    ≋≋≋≋≋≋≋    ～  │ ▓▓ │             │
│   │     │ ╱  ╲╲  │  ～    ≋≋ koi ≋≋   ～  │ ▓▓ │  lantern   │
│   │     │╱    ╲╲ │  ～    ≋≋ pond ≋≋  ～  ├────┤             │
│   │     │ bamboo│   ～    ≋≋≋≋≋≋≋    ～  │░░░░│             │
│                      ～                ～  └──┬─┘             │
│   ～～～～～～～～     ～～           ～～        │              │
│  ～～～～～～～～～       ～～～～～～                          │
│ ～～～～～～～～～                                              │
│  ～ raked sand ～                              ▓████████▓     │
│   ～～～～～～    ◯                          ████ rock ████   │
│                                              ▓████████▓     │
│    ∿∿∿∿∿∿∿∿       ◯                                          │
│   ∿∿∿∿∿∿∿∿∿∿            ═══════════════╗                    │
│  ∿∿∿∿∿∿∿∿∿∿∿∿     ◯     ║ wooden bridge ║                   │
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿            ═══════════════╝                    │
│  ∿∿∿∿∿∿∿∿∿∿∿∿                                                │
│                                            ,,, ,,, ,,,        │
│   ∿∿∿∿∿∿       ～        ◇◇◇      ⌇moss   ,,,,,,,,,,,        │
│  ∿∿∿∿∿∿∿∿     ～  ◇◇◇◇◇  ～                ,,, ,,, ,,,        │
│ ∿∿∿∿∿∿∿∿∿     ～  ◇◇◇◇◇  ～     枯山水                       │
│  ∿∿∿∿∿∿∿       ～  ◇◇◇  ～    karesansui                     │
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ │
└─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┬──┬─┘""",
    "08-zen-garden.png", size=14, padding=28,
    title="Zen Garden — only Freehand+Skill can do this", accent=(0, 212, 170))


print("\n✓ Done. All images in:", OUT_DIR)
