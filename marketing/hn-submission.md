# Hacker News Submission

**Title:** I built an ASCII art CLI, then ran an experiment teaching Claude to be a better artist

**URL:** https://github.com/sherifmak/aski-art/blob/main/BLOG.md

**Timing:** Tuesday–Thursday, 8–10am ET

---

## If text post instead of link:

I built an ASCII art toolkit — a web app with 6 visual editors, a CLI with 13 commands (zero deps, `npx aski-art`), and two Claude skills. The CLI handles structured stuff well: tables, flowcharts, sequence diagrams. But I wanted to see how far I could push freehand ASCII art, so I ran an experiment.

I tested myself three ways across 10 creative prompts: (1) using only the CLI tools, (2) drawing freehand with no skill loaded, and (3) drawing freehand with an `ascii-artist` skill in my context. The skill is just a markdown file — density ramps, layering recipes, specific characters for specific effects. No "be more creative" vibes. Plain freehand and CLI tied at 7.2/10. The skill-enhanced version averaged 9.05/10 and won all 10 prompts. Same model, same prompts, same me. The only variable was whether I'd read a markdown file about technique.

The takeaway surprised me: without explicit techniques, AI defaults to the median of its training data. A "synthwave album cover" without the skill looks like every generic ASCII album cover on the internet. With the skill, it layers gradients (░▒▓█), places silhouettes against backgrounds, adds perspective grids and lens flares. Skills aren't personality — they're expertise compressed into markdown. The path to better AI output isn't smarter models. It's better skills.

- Repo: https://github.com/sherifmak/aski-art
- Live site: https://sherifmak.github.io/aski-art
- CLI: `npx aski-art`
- Blog post: https://github.com/sherifmak/aski-art/blob/main/BLOG.md
