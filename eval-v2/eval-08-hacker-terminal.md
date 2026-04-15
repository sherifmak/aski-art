# Eval 08: Hacker Terminal (v2 Re-evaluation)

**Prompt:** "Create a hacker breach status terminal with progress bars, network topology, and sparklines"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --horizontal --gap 2 \
  --exec "aski interface --components 'header:text=BREACH STATUS,divider,progress:label=Firewall:value=100:max=100,progress:label=Exfil:value=67:max=100,progress:label=Evasion:value=89:max=100,divider,statuslist:items=✓ Root access;✓ Shadow dumped;✓ Backdoor;● Encrypting;○ Cleanup' --width 40 --border double" \
  --exec "aski compose --vertical \
    --exec 'aski draw --shape tree --data \"Network;10.0.42.7;PROXY-01;EXIT-NODE;10.0.42.7>TARGET-DB;PROXY-01>TOR\"' \
    --exec 'aski chart --type sparkline --data \"10,20,45,80,95,100,100,100\" --label \"Firewall\"' \
    --exec 'aski chart --type sparkline --data \"0,5,12,25,38,47,55,67\" --label \"Data Exfil\"'"
```

**Output:**
```
╔══════════════════════════════════════╗  Network
║                                      ║  ├── 10.0.42.7
║            BREACH STATUS             ║  │   └── TARGET-DB
║                                      ║  ├── PROXY-01
╠══════════════════════════════════════╣  │   └── TOR
║  Firewall: ██████████████████  100%  ║  └── EXIT-NODE
║  Exfil: ███████████████░░░░░░░  67%  ║  Firewall ▁▂▄▆████
║  Evasion: ██████████████████░░  89%  ║  Data Exfil ▁▂▂▄▅▆▇█
╠══════════════════════════════════════╣
║  ✓ Root access                       ║
║  ✓ Shadow dumped                     ║
║  ✓ Backdoor                          ║
║  ● Encrypting                        ║
║  ○ Cleanup                           ║
╚══════════════════════════════════════╝
```

## Freehand Version
```
┌─────────────────────────────────────────────────────────────────┐
│ root@kali:~/breach#                                    00:42:17│
├────────────────────────────────┬────────────────────────────────┤
│                                │                                │
│   ╔══ BREACH STATUS ════════╗  │   NETWORK TOPOLOGY             │
│   ║                         ║  │                                │
│   ║  Firewall  [██████████] ║  │   [ATTACKER]                   │
│   ║            100% BYPASSED║  │       │                        │
│   ║                         ║  │       ▼                        │
│   ║  Exfil     [██████▓░░░] ║  │   ┌───────────┐               │
│   ║              67% ▲▲▲    ║  │   │ PROXY-01  │──→ [TOR]      │
│   ║                         ║  │   └─────┬─────┘               │
│   ║  Evasion   [████████▓░] ║  │         │                     │
│   ║              89%        ║  │         ▼                     │
│   ║                         ║  │   ┌───────────┐               │
│   ╠═════════════════════════╣  │   │10.0.42.7  │               │
│   ║  ✓ Root access obtained ║  │   │ TARGET-DB │               │
│   ║  ✓ Shadow file dumped   ║  │   └───────────┘               │
│   ║  ✓ Backdoor installed   ║  │         │                     │
│   ║  ● Encrypting traces    ║  │         ▼                     │
│   ║  ○ Cleanup pending      ║  │   [EXIT-NODE]                 │
│   ╚═════════════════════════╝  │                                │
│                                │   Firewall  ▁▂▃▅▆███ 100%     │
│   ┌──────────────────────────┐ │   Data Exfil ▁▁▂▃▄▅▆▇  67%   │
│   │ > cat /etc/shadow        │ │   Evasion   ▁▃▅▆████  89%    │
│   │ root:$6$xKz...:19412::: │ │                                │
│   │ > _                      │ │   Packets: 14,209  Dropped: 0 │
│   └──────────────────────────┘ │   Latency: 42ms via TOR       │
├────────────────────────────────┴────────────────────────────────┤
│ [SCAN] [EXPLOIT] [EXFIL] [COVER]           ▸ ENCRYPTING...  67%│
└─────────────────────────────────────────────────────────────────┘
```

## Verdict
**CLI v2:** 8.5/10 -- This is genuinely impressive. Side-by-side layout with a full interface panel (progress bars, status list, header) next to a tree topology and sparklines. The compose --horizontal puts them together naturally. The progress bars show real percentages. The sparklines show data trends. This reads like a real terminal dashboard.
**Freehand:** 9/10 -- Adds the outer terminal chrome, a fake command prompt, packet stats, bottom toolbar, and more visual polish. The topology uses directional arrows. But the core information is the same.
**Winner:** Tie (close call -- freehand has more polish, but CLI v2 is functionally equivalent)
**v1->v2 improvement:** From 7/10 to 8.5/10. The horizontal compose enables side-by-side panels which is the killer feature here. The interface command provides progress bars and status lists in one shot. Sparklines add the time-series visualization. v1 could do interface panels but not side-by-side layout or sparklines. This is the eval where v2 comes closest to matching freehand.
