// Wireframe command

import { parseArgs } from 'node:util';
import { renderWireframe, getTemplate } from '../renderers/wireframe-renderer.js';

const HELP = `
Usage: aski wireframe [options]

Generate ASCII UI wireframes.

Examples:
  aski wireframe --template login
  aski wireframe --template dashboard --width 70

Options:
  --template <name>     Built-in template: login, dashboard, settings,
                        landing, chat
  --components <spec>   Component tree specification
  --width <n>           Output width (default: 60)
  --help                Show this help

Component spec format:
  Comma-separated components with nested children via semicolons:
  navbar:title=MyApp,card:title=Login:children=input:placeholder=Email;button:text=Submit
`;

export async function wireframeCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        template: { type: 'string', default: '' },
        components: { type: 'string', default: '' },
        width: { type: 'string', default: '60' },
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

  let components;

  if (parsed.values.template) {
    components = getTemplate(parsed.values.template, width);
    if (!components) {
      console.error(`Error: Unknown template "${parsed.values.template}".`);
      console.error('Available: login, dashboard, settings, landing, chat');
      process.exit(1);
    }
  } else if (parsed.values.components) {
    components = parseComponentSpec(parsed.values.components);
  } else {
    console.error('Error: --template or --components is required.');
    console.log(HELP);
    process.exit(1);
  }

  const output = renderWireframe(components, { width });
  console.log(output);
}

function parseComponentSpec(spec) {
  // Parse top-level components separated by commas
  // Children are separated by semicolons within children= value
  return spec.split(',').map(part => {
    const segments = part.trim().split(':');
    const type = segments[0];
    const props = {};
    for (let i = 1; i < segments.length; i++) {
      const eq = segments[i].indexOf('=');
      if (eq !== -1) {
        const key = segments[i].substring(0, eq);
        const val = segments[i].substring(eq + 1);
        if (key === 'children') {
          props.children = val.split(';').map(child => {
            const childSegs = child.trim().split(':');
            const childType = childSegs[0];
            const childProps = {};
            for (let j = 1; j < childSegs.length; j++) {
              // Handle simple key=value within children — but children= uses semicolons
              // so we parse carefully
            }
            // Simple parse for children
            const childPart = child.trim();
            const firstColon = childPart.indexOf(':');
            if (firstColon === -1) return { type: childPart };
            const ct = childPart.substring(0, firstColon);
            const rest = childPart.substring(firstColon + 1);
            const cp = {};
            // Parse key=value pairs separated by : but we already split on :
            // Use a simpler approach
            const kvPairs = rest.split(/(?<!=):(?!=)/);
            for (const kv of [rest]) {
              const eqIdx = kv.indexOf('=');
              if (eqIdx !== -1) {
                cp[kv.substring(0, eqIdx)] = kv.substring(eqIdx + 1);
              }
            }
            return { type: ct, ...cp };
          });
        } else {
          props[key] = val;
        }
      }
    }
    return { type, ...props };
  });
}
