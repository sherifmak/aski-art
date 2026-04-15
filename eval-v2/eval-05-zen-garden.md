# Eval 05: Zen Garden (v2 Re-evaluation)

**Prompt:** "Create a zen garden scene with water, fish, and natural elements"

---

## CLI v2 Version

**Commands used:**
```bash
aski compose --vertical \
  --exec "aski draw --shape hr --width 60 --style wave" \
  --exec "aski art --name fish" \
  --exec "aski draw --shape hr --width 60 --style wave"
```

**Output:**
```
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/`·.¸
   /¸...¸`:·
 ¸.·´  ¸   `·.¸.·´)
: © ):´;      ¸  {
 `·.¸ `·  ¸.·´\`·¸)
     `\\´´\¸.·´
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

## Freehand Version
```
                          ╭─── Zen Garden ───╮
                          │   静  寂  庭     │
                          ╰──────────────────╯

         .  *  .    .        *    .   .    *     .  *    .
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   ~~~    ~~     ~~~   ~~    ~~~     ~~   ~~~    ~~     ~~~   ~~~~~
  ~~~~  ~~  ~~~  ~~  ~~~~  ~~  ~~~  ~~  ~~~~  ~~  ~~~  ~~  ~~~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              \          |         |          /
               \    .    |    .    |    .    /
     ╭───╮      \___|____|____|____|____|___/      ╭───╮
     │ 灯 │     /                            \     │ 灯 │
     │   │    /    .    .    .    .    .    .  \    │   │
     │   │   /  .    .    .    .    .    .    . \   │   │
     ├───┤  │ .  ___         .    .    ><>  .   │  ├───┤
     │   │  │   /   \  .  ><(((°>  .    .    .  │  │   │
     │   │  │  │     │  .    .    .  ><>  .   .  │  │   │
     │   │  │  │  ◉  │    .    .    .    .    .  │  │   │
     │   │  │   \___/  .    .  ><(((°>  .    .   │  │   │
     │   │  │ .    .    .    .    .    .    . .  │  │   │
     └─┬─┘   \  .    .    .    .    .    .    . /   └─┬─┘
       │      \________________________________/      │
       │                                              │
   ════╧══════════════════════════════════════════════╧════
                 ~~~  .  ~~~  .  ~~~  .  ~~~
         ,;;,         ,;;,         ,;;,         ,;;,
        /.  .\       /.  .\       /.  .\       /.  .\
       | (  ) |     | (  ) |     | (  ) |     | (  ) |
        \ -- /       \ -- /       \ -- /       \ -- /
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·
     .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .
       .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·  .  ·
          ╭────────────────────────────────────╮
          │  "In the ripples, find stillness"  │
          ╰────────────────────────────────────╯
```

## Verdict
**CLI v2:** 3/10 -- The compose command successfully stacks wave dividers around a fish from the art library. The fish itself has charm -- it uses clever punctuation for a curved, organic shape. But "zen garden" this is not. It is a fish between two wavy lines. There is no scene composition, no spatial storytelling, no atmosphere.
**Freehand:** 9/10 -- A complete scene with stone lanterns, a koi pond with multiple fish (using ><(((o> glyphs), a stone basin, wave patterns, bamboo decorations, Japanese characters, and a contemplative quote. It has depth (foreground lanterns, mid-ground pond, background waves) and cultural coherence. This is genuine ASCII art.
**Winner:** Freehand -- This is not close. The CLI produces a decoration; the freehand version produces art. Spatial composition, atmosphere, and storytelling are things no box/line/shape primitive library can replicate. This category remains the CLI's weakest area by far.
**v1->v2 improvement:** Went from 1/10 to 3/10. The art library provides a real fish (vs nothing in v1), and draw gives wave separators. But the fundamental limitation remains: the CLI has no concept of "scene" -- it can place objects but cannot compose them into a coherent artistic vision. Pure ASCII art will likely always require freehand craft.
