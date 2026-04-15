# Eval 07: Fantasy Weather (v2 Re-evaluation)

**Prompt:** "Create a fantasy world weather report with regional data and danger levels"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --vertical \
  --exec "aski text 'ELDORIA' --font mini" \
  --exec "aski table --data 'Region,Weather,Temp,Danger;Elvish Woods,Enchanted Fog,72°F,Low;Dragon Peaks,Fire Rain,1200°F,EXTREME;Crystal Lake,Moonshine,45°F,None;Shadow Realm,Void Storm,???°F,HIGH;Hobbit Shire,Partly Cloudy,68°F,None' --style rounded" \
  --exec "aski chart --type bar --data 'Elvish Woods,2;Dragon Peaks,10;Crystal Lake,1;Shadow Realm,8;Hobbit Shire,1' --width 50 --title 'Danger Level'"
```

**Output:**
```
|--\|   |>\ /--\|--\===| /\
|-- |   |  ||  ||--/ |  /--\
|--/|__ |>/ \--/| \ ===|/  \
╭──────────────┬───────────────┬────────┬─────────╮
│ Region       │ Weather       │ Temp   │ Danger  │
├──────────────┼───────────────┼────────┼─────────┤
│ Elvish Woods │ Enchanted Fog │ 72°F   │ Low     │
│ Dragon Peaks │ Fire Rain     │ 1200°F │ EXTREME │
│ Crystal Lake │ Moonshine     │ 45°F   │ None    │
│ Shadow Realm │ Void Storm    │ ???°F  │ HIGH    │
│ Hobbit Shire │ Partly Cloudy │ 68°F   │ None    │
╰──────────────┴───────────────┴────────┴─────────╯
Danger Level
Elvish Woods  ██████                             2
Dragon Peaks  ████████████████████████████████  10
Crystal Lake  ███                                1
Shadow Realm  ██████████████████████████         8
Hobbit Shire  ███                                1
```

## Freehand Version
```
╔═══════════════════════════════════════════════════════════╗
║           ☁  ELDORIA WEATHER SERVICE  ☁                  ║
║              ~ Arcane Meteorology Div. ~                  ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   🌲 ELVISH WOODS          ☁ DRAGON PEAKS                ║
║   ░░▓▓░░ Enchanted Fog     🔥🔥🔥 Fire Rain              ║
║   Temp: 72°F               Temp: 1,200°F                 ║
║   Wind: Whispered          Wind: Volcanic Updraft         ║
║   Danger: ▓░░░░ LOW        Danger: ▓▓▓▓▓ EXTREME         ║
║                                                           ║
║   💎 CRYSTAL LAKE           ◆ SHADOW REALM                ║
║   ✨ Moonshine Glow         ▓▓▓▓ Void Storm              ║
║   Temp: 45°F               Temp: ???°F                    ║
║   Wind: Still               Wind: Screaming               ║
║   Danger: ░░░░░ NONE       Danger: ▓▓▓▓░ HIGH            ║
║                                                           ║
║   🏠 HOBBIT SHIRE                                         ║
║   ⛅ Partly Cloudy                                        ║
║   Temp: 68°F  Wind: Gentle Breeze                         ║
║   Danger: ░░░░░ NONE                                      ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║   ALERT: ⚠  FIRE RAIN WARNING for Dragon Peaks           ║
║   All flights grounded. Phoenix escort required.          ║
╠═══════════════════════════════════════════════════════════╣
║   5-DAY OUTLOOK:                                          ║
║                                                           ║
║   Mon   Tue   Wed   Thu   Fri                             ║
║    ☀     ⛅    🌧     ☁     ✨                             ║
║   Clear  Mix  Storm  Fog  Magic                           ║
╚═══════════════════════════════════════════════════════════╝
```

## Verdict
**CLI v2:** 7/10 -- The table cleanly presents all weather data with proper alignment. The bar chart adds a real data-visualization dimension showing danger levels at a glance. The mini font title is readable. This is a functional weather report.
**Freehand:** 9/10 -- Rich layout with side-by-side regions, danger gauges, weather alerts, 5-day forecast, and thematic personality. Feels like a real fantasy weather broadcast rather than just a data dump.
**Winner:** Freehand
**v1->v2 improvement:** From 5/10 to 7/10. The compose command stacks title + table + chart cleanly. The chart subcommand adds the danger-level bar graph which v1 couldn't do at all. v1 could only produce a table. The gap closed because structured data is the CLI's strength, but the freehand version's spatial layout and thematic richness remain out of reach.
