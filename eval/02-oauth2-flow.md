# Eval 02: OAuth2 Authorization Code Flow

**Prompt:** "Visualize an OAuth2 authorization code flow"

---

## CLI Version

**Commands used:**
```bash
aski sequence \
  --actors "Browser,App,AuthServer,API" \
  --messages "Browser->App:click login,App->AuthServer:redirect /authorize,AuthServer->Browser:login page,Browser->AuthServer:username + password,AuthServer->App:redirect with code,App->AuthServer:POST /token + code,AuthServer-->App:access_token + refresh_token,App->API:GET /resource + Bearer token,API-->App:200 protected data,App-->Browser:render dashboard"
```

**Output:**
```
            │ Browser │                           │ App │                          │ AuthServer │                         │ API │
                 │                                   │                                   │                                   │
                  │            click login            │                                   │                                   │
                  ────────────────────────────────────>                                   │                                   │
                 │                                   │                                   │                                   │
                  │                                   │        redirect /authorize        │                                   │
                  │                                   ────────────────────────────────────>                                   │
                 │                                   │                                   │                                   │
                  │                              login page                               │                                   │
                  <────────────────────────────────────────────────────────────────────────                                   │
                 │                                   │                                   │                                   │
                  │                          username + password                          │                                   │
                  ────────────────────────────────────────────────────────────────────────>                                   │
                 │                                   │                                   │                                   │
                  │                                   │        redirect with code         │                                   │
                  │                                   <────────────────────────────────────                                   │
                 │                                   │                                   │                                   │
                  │                                   │        POST /token + code         │                                   │
                  │                                   ────────────────────────────────────>                                   │
                 │                                   │                                   │                                   │
                  │                                   │   access_token + refresh_token    │                                   │
                  │                                   < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                                   │
                 │                                   │                                   │                                   │
                  │                                   │                     GET /resource + Bearer token                      │
                  │                                   ────────────────────────────────────────────────────────────────────────>
                 │                                   │                                   │                                   │
                  │                                   │                          200 protected data                           │
                  │                                   < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                 │                                   │                                   │                                   │
                  │         render dashboard          │                                   │                                   │
                  < ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                                   │                                   │
                 │                                   │                                   │                                   │
            │ Browser │                           │ App │                          │ AuthServer │                         │ API │
```

## Freehand Version

```
  OAuth2 Authorization Code Flow (RFC 6749)
 ═══════════════════════════════════════════

  Browser        App Server       Auth Server       API
    │                │                 │               │
    │  ┌─────────────────────────────────────────┐    │
    │  │  PHASE 1: Authorization                 │    │
    │  └─────────────────────────────────────────┘    │
    │                │                 │               │
  ① │──click login──>│                 │               │
    │                │                 │               │
  ② │<──── 302 ──────│                 │               │
    │  Location: /authorize            │               │
    │  ?response_type=code             │               │
    │  &client_id=xyz                  │               │
    │  &redirect_uri=callback          │               │
    │  &scope=read+write               │               │
    │                │                 │               │
  ③ │────────────────────── GET ──────>│               │
    │                │       /authorize│               │
    │                │                 │               │
  ④ │<────────── login form ──────────│               │
    │                │                 │               │
  ⑤ │──────── credentials ───────────>│               │
    │            user: admin           │               │
    │            pass: ••••••          │               │
    │                │                 │               │
  ⑥ │<──── 302 ──────────────────────│               │
    │  Location: /callback             │               │
    │  ?code=AUTH_CODE_abc123          │               │
    │                │                 │               │
    │  ┌─────────────────────────────────────────┐    │
    │  │  PHASE 2: Token Exchange (back-channel) │    │
    │  └─────────────────────────────────────────┘    │
    │                │                 │               │
  ⑦ │── /callback ──>│                 │               │
    │  ?code=abc123  │                 │               │
    │                │                 │               │
  ⑧ │                │── POST /token ─>│               │
    │                │  grant_type=     │               │
    │                │  authorization_  │               │
    │                │  code            │               │
    │                │  code=abc123     │               │
    │                │  client_secret=  │               │
    │                │  ••••••          │               │
    │                │                 │               │
  ⑨ │                │<─ ─ ─ ─ ─ ─ ─ ─│               │
    │                │  {              │               │
    │                │   access_token  │               │
    │                │   refresh_token │               │
    │                │   expires_in:   │               │
    │                │    3600         │               │
    │                │  }              │               │
    │                │                 │               │
    │  ┌─────────────────────────────────────────┐    │
    │  │  PHASE 3: API Access                    │    │
    │  └─────────────────────────────────────────┘    │
    │                │                 │               │
  ⑩ │                │── GET /resource ────────────>│
    │                │  Authorization:              │
    │                │  Bearer eyJhbG...            │
    │                │                 │               │
  ⑪ │                │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
    │                │  200 OK                      │
    │                │  { "data": ... }             │
    │                │                 │               │
  ⑫ │<── dashboard ──│                 │               │
    │   session cookie                 │               │
    │                │                 │               │
    ▼                ▼                 ▼               ▼

  Notes:
  ─────
  - Steps ①-⑥ happen in the browser (front-channel)
  - Steps ⑧-⑨ happen server-to-server (back-channel)
  - The auth code is single-use and short-lived
  - PKCE (RFC 7636) adds code_verifier for public clients
```

## Verdict

**CLI:** Generates a correct, standards-compliant sequence diagram instantly. All actors and messages are properly ordered with solid and dashed arrows. However, it is extremely wide (exceeds most terminal widths) and lacks any grouping or explanatory annotations.
**Freehand:** Narrower, fits in 60 columns, and includes numbered steps, phase groupings, parameter details, and educational notes. A developer learning OAuth2 would understand this version much faster.
**Winner:** Tie -- CLI wins for speed and mechanical correctness; Freehand wins for readability and teaching value. The right choice depends on whether you need a quick reference or an explanatory document.
