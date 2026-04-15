// Compose command — arrange multiple ASCII art blocks in layouts

import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import { renderCompose } from '../renderers/compose-renderer.js';

const HELP = `
Usage: aski compose [options]

Compose multiple ASCII art outputs into a single layout.

Options:
  --horizontal       Arrange blocks side by side (default)
  --vertical         Stack blocks vertically
  --grid <RxC>       Arrange blocks in a grid (e.g. "2x2", "3x2")
  --exec <cmd>       Shell command to generate a block (repeatable)
  --gap <n>          Gap between blocks in horizontal/grid mode (default: 2)
  --align <pos>      Vertical alignment: top, middle, bottom (default: top)
  --separator <char> Separator between blocks in vertical mode
  --border <style>   Wrap result in border: single, double, rounded, bold, ascii
  --help             Show this help

Examples:
  aski compose --horizontal --gap 3 \\
    --exec "aski text 'Hello'" \\
    --exec "aski text 'World'"

  aski compose --grid 2x2 \\
    --exec "aski chart --type bar --data 'A,10;B,20'" \\
    --exec "aski chart --type bar --data 'C,15;D,25'" \\
    --exec "aski chart --type bar --data 'E,30;F,5'" \\
    --exec "aski chart --type bar --data 'G,12;H,18'"

  aski compose --vertical --separator "=" \\
    --exec "aski table --data 'Name,Score;Alice,95'" \\
    --exec "aski table --data 'Name,Score;Bob,87'"
`;

export async function composeCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        horizontal: { type: 'boolean', default: false },
        vertical: { type: 'boolean', default: false },
        grid: { type: 'string', default: '' },
        exec: { type: 'string', multiple: true, default: [] },
        gap: { type: 'string', default: '2' },
        align: { type: 'string', default: 'top' },
        separator: { type: 'string', default: '' },
        border: { type: 'string', default: '' },
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

  const execCmds = parsed.values.exec;
  if (!execCmds || execCmds.length === 0) {
    console.error('Error: No --exec commands provided. At least one is required.');
    console.log(HELP);
    process.exit(1);
  }

  // Determine mode
  let mode = 'horizontal';
  if (parsed.values.vertical) {
    mode = 'vertical';
  } else if (parsed.values.grid) {
    mode = parsed.values.grid;
  }

  const gap = parseInt(parsed.values.gap) || 2;
  const align = parsed.values.align;
  const separator = parsed.values.separator;
  const border = parsed.values.border;

  // Execute each command and collect output blocks
  const blocks = [];
  for (const cmd of execCmds) {
    try {
      const output = execSync(cmd, { encoding: 'utf-8' }).trim();
      blocks.push(output);
    } catch (e) {
      console.error(`Error executing: ${cmd}`);
      console.error(e.stderr || e.message);
      process.exit(1);
    }
  }

  const result = renderCompose(blocks, { mode, gap, align, separator, border });
  console.log(result);
}
