# Eval 04: Cloud Comparison (v2 Re-evaluation)

**Prompt:** "Create a comparison table of AWS vs GCP vs Azure across Compute, Serverless, Database, AI/ML, and CDN categories with star ratings"

---

## CLI v2 Version

**Commands used:**
```bash
aski table --data "Feature,AWS,GCP,Azure;Compute,EC2 (★★★★★),GCE (★★★★),VMs (★★★★);Serverless,Lambda (★★★★★),Cloud Run (★★★★★),Functions (★★★);Database,RDS/DynamoDB (★★★★★),Spanner/Firestore (★★★★),CosmosDB (★★★★);AI/ML,SageMaker (★★★★),Vertex AI (★★★★★),Azure ML (★★★★);CDN,CloudFront (★★★★★),Cloud CDN (★★★),Front Door (★★★★)" --style double
```

**Output:**
```
╔════════════╦══════════════════════╦══════════════════════════╦═══════════════════╗
║ Feature    ║ AWS                  ║ GCP                      ║ Azure             ║
╠════════════╬══════════════════════╬══════════════════════════╬═══════════════════╣
║ Compute    ║ EC2 (★★★★★)          ║ GCE (★★★★)               ║ VMs (★★★★)        ║
║ Serverless ║ Lambda (★★★★★)       ║ Cloud Run (★★★★★)        ║ Functions (★★★)   ║
║ Database   ║ RDS/DynamoDB (★★★★★) ║ Spanner/Firestore (★★★★) ║ CosmosDB (★★★★)   ║
║ AI/ML      ║ SageMaker (★★★★)     ║ Vertex AI (★★★★★)        ║ Azure ML (★★★★)   ║
║ CDN        ║ CloudFront (★★★★★)   ║ Cloud CDN (★★★)          ║ Front Door (★★★★) ║
╚════════════╩══════════════════════╩══════════════════════════╩═══════════════════╝
```

## Freehand Version
```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                         CLOUD PROVIDER COMPARISON 2024                              ║
║                         AWS  vs  GCP  vs  Azure                                     ║
╠═══════════════╦══════════════════════╦══════════════════════╦════════════════════════╣
║               ║        ┌───┐         ║       ╭───╮          ║        ╱───╲           ║
║   Category    ║        │AWS│         ║       │GCP│          ║       │Azure│          ║
║               ║        └───┘         ║       ╰───╯          ║        ╲───╱           ║
╠═══════════════╬══════════════════════╬══════════════════════╬════════════════════════╣
║               ║                      ║                      ║                        ║
║  Compute      ║  EC2               ║  GCE                 ║  Virtual Machines      ║
║               ║  ★★★★★  Leader     ║  ★★★★☆  Strong       ║  ★★★★☆  Strong         ║
║               ║  700+ inst. types    ║  Custom machine types║  Spot VMs, reserved    ║
╠───────────────╬──────────────────────╬──────────────────────╬────────────────────────╣
║               ║                      ║                      ║                        ║
║  Serverless   ║  Lambda              ║  Cloud Run           ║  Functions             ║
║               ║  ★★★★★  Leader     ║  ★★★★★  Leader      ║  ★★★☆☆  Catching up    ║
║               ║  1M free req/mo      ║  Container-native    ║  Durable Functions     ║
╠───────────────╬──────────────────────╬──────────────────────╬────────────────────────╣
║               ║                      ║                      ║                        ║
║  Database     ║  RDS / DynamoDB      ║  Spanner / Firestore ║  CosmosDB              ║
║               ║  ★★★★★  Leader     ║  ★★★★☆  Innovative   ║  ★★★★☆  Multi-model    ║
║               ║  15 engines, NoSQL   ║  Global consistency  ║  5 consistency levels  ║
╠───────────────╬──────────────────────╬──────────────────────╬────────────────────────╣
║               ║                      ║                      ║                        ║
║  AI / ML      ║  SageMaker           ║  Vertex AI           ║  Azure ML              ║
║               ║  ★★★★☆  Mature     ║  ★★★★★  Leader      ║  ★★★★☆  Strong         ║
║               ║  Notebooks, Autopilot║  Gemini, TPU access  ║  OpenAI partnership    ║
╠───────────────╬──────────────────────╬──────────────────────╬────────────────────────╣
║               ║                      ║                      ║                        ║
║  CDN          ║  CloudFront          ║  Cloud CDN           ║  Front Door            ║
║               ║  ★★★★★  Leader     ║  ★★★☆☆  Basic        ║  ★★★★☆  Growing        ║
║               ║  450+ PoPs, Lambda@E ║  Tied to LB          ║  WAF + CDN integrated  ║
╠═══════════════╬══════════════════════╬══════════════════════╬════════════════════════╣
║  TOTAL STARS  ║  24/25               ║  21/25               ║  19/25                 ║
║  VERDICT      ║  Most complete       ║  Best for AI/data    ║  Best for enterprise   ║
╚═══════════════╩══════════════════════╩══════════════════════╩════════════════════════╝
```

## Verdict
**CLI v2:** 9/10 -- Clean double-bordered table with proper column alignment. Star ratings render correctly with Unicode. Column widths auto-adjust to content. This is exactly what a comparison table should look like -- no wasted space, easy to scan.
**Freehand:** 9/10 -- Adds context that transforms the table from a rating matrix into a decision guide: total scores, per-category commentary, feature highlights (e.g., "700+ inst. types", "Gemini, TPU access"), and a final verdict row. The provider logos in the header are a nice touch.
**Winner:** Tie -- Different strengths. The CLI version is cleaner and more scannable. The freehand version is more informative. For a quick comparison, CLI wins. For a presentation, freehand wins. Calling it even.
**v1->v2 improvement:** No change. Tables were already the CLI's strongest feature in v1. Still 9/10.
