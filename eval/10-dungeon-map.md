# Eval 10: Dungeon Map

**Prompt:** "Build a dungeon map for a text adventure game"

---

## CLI Version

**Commands used:**
```bash
aski table --data "Room,Contents,Exits;Entrance Hall,Torch (lit) + Stone tablet,N E;Armory,Rusted sword + Shield,S W;Dark Corridor,Tripwire trap!,E W;Treasury,Gold chest (locked) + Key,W;Dungeon Cell,Skeleton + Note,N;Boss Chamber,DRAGON (hostile) + Hoard,S E" --style rounded
```

**Output:**
```
╭───────────────┬────────────────────────────┬───────╮
│ Room          │ Contents                   │ Exits │
├───────────────┼────────────────────────────┼───────┤
│ Entrance Hall │ Torch (lit) + Stone tablet │ N E   │
│ Armory        │ Rusted sword + Shield      │ S W   │
│ Dark Corridor │ Tripwire trap!             │ E W   │
│ Treasury      │ Gold chest (locked) + Key  │ W     │
│ Dungeon Cell  │ Skeleton + Note            │ N     │
│ Boss Chamber  │ DRAGON (hostile) + Hoard   │ S E   │
╰───────────────┴────────────────────────────┴───────╯
```

## Freehand Version

```
    N
  W + E                 THE CATACOMBS OF DREADMOOR
    S                   ~~~~~~~~~~~~~~~~~~~~~~~~~~

         ┌─────────────────────┐
         │                     │
         │    BOSS CHAMBER     │         ┌─────────────────┐
         │                     │         │                 │
         │  ~~~~~~~~~~~~~~~    │         │    TREASURY     │
         │  ~ DRAGON HOARD ~   ├─────D───┤                 │
         │  ~ $$$$  /\_/\  ~   │         │  [CHEST]  [KEY] │
         │  ~ $$$$ ( o.o ) ~   │         │   locked!       │
         │  ~  $$   > ^ <  ~   │         └────────┬────────┘
         │  ~~~~~~~~~~~~~~~    │                  │
         └──────────┬─────────┘                  │
                    │                             │
                    D  (locked - need key)        │
                    │                             │
         ┌──────────┴─────────┐        ┌─────────┴────────┐
         │                     │        │                  │
         │   DARK CORRIDOR     ├────────┤   ARMORY         │
         │                     │        │                  │
         │   !!  TRAP  !!      │        │  /|  []          │
         │   ~~ tripwire ~~    │        │ / | [==]  +      │
         │                     │        │ (sword) (shield) │
         └──────────┬─────────┘        └──────────────────┘
                    │                            |
                    │                     ·······|·······
                    │                     : SECRET PASSAGE:
                    │                     :   (hidden)    :
                    │                     ·······|········
         ┌──────────┴─────────┐                 |
         │                     │        ┌───────┴──────────┐
         │   ENTRANCE HALL     ├────D───┤   DUNGEON CELL   │
         │                     │        │                   │
         │  [TORCH]  [TABLET]  │        │   _              │
         │    *                │        │  / \  SKELETON    │
         │   /|\   "Welcome,  │        │ |x x|             │
         │    |     Adventurer"│        │  \_/  [NOTE]      │
         │                     │        │  /|\              │
         └─────────┬──────────┘        │  / \              │
                   │                    └──────────────────┘
                   │
              ═════╧═════
              ║ ENTRANCE ║
              ═══════════

  ┌──────────────────────────────────────────────────────┐
  │  LEGEND:                                             │
  │   D    = Door               $$   = Gold/treasure     │
  │   !!   = Trap               [  ] = Item              │
  │   ···  = Secret passage     *    = Light source      │
  │  /\_/\ = Dragon             +    = Shield            │
  │  /|    = Sword             x x   = Skeleton          │
  │                                                      │
  │  QUEST: Find the KEY in the Treasury, unlock the     │
  │  Boss Chamber door, and defeat the DRAGON!           │
  └──────────────────────────────────────────────────────┘
```

## Verdict

**CLI:** Provides a well-organized room legend table showing contents and exits, but cannot represent spatial relationships between rooms.
**Freehand:** Creates a full spatial dungeon map with connected rooms, corridor layout, a secret passage, item illustrations, a dragon, and a complete legend.
**Winner:** Freehand -- maps are inherently spatial, and tables cannot convey layout, adjacency, or navigation paths.
