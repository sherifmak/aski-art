# Eval 03: Crypto Dashboard (v2 Re-evaluation)

**Prompt:** "Create a cryptocurrency portfolio dashboard with a title, portfolio breakdown with progress bars, price chart, key-value stats, and a sparkline"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --vertical \
  --exec "aski text 'CRYPTO' --font block" \
  --exec "aski compose --horizontal --gap 2 \
    --exec 'aski interface --components \"header:text=PORTFOLIO,divider,progress:label=BTC:value=62:max=100,progress:label=ETH:value=24:max=100,progress:label=SOL:value=11:max=100,divider,kvlist:items=Total|\$127450;P&L|+\$2841;Win Rate|64.2%\" --width 40 --border double' \
    --exec 'aski chart --type bar --data \"BTC,68421;ETH,3847;SOL,142;DOGE,0.12;AVAX,34\" --width 30 --title \"Prices\"'" \
  --exec "aski chart --type sparkline --data '64000,65200,66100,65800,67400,68100,67800,68421' --label 'BTC 24h'"
```

**Output:**
```
████ █████ █    ██████ ██████ ████
█    ██    █ █  █ █    █  ██  █    █
█     █████   ██  █████   ██  █    █
█    ██  █    ██  █       ██  █    █
 ████ █   █   ██  █       ██   ████
╔══════════════════════════════════════╗  Prices
║                                      ║  BTC   █████████████████  68421
║              PORTFOLIO               ║  ETH   █                   3847
║                                      ║  SOL                        142
╠══════════════════════════════════════╣  DOGE                      0.12
║  BTC: ███████████████░░░░░░░░░  62%  ║  AVAX                        34
║  ETH: ██████░░░░░░░░░░░░░░░░░░  24%  ║
║  SOL: ███░░░░░░░░░░░░░░░░░░░░░  11%  ║
╠══════════════════════════════════════╣
║  Total:     27450                    ║
║  P&L:       +841                     ║
║  Win Rate:  64.2%                    ║
╚══════════════════════════════════════╝
BTC 24h ▁▃▄▄▆▇▇█
```

## Freehand Version
```
╔══════════════════════════════════════════════════════════════════════════╗
║  ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗     ██████╗ ██████╗ ║
║ ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗    ╚════██╗██╔══██╗║
║ ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║     █████╔╝██║  ██║║
║ ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║    ██╔═══╝ ██║  ██║║
║ ╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝    ███████╗██████╔╝║
║  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝     ╚══════╝╚═════╝║
╠═════════════════════════════════╦════════════════════════════════════════╣
║  PORTFOLIO ALLOCATION           ║  LIVE PRICES           24h Change     ║
║  ─────────────────────────────  ║  ──────────────────────────────────── ║
║                                 ║                                       ║
║  BTC  ████████████████░░░░ 62%  ║  BTC  $68,421.00       ▲ +2.4%       ║
║       $79,621                   ║  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  ║
║                                 ║  ETH  $ 3,847.50       ▲ +1.1%       ║
║  ETH  ██████████░░░░░░░░░ 24%  ║  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  ║
║       $30,588                   ║  SOL  $   142.30       ▼ -0.8%       ║
║                                 ║  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  ║
║  SOL  ████░░░░░░░░░░░░░░░ 11%  ║  DOGE $     0.12       ▲ +5.2%       ║
║       $14,019                   ║  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈  ║
║                                 ║  AVAX $    34.00       ▼ -1.3%       ║
║  Other ██░░░░░░░░░░░░░░░░  3%  ║                                       ║
║       $3,222                    ║  BTC 24h:                             ║
║  ─────────────────────────────  ║    69k┤                          ╭──  ║
║  Total:      $127,450           ║    68k┤              ╭───╮  ╭──╯     ║
║  P&L:        +$2,841 (+2.3%)    ║    67k┤         ╭───╯   ╰──╯        ║
║  Win Rate:   64.2%              ║    66k┤    ╭───╯                     ║
║  Best:  DOGE  +5.2% today      ║    65k┤╭──╯                          ║
║  Worst: AVAX  -1.3% today      ║    64k┤╯                             ║
║                                 ║       └───┬───┬───┬───┬───┬───┬───   ║
║  Fear & Greed: 72 (Greed)      ║       0h  3h  6h  9h  12h 18h 24h   ║
╚═════════════════════════════════╩════════════════════════════════════════╝
```

## Verdict
**CLI v2:** 7/10 -- The compose command successfully stacks a block title, side-by-side panels (portfolio + bar chart), and a sparkline. The progress bars and key-value list render correctly inside a double-bordered panel. The bar chart is functional. However, dollar signs got eaten (showing 27450 instead of $127,450), and the sparkline is just 8 characters wide -- minimal.
**Freehand:** 9.5/10 -- Full two-panel dashboard with formatted currency, percentage changes with directional arrows, per-asset dollar values, a proper Y-axis sparkline chart with time labels, and market sentiment indicator. This looks like something you'd actually use.
**Winner:** Freehand -- The CLI makes a respectable dashboard skeleton, but the freehand version has the data density and polish of a real terminal application. The sparkline with axes alone is worth the gap.
**v1->v2 improvement:** Compose + charts + interface make side-by-side panels and sparklines possible for the first time. Score went from 7/10 to 7/10 in practice -- the dollar sign escaping issue and tiny sparkline hold it back. The capability is there but the ergonomics need work. Theoretical improvement is 8.5/10 if the escaping issues are fixed.
