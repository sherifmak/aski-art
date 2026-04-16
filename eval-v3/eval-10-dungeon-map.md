# Eval 10: Dungeon Map (3-Way Evaluation)

**Prompt:** "Dungeon map with rooms, corridors, items, and creatures"

---

## A) CLI v2
**Command:** `aski canvas --width 60 --height 22 --box "20,0,20,4,single,BOSS" --box "20,6,20,4,single,CORRIDOR" --box "0,6,18,4,single,TREASURY" --box "42,6,18,4,single,ARMORY" --box "20,12,20,4,single,ENTRANCE" --box "42,12,18,4,single,CELL" --text "23,2,DRAGON" --text "3,8,CHEST KEY" --text "44,8,SWORD" --text "23,14,TORCH"`
```
                    ┌────── BOSS ──────┐
                    │                  │
                    │  DRAGON          │
                    └──────────────────┘


┌─── TREASURY ───┐  ┌──── CORRIDOR ────┐  ┌──── ARMORY ────┐
│                │  │                  │  │                │
│  CHEST KEY     │  │                  │  │ SWORD          │
└────────────────┘  └──────────────────┘  └────────────────┘


                    ┌──── ENTRANCE ────┐  ┌───── CELL ─────┐
                    │                  │  │                │
                    │  TORCH           │  │                │
                    └──────────────────┘  └────────────────┘
```
Score: 7/10

## B) Freehand (no skill)
```
                    +-----------------+
                    |     BOSS        |
                    |   ~ DRAGON ~    |
                    +--------+--------+
                             |
+--------------+    +--------+--------+    +--------------+
|  TREASURY    |----|    CORRIDOR     |----|   ARMORY     |
|  [CHEST KEY] |    |                 |    |  [SWORD]     |
+--------------+    +--------+--------+    +--------------+
                             |
                    +--------+--------+    +--------------+
                    |   ENTRANCE      |----|    CELL      |
                    |  ! TORCH        |    |              |
                    +-----------------+    +--------------+
```
Score: 7.5/10

## C) Freehand + Skill
```
╔══════════════════════════════════════════════════════════════════════════════╗
║          ☠   T H E   D U N G E O N   O F   K H A Z M I N D   ☠              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                            ┌─────────────┐                   ║
║                                            │      N      │                   ║
║                                            │      ▲      │                   ║
║                                            │   W ◀╋▶ E   │                   ║
║                                            │      ▼      │                   ║
║   ╔════════════════════════════════╗       │      S      │                   ║
║   ║   ▓▓▓ THRONE OF SCALES ▓▓▓    ║       └─────────────┘                   ║
║   ║                                ║                                          ║
║   ║         ╱▔▔▔▔▔▔▔▔╲            ║                                          ║
║   ║        ╱  ◉    ◉  ╲           ║                                          ║
║   ║       │   ╲ ▽ ╱   │            ║                                          ║
║   ║        ╲___▼___╱             ║                                          ║
║   ║       ▓████████████▓          ║                                          ║
║   ║      ▓██  DRAGON   ██▓         ║                                          ║
║   ║       ▓████████████▓          ║                                          ║
║   ║        ░░░░░░░░░░░░            ║                                          ║
║   ╚═══════════════╤════════════════╝                                          ║
║                   │                                                          ║
║                ═╡D╞═                                                         ║
║                   │                                                          ║
║   ┌──────────────┴┴─────────────────┐                                        ║
║   │  ◇ TREASURY ◇   │  CORRIDOR  │  │  ◇ ARMORY ◇                            ║
║   ├─────────────────┤            ├──┴────────────────┐                       ║
║   │  ▓▓ ▓▓  ▓▓ ▓▓   │            │   ⚔   ⚔    ⚔     │                       ║
║   │   ◯ chest       │            │   ⚔  rack  ⚔     │                       ║
║   │   ⚷ KEY         ├─····─······┤    SWORD ⚔       │                       ║
║   │   ◈ gem         │  secret    │   ⚔   shield     │                       ║
║   │   ░░░░░░░░░░    │  passage   │   ░░░░░░░░░░░░   │                       ║
║   └─────────┬───────┘            └────────┬─────────┘                       ║
║             │                             │                                  ║
║             └──────────┬─────────────────┘                                   ║
║                        │                                                     ║
║                     ═╡D╞═                                                    ║
║                        │                                                     ║
║   ┌────────────────────┴─────────┐  ═╡D╞═  ┌───────────────────┐             ║
║   │   ✦ ENTRANCE ✦                │ ──────  │  ✦ HOLDING CELL  │             ║
║   ├──────────────────────────────┤         ├───────────────────┤             ║
║   │   ▲ stairs up                │         │   ⛓  shackles     │             ║
║   │   ☼ TORCH (lit)              │         │   ☠ skeleton      │             ║
║   │   ⚠ trap: pressure plate     │         │   · · · ·         │             ║
║   │   ░░░░░░░░░░░░░░░░░░░░       │         │   ░░░░░░░░░░░░    │             ║
║   └──────────────────────────────┘         └───────────────────┘             ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  ┌─ LEGEND ─────────────────────┐  ┌─ QUEST ─────────────────────────────┐  ║
║  │ ⚔ Weapon   ⚷ Key   ◯ Chest  │  │ "Find the chest key in the treasury,│  ║
║  │ ☠ Boss    ☼ Torch ⚠ Trap    │  │  unlock the armory for a sword,     │  ║
║  │ ═╡D╞═ Door  ····· Secret    │  │  then face the Dragon. Glory awaits."│  ║
║  └──────────────────────────────┘  └─────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
Score: 9.5/10

## Verdict
CLI v2 places the rooms but no corridors connect them and items are just text labels. Freehand adds connections but lacks symbol vocabulary. The skill-enhanced version applies Recipe 5 (Map) thoroughly: a compass rose (N/S/E/W with arrows), the boss room contains an actual dragon character with ◉ eyes, ▽ snout, ▓██ scaled body, and ░ shadow, doors marked with ═╡D╞═ between rooms, a secret passage shown with ····· dotted line, item icons throughout (⚔ ⚷ ◯ ◈ ⛓ ☠ ☼ ⚠) instead of plain text, proportionally larger boss room, a legend explaining all symbols, and an in-world quest text box. This is what a published TTRPG dungeon page looks like.
