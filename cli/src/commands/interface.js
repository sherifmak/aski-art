// Interface (TUI dashboard) command

import { parseArgs } from 'node:util';
import { renderInterface, getTemplate } from '../renderers/interface-renderer.js';

const HELP = `
Usage: aski interface [options]

Generate TUI-style dashboard interfaces.

Examples:
  aski interface --template server-status
  aski interface --components "header:text=DASHBOARD,progress:label=CPU:value=72:max=100"

Options:
  --template <name>     Built-in template: server-status, deploy-log,
                        migration, api-response
  --components <spec>   Component specification (see below)
  --width <n>           Output width (default: 60)
  --border <style>      Border style: unicode (default), ascii, double, rounded
  --help                Show this help

Component spec format:
  Comma-separated components, each is type:key=value:key=value

Component types:
  header:text=TITLE             Centered title
  divider                       Horizontal line
  progress:label=X:value=N:max=M   Progress bar
  kvlist:items=K1|V1;K2|V2      Key-value pairs
  statuslist:items=✓ Done;✗ Fail   Status items
  text:content=Some text        Text block
  badge:text=OK:style=success   Badge: [OK], [WARN], [FAIL]
`;

export async function interfaceCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        template: { type: 'string', default: '' },
        components: { type: 'string', default: '' },
        width: { type: 'string', default: '60' },
        border: { type: 'string', default: 'unicode' },
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

  const width = parseInt(parsed.values.width) || 60;
  const border = parsed.values.border;

  let components;

  if (parsed.values.template) {
    components = getTemplate(parsed.values.template, width);
    if (!components) {
      console.error(`Error: Unknown template "${parsed.values.template}".`);
      console.error('Available: server-status, deploy-log, migration, api-response');
      process.exit(1);
    }
  } else if (parsed.values.components) {
    components = parseComponentSpec(parsed.values.components);
  } else {
    console.error('Error: --template or --components is required.');
    console.log(HELP);
    process.exit(1);
  }

  const output = renderInterface(components, { width, border });
  console.log(output);
}

function parseComponentSpec(spec) {
  return spec.split(',').map(part => {
    const segments = part.trim().split(':');
    const type = segments[0];
    const props = {};
    for (let i = 1; i < segments.length; i++) {
      const eq = segments[i].indexOf('=');
      if (eq !== -1) {
        props[segments[i].substring(0, eq)] = segments[i].substring(eq + 1);
      }
    }
    return { type, ...props };
  });
}
