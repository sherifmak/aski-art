// Sequence diagram command

import { parseArgs } from 'node:util';
import { renderSequence } from '../renderers/sequence-renderer.js';

const HELP = `
Usage: aski sequence [options]

Generate ASCII sequence diagrams.

Example:
  aski sequence --actors "Client,Server,DB" \\
    --messages "Client->Server:GET /users,Server->DB:SELECT *,DB-->Server:rows,Server-->Client:200 OK"

Options:
  --actors <list>      Comma-separated actor names
  --messages <list>    Comma-separated messages:
                         A->B:label    solid arrow
                         A-->B:label   dashed return arrow
                         A->A:label    self-call
                         note@A:text   note on lifeline
  --width <n>          Column width per actor (default: auto)
  --help               Show this help
`;

export async function sequenceCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        actors: { type: 'string', default: '' },
        messages: { type: 'string', default: '' },
        width: { type: 'string', default: '' },
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

  if (!parsed.values.actors) {
    console.error('Error: --actors is required.');
    console.log(HELP);
    process.exit(1);
  }

  if (!parsed.values.messages) {
    console.error('Error: --messages is required.');
    console.log(HELP);
    process.exit(1);
  }

  const actors = parsed.values.actors.split(',').map(a => a.trim());
  const messages = parsed.values.messages.split(',').map(m => m.trim());
  const width = parsed.values.width ? parseInt(parsed.values.width) : undefined;

  const output = renderSequence(actors, messages, { width });
  console.log(output);
}
