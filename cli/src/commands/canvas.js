// Canvas command — compose 2D character art from elements

import { parseArgs } from 'node:util';
import { renderCanvas } from '../renderers/canvas-renderer.js';
import { readStdin } from '../utils/input.js';

const HELP = `
Usage: aski canvas [options]

Compose 2D character art on a grid using positioned elements.

Input methods:
  JSON via stdin:    echo '{"width":60,"height":20,"elements":[...]}' | aski canvas
  JSON via flag:     aski canvas --json '{"width":60,"height":20,"elements":[...]}'
  CLI flags:         aski canvas --width 60 --height 20 --box "0,0,60,20,double,Title"

Element flags (can be repeated):
  --box "x,y,w,h[,style][,title]"   Draw a bordered box
  --text "x,y,content"              Place text at position (content may contain commas)
  --line "x1,y1,x2,y2"             Draw a line
  --arrow "x1,y1,x2,y2"            Draw a line with arrowhead at end
  --fill "x,y,w,h,char"            Fill area with character

Options:
  --width <n>        Canvas width (default: 80)
  --height <n>       Canvas height (default: 24)
  --bg <char>        Background character (default: space)
  --json <string>    Full JSON specification
  --help             Show this help

Box styles: single (default), double, rounded, bold, ascii

Examples:
  aski canvas --width 40 --height 10 --box "0,0,40,10,double,My Box"
  aski canvas --width 60 --height 20 \\
    --box "0,0,60,20,double,Cluster" \\
    --box "2,2,25,8,single,Service A" \\
    --text "5,5,Hello World" \\
    --line "30,5,50,5" \\
    --arrow "10,10,10,15"
`;

export async function canvasCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        width: { type: 'string', default: '80' },
        height: { type: 'string', default: '24' },
        json: { type: 'string' },
        box: { type: 'string', multiple: true },
        text: { type: 'string', multiple: true },
        line: { type: 'string', multiple: true },
        arrow: { type: 'string', multiple: true },
        fill: { type: 'string', multiple: true },
        bg: { type: 'string', default: ' ' },
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

  let canvasOptions;

  // JSON mode: from flag or stdin
  if (parsed.values.json) {
    try {
      canvasOptions = JSON.parse(parsed.values.json);
    } catch (e) {
      console.error('Error: Invalid JSON:', e.message);
      process.exit(1);
    }
  } else {
    // Check for stdin JSON
    const stdin = await readStdin();
    if (stdin) {
      try {
        canvasOptions = JSON.parse(stdin);
      } catch (e) {
        console.error('Error: Invalid JSON from stdin:', e.message);
        process.exit(1);
      }
    }
  }

  // CLI flag mode
  if (!canvasOptions) {
    const elements = [];

    if (parsed.values.box) {
      for (const val of parsed.values.box) {
        const parts = val.split(',');
        const el = {
          type: 'box',
          x: parseInt(parts[0]),
          y: parseInt(parts[1]),
          width: parseInt(parts[2]),
          height: parseInt(parts[3]),
        };
        if (parts[4]) el.style = parts[4];
        if (parts[5]) el.title = parts.slice(5).join(',');
        elements.push(el);
      }
    }

    if (parsed.values.text) {
      for (const val of parsed.values.text) {
        const parts = val.split(',');
        elements.push({
          type: 'text',
          x: parseInt(parts[0]),
          y: parseInt(parts[1]),
          text: parts.slice(2).join(','),
        });
      }
    }

    if (parsed.values.line) {
      for (const val of parsed.values.line) {
        const parts = val.split(',');
        elements.push({
          type: 'line',
          x1: parseInt(parts[0]),
          y1: parseInt(parts[1]),
          x2: parseInt(parts[2]),
          y2: parseInt(parts[3]),
        });
      }
    }

    if (parsed.values.arrow) {
      for (const val of parsed.values.arrow) {
        const parts = val.split(',');
        elements.push({
          type: 'arrow',
          x1: parseInt(parts[0]),
          y1: parseInt(parts[1]),
          x2: parseInt(parts[2]),
          y2: parseInt(parts[3]),
        });
      }
    }

    if (parsed.values.fill) {
      for (const val of parsed.values.fill) {
        const parts = val.split(',');
        elements.push({
          type: 'fill',
          x: parseInt(parts[0]),
          y: parseInt(parts[1]),
          width: parseInt(parts[2]),
          height: parseInt(parts[3]),
          char: parts[4] || ' ',
        });
      }
    }

    canvasOptions = {
      width: parseInt(parsed.values.width) || 80,
      height: parseInt(parsed.values.height) || 24,
      elements,
      bg: parsed.values.bg,
    };
  }

  const output = renderCanvas(canvasOptions);
  console.log(output);
}
