# Eval 08: Hacker Terminal (3-Way Evaluation)

**Prompt:** "Hacker terminal with breach progress and network tree"

---

## A) CLI v2
**Command:** `aski compose --horizontal --gap 2 --exec "aski interface --components 'header:text=BREACH,divider,progress:label=Firewall:value=100:max=100,progress:label=Exfil:value=67:max=100,progress:label=Evasion:value=89:max=100,statuslist:items=✓ Root;✓ Shadow;● Encrypting' --width 38 --border double" --exec "aski draw --shape tree --data 'Network;10.0.42.7;PROXY-01;EXIT;10.0.42.7>TARGET-DB;PROXY-01>TOR'"`
```
╔════════════════════════════════════╗  Network
║                                    ║  ├── 10.0.42.7
║               BREACH               ║  │   └── TARGET-DB
║                                    ║  ├── PROXY-01
╠════════════════════════════════════╣  │   └── TOR
║  Firewall: ████████████████  100%  ║  └── EXIT
║  Exfil: █████████████░░░░░░░  67%  ║
║  Evasion: ████████████████░░  89%  ║
║  ✓ Root                            ║
║  ✓ Shadow                          ║
║  ● Encrypting                      ║
╚════════════════════════════════════╝
```
Score: 8/10

## B) Freehand (no skill)
```
+========================================+
|             >>> BREACH <<<             |
+========================================+
| Firewall: ################ 100%        |
| Exfil:    ############----  67%        |
| Evasion:  ###############-  89%        |
+----------------------------------------+
| Status:                                |
|   [+] Root acquired                    |
|   [+] Shadow link active               |
|   [*] Encrypting outbound...           |
+----------------------------------------+
| NETWORK MAP:                           |
|   Internal                             |
|   |-- 10.0.42.7                       |
|   |   `-- TARGET-DB                   |
|   |-- PROXY-01                        |
|   |   `-- TOR                         |
|   `-- EXIT                            |
+========================================+
```
Score: 7/10

## C) Freehand + Skill
```
┌──[ ● ● ● ]──── shell@ghost:~ ──────────────────────────────────────────────┐
│ ╔══════════════════════════════════════════════════════════════════════╗  │
│ ║   ░▒▓█  A C C E S S   G R A N T E D  █▓▒░                            ║  │
│ ╚══════════════════════════════════════════════════════════════════════╝  │
├────────────────────────────────────┬───────────────────────────────────────┤
│  ◉ INTRUSION STATUS                │  ◉ NETWORK TOPOLOGY                  │
│                                    │                                       │
│  Firewall  ████████████████ 100%   │   ◎ internal-net                     │
│  Exfil     █████████████░░░  67%   │   ├── ● 10.0.42.7  [pwned]          │
│  Evasion   ████████████████  89%   │   │   ├── ◉ TARGET-DB  ▸ exfil      │
│  Tunnel    ███████████░░░░░  72%   │   │   └── ◉ AUTH-SVR   ▸ root       │
│                                    │   ├── ● PROXY-01      [hop]         │
│  ── ✦ ── ── ── ── ── ── ── ── ──   │   │   └── ◎ TOR-EXIT  ▸ encrypted   │
│                                    │   ├── ▲ FIREWALL-A    [bypassed]    │
│  ✓ Root acquired         00:42:18  │   └── ✗ EXIT-NODE     [unmonitored] │
│  ✓ Shadow tunnel up      00:42:33  │                                       │
│  ✓ AV evaded             00:43:01  │                                       │
│  ● Encrypting outbound   00:43:47  ├───────────────────────────────────────┤
│  ● Wiping logs           00:43:52  │  ◉ HEX DUMP (last frame)             │
│                                    │                                       │
├────────────────────────────────────┤  4f 70 65 72 61 74 6f 72  Operator  │
│  ◉ PORT SCAN                       │  3a 20 67 68 30 73 74 5f  : gh0st_   │
│                                    │  72 75 6e 6e 65 72 0a 53  runner.S   │
│  PORT  STATE  SERVICE              │  74 61 74 75 73 3a 20 69  tatus: i   │
│   22   open   ssh        ●          │  6e 73 69 64 65 0a 4b 65  nside.Ke   │
│   80   open   http       ●          │  79 73 3a 20 65 78 66 69  ys: exfi   │
│  443   open   https      ●          │  6c 74 72 61 74 65 64 0a  ltrated.   │
│ 3306   open   mysql      ●          │                                       │
│ 8080   filtd  http-alt   ▲          │  CPU ▁▂▃▅▇█▇▅▃▂  NET ▁▃▅▇▇▅▃▁     │
│                                    │                                       │
├────────────────────────────────────┴───────────────────────────────────────┤
│ [00:43:58] ◎ DB dump → /tmp/cache.enc  (412MB)                             │
│ [00:43:59] ◎ Cleaning bash_history                                         │
│ [00:44:00] ◉ Disengaging — see you in the static.                         │
└────────────────────────────────────────────────────────────────────────────┘
```
Score: 9.5/10

## Verdict
CLI v2 produces a competent breach panel + a bare tree. Freehand has more text but is visually flat. The skill-enhanced version applies Recipe 4 fully: terminal window chrome (● ● ● + shell prompt), an "ACCESS GRANTED" banner with ░▒▓ gradient, four panels divided by ├─┤ separators, status timestamps, port scan table with status indicators, hex dump panel showing payload bytes, sparklines (▁▂▃▅▇█) for CPU/network, footer log entries with timestamps. The information density is enormous and every element belongs in a hacker scene. This is the dashboard recipe at its best.
