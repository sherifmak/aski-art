# Eval 03: Crypto Dashboard (3-Way Evaluation)

**Prompt:** "Crypto trading dashboard with portfolio, prices chart"

---

## A) CLI v2
**Command:** `aski compose --horizontal --gap 2 --exec "aski interface --components 'header:text=TRADING,divider,progress:label=BTC:value=62:max=100,progress:label=ETH:value=24:max=100,progress:label=SOL:value=11:max=100,kvlist:items=Total|127K;PnL|+2841' --width 35 --border double" --exec "aski chart --type bar --data 'BTC,68421;ETH,3847;SOL,142;AVAX,34' --width 28 --title Prices"`
```
╔═════════════════════════════════╗  Prices
║                                 ║  BTC   ███████████████  68421
║             TRADING             ║  ETH   █                 3847
║                                 ║  SOL                      142
╠═════════════════════════════════╣  AVAX                      34
║  BTC: ████████████░░░░░░░  62%  ║
║  ETH: █████░░░░░░░░░░░░░░  24%  ║
║  SOL: ██░░░░░░░░░░░░░░░░░  11%  ║
║  Total:  127K                   ║
║  PnL:    +2841                  ║
╚═════════════════════════════════╝
```
Score: 7/10

## B) Freehand (no skill)
```
+===========================+  +========================+
|       CRYPTO TRADING      |  |     PRICE CHART        |
+---------------------------+  +------------------------+
| BTC: ████████████░░  62%  |  | BTC  ████████████ 68421|
| ETH: █████░░░░░░░░  24%  |  | ETH  █            3847 |
| SOL: ██░░░░░░░░░░░  11%  |  | SOL  ░             142 |
+---------------------------+  | AVAX ░              34 |
| Total: $127,000           |  +------------------------+
| PnL:   +$2,841 (+2.2%)   |
| 24h Vol: $4.2B            |
+===========================+
```
Score: 7/10

## C) Freehand + Skill
```
┌──[ ● ● ● ]───────────────────────────────────────────────────────────────┐
│                    C R Y P T O   T R A D I N G   v3.1                     │
├──────────────────────────────────┬────────────────────────────────────────┤
│  ◉ PORTFOLIO ALLOCATION          │  ◉ PRICE ACTION (24H)                 │
│                                  │                                        │
│  BTC  ██████████████░░░░░  62%   │  BTC    $68,421    ▲ +2.4%            │
│  ETH  ██████░░░░░░░░░░░░░  24%   │  ETH     $3,847    ▲ +1.1%            │
│  SOL  ███░░░░░░░░░░░░░░░░  11%   │  SOL       $142    ▼ -3.2%            │
│  AVAX █░░░░░░░░░░░░░░░░░░   3%   │  AVAX       $34    ▲ +0.8%            │
│                                  │                                        │
│  ──── ✦ ────────────────────     │  ──── ✦ ──────────────────────        │
│                                  │                                        │
│  Total Value:     $127,000       │  7D SPARKLINE (BTC):                   │
│  24h PnL:         +$2,841        │  $70k┤                                 │
│  Unrealized:      +$14,200       │      │    ╭╮                           │
│  Realized:        +$8,300        │  $68k┤╭──╯ ╰╮  ╭─                     │
│                                  │      ││     ╰──╯                       │
├──────────────────────────────────┤  $65k┤╯                                │
│  ◉ OPEN ORDERS                   │      └──┬──┬──┬──┬──┬──┬──            │
│                                  │        M  T  W  T  F  S  S             │
│  LIMIT BUY   BTC  @ $65,000     │                                        │
│  LIMIT SELL  ETH  @ $4,200      ├────────────────────────────────────────┤
│  STOP LOSS   SOL  @ $120        │  ◉ MARKET STATUS                       │
│                                  │  BTC Dom: 54.2%  │  Fear Index: 72    │
├──────────────────────────────────┤  Gas: 23 gwei    │  Funding: +0.01%   │
│  ▲ +2.3% portfolio (24h)        │  ● MARKETS OPEN  │  Next halving: 847d│
└──────────────────────────────────┴────────────────────────────────────────┘
```
Score: 9/10

## Verdict
The CLI v2 provides a functional side-by-side but the chart panel is sparse and unframed. Freehand improves with basic formatting. The skill-enhanced version applies Recipe 4 (Dashboard) extensively: terminal window chrome (● ● ●), multi-panel grid with ├─┤ dividers, sparkline chart using ╭╮│ characters, section headers with ◉ bullets, data hierarchy (primary values bold, secondary indented), status indicators, and a market status panel. The information density increase is dramatic.
