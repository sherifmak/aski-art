// Art command

import { parseArgs } from 'node:util';
import { renderArt, listArt } from '../renderers/art-renderer.js';

const HELP = `
Usage: aski art [options]

Display pre-made ASCII art from the built-in library.

Options:
  --name <name>       Art piece to display (e.g. cat, dragon, rocket)
  --list              List all available art pieces
  --category <name>   Filter by category when listing (animals, objects,
                      symbols, decorations)
  --help              Show this help

Examples:
  aski art --name cat
  aski art --name dragon
  aski art --list
  aski art --list --category animals
`;

export async function artCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        name: { type: 'string', default: '' },
        list: { type: 'boolean', default: false },
        category: { type: 'string', default: '' },
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

  if (parsed.values.list) {
    const output = listArt(parsed.values.category || undefined);
    console.log(output);
    return;
  }

  if (!parsed.values.name) {
    console.error('Error: --name is required. Use --list to see available art.');
    console.log(HELP);
    process.exit(1);
  }

  const output = renderArt({ name: parsed.values.name });
  console.log(output);
}
