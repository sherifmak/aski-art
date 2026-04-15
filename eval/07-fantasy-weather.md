# Eval 07: Fantasy Weather Forecast

**Prompt:** "Draw a weather forecast for a fantasy world"

---

## CLI Version

**Commands used:**
```bash
aski table --data "Region,Weather,Temp,Danger;Elvish Woods,Enchanted Fog,72°F,Low;Dragon Peaks,Fire Rain,1200°F,EXTREME;Crystal Lake,Moonshine,45°F,None;Shadow Realm,Void Storm,???°F,HIGH;Hobbit Shire,Partly Cloudy,68°F,None" --style rounded
```

**Output:**
```
╭──────────────┬───────────────┬────────┬─────────╮
│ Region       │ Weather       │ Temp   │ Danger  │
├──────────────┼───────────────┼────────┼─────────┤
│ Elvish Woods │ Enchanted Fog │ 72°F   │ Low     │
│ Dragon Peaks │ Fire Rain     │ 1200°F │ EXTREME │
│ Crystal Lake │ Moonshine     │ 45°F   │ None    │
│ Shadow Realm │ Void Storm    │ ???°F  │ HIGH    │
│ Hobbit Shire │ Partly Cloudy │ 68°F   │ None    │
╰──────────────┴───────────────┴────────┴─────────╯
```

## Freehand Version

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║  ~^~   REALM OF ELDORIA — Weather Forecast — Third Moon, Age of Embers  ~^~ ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║                        .  *  .         ___                                  ║
║        ░░░░            * /\ *      ___/   \___         _,,---,,_            ║
║       ░░░░░░  ENCHANTED / /\ \    /  DRAGON   \      /          \           ║
║        ░░░░    FOG     / /  \ \  /    PEAKS     \   /  SHADOW    \          ║
║     ~~~~░░~~~~~       /▲/    \▲\/   /\    /\     \_/    REALM     \         ║
║    ~ ELVISH  ~       / /  /\  \ \  /##\  /##\     |               |        ║
║    ~  WOODS  ~      /▲/ /{{}\ \▲\ /####\/####\    | )))  VOID  ((( |       ║
║    ~~~~~~~~~~       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^   |  )) STORM ((  |        ║
║                     1200°F  FIRE RAIN  !!!!!       |   )))  (((   |         ║
║         72°F             \|/ \|/ \|/               |    ???°F     |         ║
║                           |   |   |                 \_           _/         ║
║          ___               \ | | /                    \_,,---,,_/           ║
║       .-'   '-.    ~~~~~~~~~~~~~~~~~~~~~~~~                                 ║
║      /  ( . )  \  ~ ~~~ CRYSTAL ~~~ ~~~ ~            68°F                  ║
║     |    \_/    | ~  ~~~  LAKE  ~~~ ~~~ ~~                                  ║
║      \  MOON  /   ~ ~~~ ~~~~~~ ~~~ ~~~ ~     .---.  HOBBIT                 ║
║       '-._.-'      ~~~~~~~~~~~~~~~~~~~~~~~~  ( _ _ ) SHIRE                 ║
║        45°F                                   '---'  _/|\_                 ║
║      Moonshine             ~^~                 \_|_/ /    \                ║
║                                               Partly Cloudy               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  LEGEND:                                                                    ║
║   ░░░ = Fog/Mist    /▲\ = Mountains    ~~~ = Water     ))) = Void Energy   ║
║   \|/ = Fire Rain   (.) = Moonshine    _/\_ = Hills    {} = Lava           ║
║                                                                             ║
║  DANGER LEVELS:                                                             ║
║   Elvish Woods  [▓░░░░░░░░░] Low       Crystal Lake [░░░░░░░░░░] None      ║
║   Dragon Peaks  [▓▓▓▓▓▓▓▓▓▓] EXTREME   Shadow Realm [▓▓▓▓▓▓▓▓░░] HIGH    ║
║   Hobbit Shire  [░░░░░░░░░░] None                                          ║
║                                                                             ║
║  ADVISORY: Avoid Dragon Peaks. Void Storm expanding. Moonshine tonight.     ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

## Verdict

**CLI:** Produces a clean, scannable table of weather data -- functional and quick to generate.
**Freehand:** Creates an immersive illustrated map with terrain, weather symbols, danger meters, and a parchment-style layout.
**Winner:** Freehand -- the creative context demands illustration and spatial storytelling that a table cannot provide.
