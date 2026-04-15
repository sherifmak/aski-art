# Eval 04: Cloud Provider Comparison

**Prompt:** "Format a comparison table of cloud providers"

---

## CLI Version

**Commands used:**
```bash
aski table --data "Feature,AWS,GCP,Azure;Compute,EC2 (★★★★★),GCE (★★★★),VMs (★★★★);Serverless,Lambda (★★★★★),Cloud Run (★★★★★),Functions (★★★);Database,RDS/DynamoDB (★★★★★),Spanner/Firestore (★★★★),CosmosDB (★★★★);AI/ML,SageMaker (★★★★),Vertex AI (★★★★★),Azure ML (★★★★);CDN,CloudFront (★★★★★),Cloud CDN (★★★),Front Door (★★★★);Pricing,Pay-per-use,Sustained discounts,Enterprise deals;Free Tier,12 months,Always free tier,12 months" --style double
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
║ Pricing    ║ Pay-per-use          ║ Sustained discounts      ║ Enterprise deals  ║
║ Free Tier  ║ 12 months            ║ Always free tier         ║ 12 months         ║
╚════════════╩══════════════════════╩══════════════════════════╩═══════════════════╝
```

## Freehand Version

```
  CLOUD PROVIDER COMPARISON
  ══════════════════════════

  ⚡ COMPUTE
  ──────────────────────────────────────────────────────────────
  AWS  EC2            ████████████████████  5/5   Market leader
  GCP  GCE            ████████████████░░░░  4/5   Custom VMs
  Azure VMs           ████████████████░░░░  4/5   Hybrid strength
  ──────────────────────────────────────────────────────────────

  λ SERVERLESS
  ──────────────────────────────────────────────────────────────
  AWS  Lambda          ████████████████████  5/5   Largest ecosystem
  GCP  Cloud Run       ████████████████████  5/5   Container-native
  Azure Functions      ████████████░░░░░░░░  3/5   Limited runtimes
  ──────────────────────────────────────────────────────────────

  ⛁ DATABASE
  ──────────────────────────────────────────────────────────────
  AWS  RDS/DynamoDB    ████████████████████  5/5   Widest selection
  GCP  Spanner/Fire    ████████████████░░░░  4/5   Global Spanner
  Azure CosmosDB       ████████████████░░░░  4/5   Multi-model
  ──────────────────────────────────────────────────────────────

  ⚙ AI / ML
  ──────────────────────────────────────────────────────────────
  AWS  SageMaker       ████████████████░░░░  4/5   Mature tooling
  GCP  Vertex AI       ████████████████████  5/5   Best-in-class
  Azure Azure ML       ████████████████░░░░  4/5   OpenAI partner
  ──────────────────────────────────────────────────────────────

  ⇄ CDN
  ──────────────────────────────────────────────────────────────
  AWS  CloudFront      ████████████████████  5/5   Largest edge
  GCP  Cloud CDN       ████████████░░░░░░░░  3/5   Basic features
  Azure Front Door     ████████████████░░░░  4/5   WAF integrated
  ──────────────────────────────────────────────────────────────

  SCOREBOARD
  ┌─────────┬────────┬───────────┬───────────┬──────┬─────┬───────┐
  │         │Compute │Serverless │ Database  │AI/ML │ CDN │ TOTAL │
  ├─────────┼────────┼───────────┼───────────┼──────┼─────┼───────┤
  │ AWS     │   5    │     5     │     5     │  4   │  5  │  24   │
  │ GCP     │   4    │     5     │     4     │  5   │  3  │  21   │
  │ Azure   │   4    │     3     │     4     │  4   │  4  │  19   │
  └─────────┴────────┴───────────┴───────────┴──────┴─────┴───────┘

  ┌─────────────────────────────────────────────────────────────┐
  │  RECOMMENDATION                                             │
  │                                                             │
  │  Startup / Scale-up ──> GCP  (free tier + AI advantage)    │
  │  Enterprise         ──> AWS  (broadest service catalog)    │
  │  Microsoft shop     ──> Azure (AD, Office, hybrid cloud)   │
  │  ML-first company   ──> GCP  (Vertex AI + TPU access)     │
  └─────────────────────────────────────────────────────────────┘

  Pricing Model:
  ┌─────────────────────────────────────────────────────────────┐
  │  AWS    Pay-per-use ● Savings Plans ● Reserved Instances   │
  │  GCP    Sustained use discounts ● Committed use ● Preempt  │
  │  Azure  Enterprise agreements ● Hybrid benefit ● Dev/Test  │
  └─────────────────────────────────────────────────────────────┘
```

## Verdict

**CLI:** Produces a perfectly aligned, professional table instantly. The double-border style is clean and the star ratings are scannable. For a simple feature comparison, this is exactly what you need.
**Freehand:** Replaces stars with visual bar charts that are easier to scan at a glance, adds category icons, a scoreboard summary, and a recommendation section. However, it takes significantly longer to create and is harder to update when data changes.
**Winner:** CLI -- tables are the CLI's strongest feature. The output is clean, correct, and trivially updatable. The freehand version is prettier but impractical for content that changes frequently.
