# Eval 04: Cloud Comparison (3-Way Evaluation)

**Prompt:** "Cloud provider comparison table: AWS vs GCP vs Azure"

---

## A) CLI v2
**Command:** `aski table --data "Feature,AWS,GCP,Azure;Compute,EC2 ★★★★★,GCE ★★★★,VMs ★★★★;Serverless,Lambda ★★★★★,Cloud Run ★★★★★,Functions ★★★;Database,RDS ★★★★★,Spanner ★★★★,Cosmos ★★★★;AI/ML,SageMaker ★★★★,Vertex ★★★★★,Azure ML ★★★★" --style double`
```
╔════════════╦════════════════╦═════════════════╦═══════════════╗
║ Feature    ║ AWS            ║ GCP             ║ Azure         ║
╠════════════╬════════════════╬═════════════════╬═══════════════╣
║ Compute    ║ EC2 ★★★★★      ║ GCE ★★★★        ║ VMs ★★★★      ║
║ Serverless ║ Lambda ★★★★★   ║ Cloud Run ★★★★★ ║ Functions ★★★ ║
║ Database   ║ RDS ★★★★★      ║ Spanner ★★★★    ║ Cosmos ★★★★   ║
║ AI/ML      ║ SageMaker ★★★★ ║ Vertex ★★★★★    ║ Azure ML ★★★★ ║
╚════════════╩════════════════╩═════════════════╩═══════════════╝
```
Score: 8/10

## B) Freehand (no skill)
```
+============+================+=================+===============+
| FEATURE    | AWS            | GCP             | AZURE         |
+============+================+=================+===============+
| Compute    | EC2      ***** | GCE       ****  | VMs      **** |
| Serverless | Lambda   ***** | Cloud Run ***** | Functions ***  |
| Database   | RDS      ***** | Spanner   ****  | Cosmos   **** |
| AI/ML      | SageMaker**** | Vertex    ***** | Azure ML **** |
+============+================+=================+===============+
| TOTAL      | 19/20          | 18/20           | 15/20         |
+------------+----------------+-----------------+---------------+
| VERDICT    | Most complete   | Best for AI/ML  | Best hybrid   |
+============+================+=================+===============+
```
Score: 8/10

## C) Freehand + Skill
```
╔══════════════════════════════════════════════════════════════════════════╗
║            C L O U D   P R O V I D E R   C O M P A R I S O N          ║
╠══════════════╦══════════════════╦══════════════════╦═════════════════╣
║  Feature     ║  ◆ AWS           ║  ◆ GCP           ║  ◆ Azure        ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  Compute     ║  EC2             ║  GCE             ║  VMs            ║
║              ║  █████ 5/5       ║  ████░ 4/5       ║  ████░ 4/5      ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  Serverless  ║  Lambda          ║  Cloud Run       ║  Functions      ║
║              ║  █████ 5/5       ║  █████ 5/5       ║  ███░░ 3/5      ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  Database    ║  RDS             ║  Spanner         ║  Cosmos DB      ║
║              ║  █████ 5/5       ║  ████░ 4/5       ║  ████░ 4/5      ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  AI/ML       ║  SageMaker       ║  Vertex AI       ║  Azure ML       ║
║              ║  ████░ 4/5       ║  █████ 5/5       ║  ████░ 4/5      ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  TOTAL       ║  ▓▓▓▓▓▓▓▓▓▒ 19  ║  ▓▓▓▓▓▓▓▓▓░ 18  ║  ▓▓▓▓▓▓▓░░░ 15 ║
╠══════════════╬══════════════════╬══════════════════╬═════════════════╣
║  VERDICT     ║  ✦ Most Complete ║  ✦ Best AI/K8s   ║  ✦ Best Hybrid  ║
╚══════════════╩══════════════════╩══════════════════╩═════════════════╝
```
Score: 8.5/10

## Verdict
The CLI v2 table is clean and well-formatted with double-line style. Freehand adds totals and a verdict row. The skill version adds: ░▒▓█ progress bars for visual scoring, separated rating rows for clarity, section dividers between each category, diamond bullets (◆) for provider headers, a gradient total bar, and verdict symbols (✦). For tabular data, the skill helps modestly — the main improvement is the visual progress bars replacing star ratings.
