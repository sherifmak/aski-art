# Eval 02: OAuth2 Flow (3-Way Evaluation)

**Prompt:** "OAuth2 authorization code flow sequence diagram"

---

## A) CLI v2
**Command:** `aski sequence --actors "Browser,App,Auth,API" --messages "Browser->App:login,App->Auth:redirect,Auth->Browser:login page,Browser->Auth:credentials,Auth->App:auth code,App->Auth:POST /token,Auth-->App:access_token,App->API:GET /resource,API-->App:200 data,App-->Browser:dashboard"`
```
      │ Browser │               │ App │                 │ Auth │                │ API │
           │                       │                       │                       │
            │         login         │                       │                       │
            ────────────────────────>                       │                       │
           │                       │                       │                       │
            │                       │       redirect        │                       │
            │                       ────────────────────────>                       │
           │                       │                       │                       │
            │                  login page                   │                       │
            <────────────────────────────────────────────────                       │
           │                       │                       │                       │
            │                  credentials                  │                       │
            ────────────────────────────────────────────────>                       │
           │                       │                       │                       │
            │                       │       auth code       │                       │
            │                       <────────────────────────                       │
           │                       │                       │                       │
            │                       │      POST /token      │                       │
            │                       ────────────────────────>                       │
           │                       │                       │                       │
            │                       │     access_token      │                       │
            │                       < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                       │
           │                       │                       │                       │
            │                       │                 GET /resource                 │
            │                       ────────────────────────────────────────────────>
           │                       │                       │                       │
            │                       │                   200 data                    │
            │                       < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
           │                       │                       │                       │
            │       dashboard       │                       │                       │
            < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                       │                       │
           │                       │                       │                       │
      │ Browser │               │ App │                 │ Auth │                │ API │
```
Score: 8/10

## B) Freehand (no skill)
```
  BROWSER          APP            AUTH SERVER         API
    |               |                |                 |
    |--login------->|                |                 |
    |               |--redirect----->|                 |
    |<---login page-----------------|                 |
    |---credentials---------------->|                 |
    |               |<--auth code----|                 |
    |               |--POST /token-->|                 |
    |               |<==access_token=|                 |
    |               |                |                 |
    |               |--------GET /resource------------>|
    |               |<========200 data=================|
    |<==dashboard===|                |                 |
    |               |                |                 |
    v               v                v                 v
```
Score: 7/10

## C) Freehand + Skill
```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    O A U T H 2   A U T H O R I Z A T I O N   C O D E       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────┐       ┌────────┐       ┌────────────┐       ┌────────┐        │
│   │BROWSER │       │  APP   │       │AUTH SERVER │       │  API   │        │
│   │  ◎     │       │  ◉     │       │  ◉         │       │  ◉     │        │
│   └───┬────┘       └───┬────┘       └─────┬──────┘       └───┬────┘        │
│       │                │                   │                   │            │
│       │───── login ───▸│                   │                   │            │
│       │                │                   │                   │            │
│       │                │──── redirect ────▸│                   │            │
│       │                │                   │                   │            │
│       │◁─────────── login page ────────────│                   │            │
│       │                │                   │                   │            │
│       │────────── credentials ────────────▸│                   │            │
│       │                │                   │                   │            │
│       │                │◁── auth code ─────│                   │            │
│       │                │                   │                   │            │
│       │                │── POST /token ───▸│                   │            │
│       │                │                   │                   │            │
│       │                │◁═══access_token═══│   ░░░ SECURE ░░░ │            │
│       │                │                   │                   │            │
│       │                │═══════ GET /resource ════════════════▸│            │
│       │                │                   │                   │            │
│       │                │◁════════════ 200 data ═══════════════│            │
│       │                │                   │                   │            │
│       │◁══ dashboard ══│                   │                   │            │
│       │                │                   │                   │            │
│   ┌───▼────┐       ┌───▼────┐       ┌─────▼──────┐       ┌───▼────┐        │
│   │BROWSER │       │  APP   │       │AUTH SERVER │       │  API   │        │
│   └────────┘       └────────┘       └────────────┘       └────────┘        │
│                                                                              │
│   ─── ▸ Request (sync)    ═══ ▸ Response (data)    ░░░ Encrypted channel   │
├──────────────────────────────────────────────────────────────────────────────┤
│   GRANT TYPE: authorization_code   │   TOKEN: Bearer JWT   │   PKCE: S256  │
└──────────────────────────────────────────────────────────────────────────────┘
```
Score: 8.5/10

## Verdict
The CLI v2 sequence diagram is actually very good — proper lifelines, solid vs dashed arrows, well-spaced messages. Freehand is more compact but loses the visual clarity. The skill-enhanced version adds: a framed container, actor icons (◎ ◉), differentiated arrow styles (─▸ for requests, ═▸ for responses), a security annotation (░░░ SECURE ░░░), a legend row, and protocol metadata footer. For sequence diagrams, the CLI does the heavy lifting well; the skill mainly adds polish and context.
