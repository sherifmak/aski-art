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
    chart       Generate charts (sparkline, bar, line, histogram)
    compose     Arrange multiple outputs side by side or in grids
    border      Wrap text in decorative borders
    canvas      Place elements on a spatial grid
    draw        Quick shapes and art primitives
    image       Convert images to ASCII art
    art         Browse the ASCII art library

  Options:
    --help      Show help for a command
    --version   Show version

  Examples:
    aski table --data "Name,Age;Alice,30;Bob,25"
    aski text "Hello" --font block
    aski chart --type sparkline --data "1,4,6,3,8,2,7" --label "CPU"
    aski compose --horizontal --exec "aski table --data 'A,B;1,2'" --exec "aski art --name cat"
    aski border --style rounded --title "Status" < output.txt
    aski canvas --width 40 --height 10 --box "0,0,40,10,rounded,Hello"
    aski draw --shape tree --data "Root;A;B;A>A1;A>A2"
    aski art --name dragon

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
    console.log('aski v2.0.0');
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
    case 'chart': {
      const { chartCommand } = await import('../src/commands/chart.js');
      await chartCommand(subArgs);
      break;
    }
    case 'compose': {
      const { composeCommand } = await import('../src/commands/compose.js');
      await composeCommand(subArgs);
      break;
    }
    case 'border': {
      const { borderCommand } = await import('../src/commands/border.js');
      await borderCommand(subArgs);
      break;
    }
    case 'canvas': {
      const { canvasCommand } = await import('../src/commands/canvas.js');
      await canvasCommand(subArgs);
      break;
    }
    case 'draw': {
      const { drawCommand } = await import('../src/commands/draw.js');
      await drawCommand(subArgs);
      break;
    }
    case 'image': {
      const { imageCommand } = await import('../src/commands/image.js');
      await imageCommand(subArgs);
      break;
    }
    case 'art': {
      const { artCommand } = await import('../src/commands/art.js');
      await artCommand(subArgs);
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
