# LinkedIn Post

---

What I learned about teaching AI agents — by running an experiment on one.

I built an ASCII art toolkit (web app, CLI, Claude skills) and then ran a controlled evaluation: 10 creative prompts, tested 3 ways.

The results surprised me:

- CLI tools alone: 7.2/10
- AI freehand (no skill): 7.2/10
- AI freehand + skill file: 9.05/10

The skill won all 10 prompts. Same model. Same prompts. The only variable: a markdown file teaching specific techniques.

The insight: without explicit techniques, AI defaults to the median of its training data. A skill that says "be more creative" does nothing. A skill that says "use ░▒▓█ as a gradient ramp to create depth" produces measurably better output.

This has implications beyond ASCII art:

1. Teach technique, not personality
2. Bottle expertise into step-by-step recipes, not vibes
3. Skills compound where the gap between default and expert output is largest
4. The path to better AI output isn't smarter models — it's better skills

The project is open source: github.com/sherifmak/aski-art

Full writeup in the repo.

#AI #DeveloperTools #OpenSource #LLM #ProductDevelopment
