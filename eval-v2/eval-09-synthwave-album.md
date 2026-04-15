# Eval 09: Synthwave Album (v2 Re-evaluation)

**Prompt:** "Create a synthwave album cover with title, divider, and track listing"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --vertical \
  --exec "aski text 'NEON DRIVE' --font shadow" \
  --exec "aski draw --shape hr --width 50 --style double --text 'MIDNIGHT PROTOCOL'" \
  --exec "aski table --data 'Track,Title;01,Neon Horizon;02,Digital Pulse;03,Midnight Protocol;04,Retrograde;05,Chrome Sunset' --style rounded"
```

**Output:**
```
█    █░██████░ ████░ █    █░       ████░  █████░ ██████░█    █░██████░
██   █░█░░░░░ █    █░██   █░       █   █░ █    █░  ██░  █    █░█░░░░░
█ █  █░████░  █    █░█ █  █░       █    █░█████░   ██░   █  █░ ████░
█  █ █░█░░░░░ █    █░█  █ █░       █   █░ █  █░    ██░   █  █░ █░░░░░
█   ██░██████░ ████░ █   ██░       ████░  █   █░ ██████░  ██░  ██████░
══════════ MIDNIGHT PROTOCOL ═══════════
╭───────┬───────────────────╮
│ Track │ Title             │
├───────┼───────────────────┤
│ 01    │ Neon Horizon      │
│ 02    │ Digital Pulse     │
│ 03    │ Midnight Protocol │
│ 04    │ Retrograde        │
│ 05    │ Chrome Sunset     │
╰───────┴───────────────────╯
```

## Freehand Version
```
                    ·  ·    ✦    ·   ·
              ·          ·          ·     ·
         ·        ·    ·    ·   ·       ·
 ─────────────────────────────────────────────────
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 ████████████████████████████████████████████████████

       ███▄ ██ ██▀▀ ▄▀▀▄ ███▄ ██
       █ ▀██▀█ ██▀  █  █ █ ▀██▀█
       █  ▀█ █ ██▄▄ ▀▄▄▀ █  ▀█ █

       ██▀▀▄ ██▀▀▄ ██ █  █ ██▀▀
       █  █▀ █▄▄▀  ██ ▀▄▄▀ ██▄▄

 ████████████████████████████████████████████████████
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

         ╱     ╱     ╱     ╱     ╱     ╱
        ╱     ╱     ╱     ╱     ╱     ╱
 ══════╱═════╱═════╱═════╱═════╱═════╱═══════
      ╱     ╱     ╱     ╱     ╱     ╱
     ╱     ╱     ╱     ╱     ╱     ╱
 ───╱─────╱─────╱─────╱─────╱─────╱──────────
   ╱     ╱     ╱     ╱     ╱     ╱

       ┌─────────────────────────────┐
       │ 01. Neon Horizon       4:32 │
       │ 02. Digital Pulse      3:58 │
       │ 03. Midnight Protocol  5:17 │
       │ 04. Retrograde         4:01 │
       │ 05. Chrome Sunset      6:44 │
       └─────────────────────────────┘

               M I D N I G H T
             P R O T O C O L  ™
```

## Verdict
**CLI v2:** 4/10 -- The shadow font title looks stylized and the horizontal rule with text creates a decent divider. The track listing table is clean. But this is fundamentally a text layout, not album art. There is no sunset, no grid road, no gradient sky, no retro aesthetic.
**Freehand:** 10/10 -- Full synthwave scene with stars, gradient horizon bars, stylized title lettering, perspective grid road, and a formatted track listing. Captures the entire genre aesthetic in ASCII.
**Winner:** Freehand
**v1->v2 improvement:** From 2/10 to 4/10. The compose command stacks the elements cleanly. The shadow font and styled horizontal rule add visual flair that v1 lacked. But album cover art is fundamentally an illustration task -- the CLI can format text and data but cannot draw scenes, gradients, or perspective geometry. This remains firmly in freehand territory.
