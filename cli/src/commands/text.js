// Text banner command

import { parseArgs } from 'node:util';
import { renderText } from '../renderers/text-renderer.js';

const HELP = `
Usage: aski text <message> [options]

Generate ASCII art text banners.

Examples:
  aski text "Hello World"
  aski text "HELLO" --font banner
  aski text "Test" --font shadow

Options:
  --font <name>    Font style: block (default), banner, mini, shadow
  --help           Show this help

Fonts:
  block   — 5 lines tall, bold block letters using █
  banner  — 7 lines tall, large letters using #
  mini    — 3 lines tall, compact characters
  shadow  — 5 lines tall, block letters with ░ shadow
`;

export async function textCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        font: { type: 'string', default: 'block' },
        help: { type: 'boolean', default: false },
      },
      allowPositionals: true,
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

  const message = parsed.positionals.join(' ');
  if (!message) {
    console.error('Error: No text provided.');
    console.log(HELP);
    process.exit(1);
  }

  const output = renderText(message, { font: parsed.values.font });
  console.log(output);
}
