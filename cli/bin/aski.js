#!/usr/bin/env node

import { parseArgs } from 'node:util';

const LOGO = `
   ╔═══════════════════════════════════════════════╗
   ║                                               ║
   ║    █████╗ ███████╗██╗  ██╗██╗                 ║
   ║   ██╔══██╗██╔════╝██║ ██╔╝██║                 ║
   ║   ███████║███████╗█████╔╝ ██║                 ║
   ║   ██╔══██║╚════██║██╔═██╗ ██║                 ║
   ║   ██║  ██║███████║██║  ██╗██║                 ║
   ║   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝                 ║
   ║                                               ║
   ║         ASCII Art Tools for Developers         ║
   ║                                               ║
   ╚═══════════════════════════════════════════════╝
`;

const HELP = `${LOGO}
  Usage: aski <command> [options]

  Commands:
    table       Generate formatted ASCII tables
    text        Generate ASCII art text banners
    sequence    Generate ASCII sequence diagrams
    interface   Generate TUI-style dashboard interfaces
    flow        Generate ASCII flowcharts
    wireframe   Generate ASCII UI wireframes

  Options:
    --help      Show help for a command
    --version   Show version

  Examples:
    aski table --data "Name,Age;Alice,30;Bob,25"
    aski text "Hello" --font block
    aski sequence --actors "A,B" --messages "A->B:hello"
    aski interface --template server-status
    aski flow --nodes "Start,End" --edges "Start->End"
    aski wireframe --template login

  Run \`aski <command> --help\` for detailed usage of each command.
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    console.log(HELP);
    return;
  }

  if (command === '--version' || command === '-v') {
    console.log('aski v1.0.0');
    return;
  }

  const subArgs = args.slice(1);

  switch (command) {
    case 'table': {
      const { tableCommand } = await import('../src/commands/table.js');
      await tableCommand(subArgs);
      break;
    }
    case 'text': {
      const { textCommand } = await import('../src/commands/text.js');
      await textCommand(subArgs);
      break;
    }
    case 'sequence': {
      const { sequenceCommand } = await import('../src/commands/sequence.js');
      await sequenceCommand(subArgs);
      break;
    }
    case 'interface': {
      const { interfaceCommand } = await import('../src/commands/interface.js');
      await interfaceCommand(subArgs);
      break;
    }
    case 'flow': {
      const { flowCommand } = await import('../src/commands/flow.js');
      await flowCommand(subArgs);
      break;
    }
    case 'wireframe': {
      const { wireframeCommand } = await import('../src/commands/wireframe.js');
      await wireframeCommand(subArgs);
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP);
      process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
