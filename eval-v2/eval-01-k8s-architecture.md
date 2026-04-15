# Eval 01: K8s Architecture (v2 Re-evaluation)

**Prompt:** "Draw a Kubernetes cluster architecture showing an ingress controller routing to two deployments (api and web), each with 2 pods, plus a ConfigMap and PVC"

---

## CLI v2 Version

**Commands used:**
```bash
aski canvas --width 78 --height 26 \
  --box "0,0,78,26,double,k8s cluster: prod-us-east-1" \
  --box "2,2,74,22,single,namespace: production" \
  --box "25,4,28,3,rounded,Ingress Controller" \
  --text "20,7,/api ──────┐     ┌────── /web" \
  --text "20,8,│           │" \
  --text "48,8,│" \
  --text "20,9,▼           ▼" \
  --text "48,9,▼" \
  --box "4,10,32,12,single,Deployment: api" \
  --box "42,10,32,12,single,Deployment: web" \
  --box "6,12,12,3,rounded,Pod A1" \
  --box "22,12,12,3,rounded,Pod A2" \
  --box "44,12,12,3,rounded,Pod B1" \
  --box "60,12,12,3,rounded,Pod B2" \
  --box "6,17,28,3,single,ConfigMap: api-config" \
  --box "44,17,28,3,single,PVC: web-data 10Gi"
```

**Output:**
```
╔═══════════════════════ k8s cluster: prod-us-east-1 ════════════════════════╗
║                                                                            ║
║ ┌──────────────────────── namespace: production ─────────────────────────┐ ║
║ │                                                                        │ ║
║ │                      ╭─── Ingress Controller ───╮                      │ ║
║ │                      │                          │                      │ ║
║ │                      ╰──────────────────────────╯                      │ ║
║ │                 /api ──────┐     ┌────── /web                          │ ║
║ │                 │           │               │                          │ ║
║ │                 ▼           ▼               ▼                          │ ║
║ │ ┌────── Deployment: api ───────┐      ┌────── Deployment: web ───────┐ │ ║
║ │ │                              │      │                              │ │ ║
║ │ │ ╭─ Pod A1 ─╮    ╭─ Pod A2 ─╮ │      │ ╭─ Pod B1 ─╮    ╭─ Pod B2 ─╮ │ │ ║
║ │ │ │          │    │          │ │      │ │          │    │          │ │ │ ║
║ │ │ ╰──────────╯    ╰──────────╯ │      │ ╰──────────╯    ╰──────────╯ │ │ ║
║ │ │                              │      │                              │ │ ║
║ │ │                              │      │                              │ │ ║
║ │ │ ┌─ ConfigMap: api-config ──┐ │      │ ┌─── PVC: web-data 10Gi ───┐ │ │ ║
║ │ │ │                          │ │      │ │                          │ │ │ ║
║ │ │ └──────────────────────────┘ │      │ └──────────────────────────┘ │ │ ║
║ │ │                              │      │                              │ │ ║
║ │ └──────────────────────────────┘      └──────────────────────────────┘ │ ║
║ │                                                                        │ ║
║ └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

## Freehand Version
```
                    ┌─────────────────────────────────────────────────────────────────────┐
                    │              ☸  KUBERNETES CLUSTER: prod-us-east-1                  │
                    │  ┌─────────────────────────────────────────────────────────────────┐ │
                    │  │  namespace: production                                         │ │
                    │  │                                                                 │ │
                    │  │          ┌──────────────────────────────┐                       │ │
                    │  │          │   🌐 INGRESS CONTROLLER      │                       │ │
                    │  │          │   nginx-ingress v1.9.4       │                       │ │
                    │  │          │   LoadBalancer: 34.102.x.x   │                       │ │
                    │  │          └──────────┬───────┬───────────┘                       │ │
                    │  │                     │       │                                   │ │
                    │  │          /api/*     │       │   /web/*                          │ │
                    │  │          ┌──────────┘       └──────────┐                        │ │
                    │  │          ▼                              ▼                       │ │
                    │  │  ┌── svc/api-svc ──────┐   ┌── svc/web-svc ──────┐             │ │
                    │  │  │  ClusterIP:10.0.1.5 │   │  ClusterIP:10.0.1.8 │             │ │
                    │  │  │  Port: 8080         │   │  Port: 3000         │             │ │
                    │  │  └────┬──────────┬─────┘   └────┬──────────┬─────┘             │ │
                    │  │       │          │              │          │                    │ │
                    │  │       ▼          ▼              ▼          ▼                    │ │
                    │  │  ┌─────────┐ ┌─────────┐  ┌─────────┐ ┌─────────┐             │ │
                    │  │  │ Pod A1  │ │ Pod A2  │  │ Pod B1  │ │ Pod B2  │             │ │
                    │  │  │ api:v2.1│ │ api:v2.1│  │ web:v3.0│ │ web:v3.0│             │ │
                    │  │  │ Ready ✓ │ │ Ready ✓ │  │ Ready ✓ │ │ Ready ✓ │             │ │
                    │  │  │ CPU: 45%│ │ CPU: 38%│  │ CPU: 22%│ │ CPU: 19%│             │ │
                    │  │  │ Mem:128M│ │ Mem:134M│  │ Mem:256M│ │ Mem:241M│             │ │
                    │  │  └────┬────┘ └────┬────┘  └────┬────┘ └────┬────┘             │ │
                    │  │       │          │              │          │                    │ │
                    │  │       ▼          ▼              ▼          ▼                    │ │
                    │  │  ┌─────────────────────┐  ┌─────────────────────┐              │ │
                    │  │  │ ConfigMap           │  │ PVC: web-data       │              │ │
                    │  │  │  api-config         │  │  StorageClass: gp3  │              │ │
                    │  │  │  DB_HOST=rds.aws..  │  │  Capacity: 10Gi    │              │ │
                    │  │  │  CACHE_TTL=300      │  │  Access: ReadWrite  │              │ │
                    │  │  │  LOG_LEVEL=info     │  │  Status: Bound      │              │ │
                    │  │  └─────────────────────┘  └─────────────────────┘              │ │
                    │  │                                                                 │ │
                    │  └─────────────────────────────────────────────────────────────────┘ │
                    └─────────────────────────────────────────────────────────────────────┘
```

## Verdict
**CLI v2:** 9/10 -- The canvas command produces a clean, properly nested diagram with correct box containment. Rounded corners on pods vs single-line on deployments vs double on the cluster create visual hierarchy. The routing arrows with /api and /web paths are clear. This is genuinely impressive for a CLI tool.
**Freehand:** 9.5/10 -- Adds real-world details (IP addresses, image versions, CPU/memory stats, storage class) that make the diagram informational, not just structural. The service layer between ingress and pods is architecturally accurate. Visual density is higher.
**Winner:** Freehand -- The freehand version adds operational detail that transforms the diagram from a topology sketch into something you'd actually reference during an incident. But the margin is narrow.
**v1->v2 improvement:** Canvas enables proper nesting of boxes (cluster > namespace > deployment > pod) which was impossible in v1. The v1 version had to fake nesting with manual spacing. Score went from 7/10 to 9/10.
