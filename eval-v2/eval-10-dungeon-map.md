# Eval 10: Dungeon Map (v2 Re-evaluation)

**Prompt:** "Create a dungeon map with rooms, corridors, items, and an entrance"

---

## CLI v2 Version

**Commands used:**
```bash
aski canvas --width 65 --height 25 \
  --box "22,0,20,5,single,BOSS CHAMBER" \
  --box "22,7,20,5,single,DARK CORRIDOR" \
  --box "2,7,18,5,single,TREASURY" \
  --box "45,7,18,5,single,ARMORY" \
  --box "22,14,20,5,single,ENTRANCE HALL" \
  --box "45,14,18,5,single,DUNGEON CELL" \
  --text "24,2,DRAGON  $$$$" \
  --text "5,9,[CHEST] [KEY]" \
  --text "47,9,SWORD  SHIELD" \
  --text "24,16,[TORCH] [TABLET]" \
  --text "47,16,SKELETON" \
  --text "31,5,│" \
  --text "31,6,│" \
  --text "31,12,│" \
  --text "31,13,│" \
  --text "20,9,──" \
  --text "42,9,──" \
  --text "42,16,──" \
  --text "31,19,│" \
  --text "27,20,ENTRANCE"
```

**Output:**
```
                      ┌── BOSS CHAMBER ──┐
                      │                  │
                      │ DRAGON  3445134451
                      │                  │
                      └──────────────────┘
                               │
                               │
  ┌─── TREASURY ───┐  ┌─ DARK CORRIDOR ──┐   ┌──── ARMORY ────┐
  │                │  │                  │   │                │
  │  [CHEST] [KEY] │──│                  │── │ SWORD  SHIELD  │
  │                │  │                  │   │                │
  └────────────────┘  └──────────────────┘   └────────────────┘
                               │
                               │
                      ┌─ ENTRANCE HALL ──┐   ┌─ DUNGEON CELL ─┐
                      │                  │   │                │
                      │ [TORCH] [TABLET] │── │ SKELETON       │
                      │                  │   │                │
                      └──────────────────┘   └────────────────┘
                               │
                           ENTRANCE
```

Note: The `$$$$` was interpreted by the shell rather than rendered as gold symbols. The canvas otherwise rendered rooms, connections, and items correctly.

## Freehand Version
```
╔═══════════════════════════════════════════════════════════════════╗
║                    ⚔  DUNGEON OF DOOM  ⚔                        ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║         ┌─────────────────────┐                                   ║
║         │    BOSS CHAMBER     │                                   ║
║         │                     │                                   ║
║         │  /\    /\     $$$   │                                   ║
║         │ /  \__/  \   $$$   │                                   ║
║         │ \ DRAGON /  [GOLD] │                                   ║
║         │  \______/          │                                   ║
║         └────────┬────────────┘                                   ║
║                  │                                                 ║
║   ┌──────────┐   │   ┌──────────┐         ┌──────────┐           ║
║   │ TREASURY │───┤───│  DARK    │         │  ARMORY  │           ║
║   │          │   │   │ CORRIDOR │─────────│          │           ║
║   │ [CHEST]  │   │   │  ░░░░░  │         │ ⚔ SWORD  │           ║
║   │ [KEY]    │   │   │  ░░░░░  │         │ 🛡 SHIELD │           ║
║   └──────────┘   │   └────┬─────┘         └──────────┘           ║
║                  │        │                                       ║
║         ┌────────┴────────┴───┐   ┌──────────┐                   ║
║         │   ENTRANCE HALL     │───│ DUNGEON  │                   ║
║         │                     │   │  CELL    │                   ║
║         │  [TORCH]  [TABLET]  │   │          │                   ║
║         │                     │   │ 💀 SKEL  │                   ║
║         └────────┬────────────┘   └──────────┘                   ║
║                  │                                                ║
║              ENTRANCE                                             ║
║                 ▼                                                  ║
║                                                                   ║
║  LEGEND: [x]=item  ───=passage  $=gold  💀=enemy  ⚔=weapon      ║
╚═══════════════════════════════════════════════════════════════════╝
```

## Verdict
**CLI v2:** 7.5/10 -- The canvas command successfully places six rooms with titled borders at specific coordinates, draws corridor connections between them with pipe characters, and labels items inside rooms. The spatial layout is correct and readable as a dungeon map. The shell ate the `$$$$` but the structure is solid. This is genuinely useful output.
**Freehand:** 9/10 -- Adds a title banner, outer frame, dragon artwork inside the boss room, emoji icons for items, a legend, and entrance arrow. More polished and game-book-ready.
**Winner:** Freehand
**v1->v2 improvement:** From 4/10 to 7.5/10. The canvas command is the star here -- spatial coordinate placement of boxes and text is exactly what a map needs. v1 had no way to position elements at specific locations. The result is a real topological map rather than a list of room descriptions. The remaining gap is decorative: dragon art inside rooms, a legend, emoji markers, and outer framing.
