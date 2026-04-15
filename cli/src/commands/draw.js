// Draw command — quick shape drawing

import { parseArgs } from 'node:util';
import { renderDraw } from '../renderers/draw-renderer.js';

const HELP = `
Usage: aski draw --shape <shape> [options]

Draw quick ASCII shapes.

Shapes:
  box        Bordered box with optional centered text
  diamond    Decision diamond with optional text
  tree       ASCII tree from hierarchical data
  hr         Horizontal rule with optional centered text
  arrow      Directional arrow with optional label
  brace      Curly brace with label
  circle     ASCII circle with given radius
  star       5-pointed ASCII star

Options:
  --shape <name>      Shape to draw (required)
  --width <n>         Width (for box)
  --height <n>        Height (for box, brace)
  --size <s>          Size: small/medium/large or number (for diamond, star)
  --text <string>     Text content (for box, diamond, hr)
  --style <name>      Style variant (for box: single/double/rounded/bold/ascii;
                      for hr: single/double/bold/dashed/wave/dot)
  --data <string>     Hierarchical data for tree
  --direction <dir>   Direction: left/right/up/down (for arrow, brace)
  --length <n>        Length (for hr, arrow)
  --label <string>    Label text (for arrow, brace, hr)
  --radius <n>        Radius (for circle)
  --help              Show this help

Examples:
  aski draw --shape box --width 30 --height 5 --text "Hello World"
  aski draw --shape box --width 40 --height 7 --text "Server" --style double
  aski draw --shape diamond --size 4 --text "YES?"
  aski draw --shape tree --data "Root;Child1;Child2;Child1>Grandchild1;Child1>Grandchild2"
  aski draw --shape hr --length 50 --style double --label "Section Break"
  aski draw --shape arrow --direction right --length 30 --label "request"
  aski draw --shape arrow --direction down --length 10
  aski draw --shape brace --direction right --height 7 --label "group"
  aski draw --shape circle --radius 5
  aski draw --shape star --size medium
`;

export async function drawCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        shape: { type: 'string' },
        width: { type: 'string' },
        height: { type: 'string' },
        size: { type: 'string' },
        text: { type: 'string' },
        style: { type: 'string' },
        data: { type: 'string' },
        direction: { type: 'string' },
        length: { type: 'string' },
        label: { type: 'string' },
        radius: { type: 'string' },
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

  if (!parsed.values.shape) {
    console.error('Error: --shape is required.');
    console.log(HELP);
    process.exit(1);
  }

  const opts = {
    shape: parsed.values.shape,
  };

  if (parsed.values.width) opts.width = parseInt(parsed.values.width);
  if (parsed.values.height) opts.height = parseInt(parsed.values.height);
  if (parsed.values.size) {
    const n = parseInt(parsed.values.size);
    opts.size = isNaN(n) ? parsed.values.size : n;
  }
  if (parsed.values.text) opts.text = parsed.values.text;
  if (parsed.values.style) opts.style = parsed.values.style;
  if (parsed.values.data) opts.data = parsed.values.data;
  if (parsed.values.direction) opts.direction = parsed.values.direction;
  if (parsed.values.length) opts.length = parseInt(parsed.values.length);
  if (parsed.values.label) opts.label = parsed.values.label;
  if (parsed.values.radius) opts.radius = parseInt(parsed.values.radius);

  const output = renderDraw(opts);
  console.log(output);
}
