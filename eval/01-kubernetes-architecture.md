# Eval 01: Kubernetes Architecture

**Prompt:** "Show me the architecture of a Kubernetes deployment"

---

## CLI Version

**Commands used:**
```bash
aski flow \
  --nodes "Internet(round),Ingress(rect),Service A(rect),Service B(rect),Pod A1(rect),Pod A2(rect),Pod B1(rect),Pod B2(rect),ConfigMap(rect),PV(rect)" \
  --edges "Internet->Ingress,Ingress->Service A:path /api,Ingress->Service B:path /web,Service A->Pod A1,Service A->Pod A2,Service B->Pod B1,Service B->Pod B2,ConfigMap->Pod A1,ConfigMap->Pod A2,PV->Pod B1,PV->Pod B2"
```

**Output:**
```
 _________________   +---------------+    +---------------+
(    Internet     )  |   ConfigMap   |    |      PV       |
 -----------------   +---------------+    +---------------+
        |
        |
        v
+---------------+
|    Ingress    |
+---------------+
        | path /api
        +-----path /web------+
        v                    v
+---------------+    +---------------+
|   Service A   |    |   Service B   |
+---------------+    +---------------+
        |                    |
        +--------------------+-----------------------------------------+
        v                    v                    v                    v
+---------------+    +---------------+    +---------------+    +---------------+
|    Pod A1     |    |    Pod A2     |    |    Pod B1     |    |    Pod B2     |
+---------------+    +---------------+    +---------------+    +---------------+
```

## Freehand Version

```
                            ☁ Internet ☁
                                 │
                                 ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║  k8s cluster: prod-us-east-1                                               ║
║                                                                            ║
║    ┌──────────────────────────────────────────────────────────────────┐     ║
║    │  ingress-nginx                                                   │     ║
║    │  ┌────────────────────────────────────────────────────────────┐  │     ║
║    │  │  Ingress Controller        rules:                         │  │     ║
║    │  │  nginx/1.9.1               /api  --> svc-api              │  │     ║
║    │  │  Load Balancer: active     /web  --> svc-web              │  │     ║
║    │  └────────────────────────────────────────────────────────────┘  │     ║
║    └────────────────────┬────────────────────┬────────────────────────┘     ║
║                         │ path: /api         │ path: /web                   ║
║                         ▼                    ▼                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐    ║
║  │  namespace: production                                              │    ║
║  │                                                                     │    ║
║  │  ┌─────────────────────────┐      ┌─────────────────────────┐      │    ║
║  │  │  Service: svc-api       │      │  Service: svc-web       │      │    ║
║  │  │  ClusterIP: 10.96.0.12 │      │  ClusterIP: 10.96.0.15 │      │    ║
║  │  │  Port: 8080             │      │  Port: 3000             │      │    ║
║  │  └──────────┬──────────────┘      └──────────┬──────────────┘      │    ║
║  │             │                                │                      │    ║
║  │     ┌───────┴───────┐                ┌───────┴───────┐              │    ║
║  │     ▼               ▼                ▼               ▼              │    ║
║  │  ┌────────────┐ ┌────────────┐  ┌────────────┐ ┌────────────┐      │    ║
║  │  │ deploy:    │ │ deploy:    │  │ deploy:    │ │ deploy:    │      │    ║
║  │  │ api        │ │ api        │  │ web        │ │ web        │      │    ║
║  │  │            │ │            │  │            │ │            │      │    ║
║  │  │ ┌────────┐ │ │ ┌────────┐ │  │ ┌────────┐ │ │ ┌────────┐ │      │    ║
║  │  │ │Pod A1  │ │ │ │Pod A2  │ │  │ │Pod B1  │ │ │ │Pod B2  │ │      │    ║
║  │  │ │api:v2.1│ │ │ │api:v2.1│ │  │ │web:v3.0│ │ │ │web:v3.0│ │      │    ║
║  │  │ │Ready ✓ │ │ │ │Ready ✓ │ │  │ │Ready ✓ │ │ │ │Ready ✓ │ │      │    ║
║  │  │ └───┬────┘ │ │ └───┬────┘ │  │ └───┬────┘ │ │ └───┬────┘ │      │    ║
║  │  └─────┼──────┘ └─────┼──────┘  └─────┼──────┘ └─────┼──────┘      │    ║
║  │        │              │                │              │              │    ║
║  │  ┌─────┴──────────────┴─────┐    ┌─────┴──────────────┴─────┐      │    ║
║  │  │  ConfigMap: api-config   │    │  PersistentVolumeClaim   │      │    ║
║  │  │                          │    │  pvc-web-data            │      │    ║
║  │  │  DB_HOST=rds.internal    │    │  10Gi RWO                │      │    ║
║  │  │  CACHE=redis:6379        │    │  StorageClass: gp3       │      │    ║
║  │  │  LOG_LEVEL=info          │    │         │                │      │    ║
║  │  └──────────────────────────┘    └─────────┼────────────────┘      │    ║
║  │                                            │                        │    ║
║  └────────────────────────────────────────────┼────────────────────────┘    ║
║                                               ▼                             ║
║                                    ┌──────────────────┐                     ║
║                                    │  PersistentVolume │                     ║
║                                    │  pv-web-data      │                     ║
║                                    │  EBS: vol-0abc123 │                     ║
║                                    └──────────────────┘                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## Verdict

**CLI:** Fast to generate and correctly shows the relationships between components. However, it renders a flat graph with no visual nesting, making it impossible to see the cluster/namespace/deployment hierarchy that is fundamental to Kubernetes.
**Freehand:** Shows the proper nested structure (cluster > namespace > deployment > pod) with contextual details like ClusterIPs, storage classes, and pod status. Reads like an actual architecture diagram.
**Winner:** Freehand -- Kubernetes architecture is defined by its nesting and resource hierarchy. A flat flow graph misses the most important structural concept.
