// Flow (flowchart) command

import { parseArgs } from 'node:util';
import { renderFlow } from '../renderers/flow-renderer.js';

const HELP = `
Usage: aski flow [options]

Generate ASCII flowcharts with auto-layout.

Example:
  aski flow --nodes "Start,Process,Decision(diamond),End" \\
    --edges "Start->Process,Process->Decision,Decision->End:yes,Decision->Process:no"

Options:
  --nodes <spec>       Comma-separated nodes. Optional type: Name(type)
                       Types: rect (default), diamond, round
  --edges <spec>       Comma-separated edges: From->To or From->To:label
  --direction <dir>    Layout direction: TB (top-to-bottom, default), LR
  --help               Show this help
`;

export async function flowCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        nodes: { type: 'string', default: '' },
        edges: { type: 'string', default: '' },
        direction: { type: 'string', default: 'TB' },
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

  if (!parsed.values.nodes) {
    console.error('Error: --nodes is required.');
    console.log(HELP);
    process.exit(1);
  }

  if (!parsed.values.edges) {
    console.error('Error: --edges is required.');
    console.log(HELP);
    process.exit(1);
  }

  const nodes = parsed.values.nodes.split(',').map(n => n.trim());
  const edges = parsed.values.edges.split(',').map(e => e.trim());
  const direction = parsed.values.direction.toUpperCase();

  const output = renderFlow(nodes, edges, { direction });
  console.log(output);
}
