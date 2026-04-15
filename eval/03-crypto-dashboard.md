# Eval 03: Crypto Trading Dashboard

**Prompt:** "Display a real-time crypto trading dashboard"

---

## CLI Version

**Commands used:**
```bash
aski interface --components "header:text=CRYPTO TRADING TERMINAL,divider,kvlist:items=BTC/USD|68421.50 ▲ +2.4%;ETH/USD|3847.20 ▲ +1.8%;SOL/USD|142.67 ▼ −0.6%,divider,progress:label=Portfolio:value=78:max=100,progress:label=Risk:value=34:max=100,divider,kvlist:items=P&L Today|+\$2841.50;Open Orders|3;Win Rate|64.2%;Margin Used|34%,divider,statuslist:items=✓ BTC Long 0.5 @ 67200;✓ ETH Long 2.0 @ 3780;● SOL Short 10 @ 144.20;✗ DOGE Stop-loss hit" --width 54 --border double
```

**Output:**
```
╔════════════════════════════════════════════════════╗
║                                                    ║
║              CRYPTO TRADING TERMINAL               ║
║                                                    ║
╠════════════════════════════════════════════════════╣
║  BTC/USD:  68421.50 ▲ +2.4%                        ║
║  ETH/USD:  3847.20 ▲ +1.8%                         ║
║  SOL/USD:  142.67 ▼ −0.6%                          ║
╠════════════════════════════════════════════════════╣
║  Portfolio: █████████████████████████░░░░░░░  78%  ║
║  Risk: █████████████░░░░░░░░░░░░░░░░░░░░░░░░  34%  ║
╠════════════════════════════════════════════════════╣
║  P&L Today:    +$2841.50                           ║
║  Open Orders:  3                                   ║
║  Win Rate:     64.2%                               ║
║  Margin Used:  34%                                 ║
╠════════════════════════════════════════════════════╣
║  ✓ BTC Long 0.5 @ 67200                            ║
║  ✓ ETH Long 2.0 @ 3780                             ║
║  ● SOL Short 10 @ 144.20                           ║
║  ✗ DOGE Stop-loss hit                              ║
╚════════════════════════════════════════════════════╝
```

## Freehand Version

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║  CRYPTO TRADING TERMINAL                          14 Apr 2026  09:42:17 UTC    ║
║  ══════════════════════                           Session: #4821  Live ●        ║
╠══════════════════════════════════════════╦════════════════════════════════════════╣
║  BTC/USD  $68,421.50  ▲ +2.4%           ║  ORDER BOOK  BTC/USD                  ║
║  ─────────────────────────────────────  ║                                        ║
║  24h Chart:                             ║  BIDS            PRICE       ASKS      ║
║                                         ║  ██████████████  68,420  ░░            ║
║  69000 ┤                         ╭──    ║  ████████████    68,418  ░░░           ║
║  68800 ┤                    ╭────╯      ║  ██████████      68,415  ░░░░░         ║
║  68600 ┤               ╭───╯           ║  ████████        68,410  ░░░░░░░       ║
║  68400 ┤          ╭────╯               ║  ██████          68,405  ░░░░░░░░░     ║
║  68200 ┤     ╭────╯                    ║  ████            68,400  ░░░░░░░░░░░   ║
║  68000 ┤─────╯                         ║  ──────────────  SPREAD  ──────────    ║
║  67800 ┤╭──╮                           ║  ░░░░░░░░░░░░░  68,422  ██            ║
║  67600 ┼╯  ╰──╮                        ║  ░░░░░░░░░░░    68,425  ████          ║
║  67400 ┤      ╰──                      ║  ░░░░░░░░░      68,430  ██████        ║
║        └──────────────────────────      ║  ░░░░░░░        68,435  ████████      ║
║         06:00  08:00  10:00  12:00      ║  ░░░░░          68,440  ██████████    ║
║                                         ║                                        ║
╠══════════════════════════════════════════╬════════════════════════════════════════╣
║  WATCHLIST                              ║  CANDLESTICK 1H                        ║
║                                         ║                                        ║
║  PAIR        PRICE       24H    VOL     ║    ┃          ┃                        ║
║  ─────────────────────────────────────  ║    ┃   ╻      ┃         ╻              ║
║  BTC/USD  68,421.50  ▲ +2.4%  $42.1B   ║    ┃   ┃  ╻   ┃    ╻    ┃   ┃          ║
║  ETH/USD   3,847.20  ▲ +1.8%  $18.7B   ║   ╻┃   ┃  ┃   ┃    ┃╻   ┃   ┃          ║
║  SOL/USD     142.67  ▼ -0.6%   $3.2B   ║   ┃┃   ┃  ┃   ┃  ╻ ┃┃   ┃   ┃          ║
║  DOGE        0.1247  ▼ -1.2%   $1.8B   ║   ┃┃   ┃  ┃   ┃  ┃ ┃┃   ┃   ┃   ┃      ║
║  AVAX         34.82  ▲ +3.1%   $0.9B   ║   ┃╹   ┃  ┃  ╻┃  ┃ ┃╹   ╹   ┃   ┃      ║
║                                         ║   ╹    ┃  ┃  ┃┃  ┃ ╹        ┃   ┃      ║
║  Sparklines:                            ║        ╹  ┃  ┃╹  ┃          ╹   ┃      ║
║  BTC ▁▁▂▂▃▃▃▄▅▅▅▆▆▆▇▇███              ║           ╹  ╹   ╹              ╹      ║
║  ETH ▂▂▃▃▃▃▄▄▄▅▅▅▆▆▆▇▇▇██              ║  ─────────────────────────────────    ║
║  SOL ▆▆▅▅▅▅▄▄▄▃▃▃▃▃▂▂▂▂▂▂              ║   12  13  14  15  16  17  18  19      ║
║                                         ║                                        ║
╠══════════════════════════════════════════╬════════════════════════════════════════╣
║  PORTFOLIO                              ║  OPEN POSITIONS                        ║
║                                         ║                                        ║
║  Total:  $127,450.00                    ║  # PAIR    SIDE   QTY   ENTRY    P&L   ║
║  P&L:    +$2,841.50 (+2.28%)           ║  ─────────────────────────────────────  ║
║                                         ║  1 BTC/USD LONG   0.5  67,200  +$610   ║
║  Allocation:                            ║  2 ETH/USD LONG   2.0   3,780  +$134   ║
║  BTC  ████████████████░░░░  62%         ║  3 SOL/USD SHORT 10.0  144.20  +$15    ║
║  ETH  ██████░░░░░░░░░░░░░░  24%         ║  4 DOGE   LONG  1000    0.13  -$5     ║
║  SOL  ███░░░░░░░░░░░░░░░░░  11%         ║                                        ║
║  Cash █░░░░░░░░░░░░░░░░░░░   3%         ║  Margin Used:  34%  ████░░░░░░░░      ║
║                                         ║  Risk Level:   LOW  ███░░░░░░░░░      ║
║  Win Rate: 64.2%  [████████░░░░]        ║  Liq. Price:   $54,200 (BTC)           ║
╠══════════════════════════════════════════╩════════════════════════════════════════╣
║  LOG: 09:41 Filled BTC LONG 0.5 @ 67200 │ 09:38 DOGE stop-loss hit @ 0.124      ║
║       09:35 SOL SHORT entered @ 144.20  │ 09:30 Session started                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

## Verdict

**CLI:** Clean, functional, and easy to generate with a single command. The stacked layout with progress bars and status items works well for a quick summary view.
**Freehand:** Dramatically richer with a full price chart, order book depth visualization, candlestick patterns, sparklines, and side-by-side panel layout. It looks like an actual trading terminal rather than a status panel.
**Winner:** Freehand -- the CLI cannot produce sparklines, line charts, order book visualizations, or side-by-side panel layouts. A trading dashboard fundamentally needs these data-dense visual elements.
