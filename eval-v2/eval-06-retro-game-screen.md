# Eval 06: Retro Game Screen (v2 Re-evaluation)

**Prompt:** "Create a retro RPG game screen with title, dragon artwork, and a menu"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --vertical \
  --exec "aski text 'DRAGON QUEST' --font block" \
  --exec "aski art --name dragon" \
  --exec "aski border --style double --title 'MENU' --padding 0 <<< '  ▸ NEW GAME
  CONTINUE
  OPTIONS'"
```

**Output:**
```
████  █████  ████  ████  ████ █    █       ████ █    ███████ ████ ██████
█   █ █    ██    ██     █    ███   █      █    ██    ██     █       ██
█    ██████ ███████  ████    ██ █  █      █  █ ██    █████   ████   ██
█   █ █  █  █    ██    ██    ██  █ █      █   █ █    ██          █  ██
████  █   █ █    █ ████  ████ █   ██       ███ █ ████ ███████████   ██
/\    .-" /
                /  ; .'  .'
               :   ;/  .'
                \  '-  /
        __.---.__\  _ /
    .-""   __..--""  ""--.
   /    .-"               \
  ;   .'                  ;
  :  ;                    :
  ;  :      ~  DRAGON ~   ;
  :  ;                    :
   \  \                  /
    \  "-.           _.-"
     "-._ "-.___.--""
         """---"
╔═══ MENU ═══╗
║            ║
║ ▸ NEW GAME ║
║   CONTINUE ║
║   OPTIONS  ║
║            ║
╚════════════╝
```

## Freehand Version
```
╔══════════════════════════════════════════════════════════╗
║  ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░  ║
║  ▓  ██▀▀█ █▀▀▄ ▄▀▀▄ ▄▀▀▀ ▄▀▀▄ █▄ █   ▄▀▀▄ █  █ ▄▀▀ ▓  ║
║  ▓  █  █▀ █▄▄▀ █▄▄█ █ ▀█ █  █ █ ██   █  █ █  █ ▀▀▄ ▓  ║
║  ▓  █▄▄▀  █  █ █  █ ▀▄▄▀ ▀▄▄▀ █  █    ▀▀▀▄ ▀▄▄▀ ▄▄▀ ▓  ║
║  ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░  ║
║                                                          ║
║                      /\       /\                         ║
║                     /  \_____/  \                        ║
║                    / 🔥         🔥\                       ║
║                   /   /  ___  \   \                      ║
║                  /   /  /   \  \   \                     ║
║           ~~~~~~/   /   |   |   \   \~~~~~~              ║
║          / \\  /   /    |   |    \   \  // \             ║
║         /   \\/   /     | ▼ |     \   \/   \            ║
║        /    /\   /     /|   |\     \   /\    \           ║
║       /___/  \__/     / | ^ | \     \__/  \___\          ║
║                      / /|___|\\ \                        ║
║        ~~~~~~~~     /_/ |   | \_\     ~~~~~~~~           ║
║                         |   |                            ║
║          ·  HP ████████████░░░░ 340/500  ·               ║
║          ·  MP ██████░░░░░░░░░░  80/200  ·               ║
║                                                          ║
║    ╔══════════════════════════════════════════════╗       ║
║    ║  ▸ ATTACK      MAGIC      ITEMS      RUN   ║       ║
║    ╚══════════════════════════════════════════════╝       ║
║                                                          ║
║    ┌────────────────────────────────────────────┐         ║
║    │  A fearsome dragon blocks your path!       │         ║
║    │  Its scales shimmer with ancient magic.    │         ║
║    └────────────────────────────────────────────┘         ║
╚══════════════════════════════════════════════════════════╝
```

## Verdict
**CLI v2:** 6/10 -- Composes a block title, a recognizable dragon from the art library, and a bordered menu. The three sections are clearly separated and the output reads as a game screen. However, it lacks HP/MP bars, battle dialogue, visual framing as a unified screen, and the dragon art is generic.
**Freehand:** 9/10 -- Full game screen with outer border, stylized title banner, detailed dragon, HP/MP gauges, battle menu, and narrative text box. Feels like a real RPG encounter screen.
**Winner:** Freehand
**v1->v2 improvement:** From 3/10 to 6/10. The compose command lets you stack title + art + menu vertically. The art library provides a real dragon. v1 had no way to combine these elements or access pre-built artwork. Still cannot create the unified framed experience of the freehand version.
