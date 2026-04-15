// Border command — wrap stdin content in a styled border box

import { parseArgs } from 'node:util';
import { renderBorder } from '../renderers/border-renderer.js';
import { readStdin } from '../utils/input.js';

const HELP = `
Usage: echo "content" | aski border [options]

Wrap piped content in a styled ASCII border box.

Options:
  --style <name>    Border style: single (default), double, rounded, bold, ascii
  --title <text>    Title to embed in the top border
  --padding <n>     Inner padding (default: 1)
  --width <n>       Fixed box width (auto-calculated if omitted)
  --align <pos>     Text alignment: left (default), center, right
  --help            Show this help

Examples:
  echo "Hello World" | aski border
  ┌──────────────┐
  │              │
  │ Hello World  │
  │              │
  └──────────────┘

  echo "Status: OK" | aski border --style double --title "Server"
  ╔══ Server ═══╗
  ║             ║
  ║ Status: OK  ║
  ║             ║
  ╚═════════════╝

  echo -e "Line 1\\nLine 2" | aski border --style rounded --align center
  ╭──────────╮
  │          │
  │  Line 1  │
  │  Line 2  │
  │          │
  ╰──────────╯
`;

export async function borderCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        style: { type: 'string', default: 'single' },
        title: { type: 'string', default: '' },
        padding: { type: 'string', default: '1' },
        width: { type: 'string', default: '0' },
        align: { type: 'string', default: 'left' },
        help: { type: 'boolean', default: false },
      },
      strict: false,
    });
  } catch (e) {
    console.error('Error:', e.message);
    console.log(HELP);
    process.exit(1);
  }

  if (parsed.values.help) {
    console.log(HELP);
    return;
  }

  const content = await readStdin();
  if (!content) {
    console.error('Error: No input provided. Pipe content via stdin.');
    console.log(HELP);
    process.exit(1);
  }

  const style = parsed.values.style;
  const title = parsed.values.title;
  const padding = parseInt(parsed.values.padding) || 1;
  const width = parseInt(parsed.values.width) || 0;
  const align = parsed.values.align;

  const output = renderBorder(content, { style, title, padding, width, align });
  console.log(output);
}
