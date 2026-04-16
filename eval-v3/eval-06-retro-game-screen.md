# Eval 06: Retro Game Screen (3-Way Evaluation)

**Prompt:** "Retro game title screen for Dragon Quest with menu"

---

## A) CLI v2
**Command:** `aski compose --vertical --exec "aski text 'DRAGON QUEST' --font block" --exec "aski art --name dragon" --exec "aski draw --shape hr --width 60 --style double --text MENU" --exec "echo '  ▸ NEW GAME\n    CONTINUE\n    OPTIONS'"`
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
═════════════════ MENU ═════════════════
▸ NEW GAME
    CONTINUE
    OPTIONS
```
Score: 7/10

## B) Freehand (no skill)
```
+==========================================+
|         D R A G O N    Q U E S T         |
|                                          |
|              .-=-=-=-.                   |
|             /         \                  |
|            ( o     o )                   |
|             \  ___  /                    |
|              \_/^\_/                     |
|              /     \                     |
|         ____/       \____                |
|        /                  \              |
|       /  ~~ DRAGON ~~     \              |
|       \____________________/             |
|                                          |
|  ============= MENU =============        |
|       > NEW GAME                         |
|         CONTINUE                         |
|         OPTIONS                          |
|         QUIT                             |
+==========================================+
```
Score: 7.5/10

## C) Freehand + Skill
```
╔══════════════════════════════════════════════════════════════════════════╗
║  ✦   ·     ·    ✦      ·       ⋆      ·    ✦       ·     ⋆    ·   ✦   ║
║     ·   ·         ·         ·      ·         ·   ·          ·          ║
║                                                                          ║
║   ░▒▓██████  ▓████▓  ████▓  █████▓  ████▓ ▓████▓                       ║
║   ░▒▓██   ▓▒░ ▓▒  ▒▓ ██  ▓ ██   ▓▒ ██  ▓▒ ██   ▓▒                      ║
║   ░▒▓██████   ▓████▓ ████▓ ██   ▓▒ ██  ▓▒ ██   ▓▒                      ║
║   ░▒▓██   ▓▒░ ▓▒  ▒▓ ██  ▓ ██   ▓▒ ██  ▓▒ ██   ▓▒                      ║
║   ░▒▓██████  ▓████▓  ██  ▓ ▓████▓  ▓███▓  ▓████▓                       ║
║                                                                          ║
║         ▓████▓ ▓█  ▓█ ▓███▓ █████  █████                               ║
║         ▓█  ▓▒ ▓█  ▓█ ▓█    ██     █                                    ║
║         ▓█  ▓▒ ▓█  ▓█ ▓███▓ ████   ████                                 ║
║         ▓█▓▓▓▒  ▓██▓  ██  ▓ ██        █                                 ║
║         ▓█  ▓▒   ▓█    ███▓ █████ ████                                  ║
║                                                                          ║
║    ·    ✦   ·       ·    ⋆      ·     ·    ✦         ·    ·            ║
║                       ╱▔▔▔▔╲                                            ║
║                      ╱  ◉◉  ╲      ┌──╲                                 ║
║                     ╱  /  \  ╲    │░░░░╲                                ║
║                    ╱   \__/   ╲   │ ▓▓▓ ╲                               ║
║                   ╱      _     ╲  │  ███  ╲___                          ║
║              ____╱     _( )_    ╲_│   ████     ╲___                     ║
║             ╱   ╱    /█████╲___╱  │    ████        ╲___                 ║
║            ╱   ╱  ▓██████████▓    │     █████          ╲___             ║
║           ╱  ╱  ▓██▓ DRAGON ▓██▓  │      ████              ╲            ║
║          ╱_╱  ▓████████████████▓  │       ████              ╲           ║
║              ▓██████████████████▓ │        █████              ╲___      ║
║              ░▒▓██████████████▓▒░  ╲        ████                  ╲     ║
║                ░░░░░░░░░░░░░░░░     ╲___    ████___               ╲     ║
║                                          ╲▓▓▓▓▓▓▓▓▓▓╲___                ║
║                                           ░░░░░░░░░░░░░░                ║
║                                                                          ║
╠══════════════════════ ╡  M A I N   M E N U  ╞ ════════════════════════╣
║                                                                          ║
║                       ▸  N E W   G A M E                                ║
║                          C O N T I N U E                                ║
║                          O P T I O N S                                  ║
║                          C R E D I T S                                  ║
║                          E X I T                                        ║
║                                                                          ║
║                  ─── ✦ ─── PRESS START ─── ✦ ───                       ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  v1.0  │  (C) 2026 ASKI STUDIOS  │  ▲▼ select   ▸ confirm   ESC back  ║
╚══════════════════════════════════════════════════════════════════════════╝
```
Score: 9.5/10

## Verdict
CLI v2 produces a functional title with a generic dragon ASCII art. Freehand has a clearer dragon but lacks atmosphere. The skill-enhanced version applies Recipe 3 fully: glowing title with ░▒▓ gradient embossed shadows on each block letter, scattered ✦ · ⋆ stars throughout the sky, a detailed dragon character with ◉ eyes, ▓██ scaled body, and ╲ wing structure with shadow casting (░), the menu sits in a framed section with ╡ ╞ ornaments, "PRESS START" footer with ✦ flourishes, plus a status bar showing version, copyright, and key bindings. The dragon went from a flat blob to a creature with wings, scales, and shadow.
