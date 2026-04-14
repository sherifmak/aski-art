// Table command

import { parseArgs } from 'node:util';
import { renderTable } from '../renderers/table-renderer.js';
import { readStdin, parseCSV, parseSemicolonData, detectDelimiter } from '../utils/input.js';

const HELP = `
Usage: aski table [options]

Generate formatted ASCII tables from CSV, TSV, or JSON data.

Input methods:
  Pipe CSV/TSV via stdin:  echo "Name,Age\\nAlice,30" | aski table
  Use --data flag:         aski table --data "Name,Age;Alice,30;Bob,25"
  Use --json flag:         echo '[{"name":"Alice"}]' | aski table --json

Options:
  --style <name>     Table style: simple, grid, unicode (default), double,
                     rounded, markdown, compact
  --header           First row is a header (default: true)
  --no-header        First row is NOT a header
  --align <spec>     Column alignment: comma-separated left,center,right
  --padding <n>      Cell padding (default: 1)
  --data <string>    Inline data (semicolons separate rows, commas cells)
  --json             Parse stdin as JSON array
  --help             Show this help
`;

export async function tableCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        style: { type: 'string', default: 'unicode' },
        header: { type: 'boolean', default: true },
        'no-header': { type: 'boolean', default: false },
        align: { type: 'string', default: '' },
        padding: { type: 'string', default: '1' },
        data: { type: 'string', default: '' },
        json: { type: 'boolean', default: false },
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

  const header = !parsed.values['no-header'];
  const align = parsed.values.align
    ? parsed.values.align.split(',').map(a => a.trim().toLowerCase())
    : [];
  const padding = parseInt(parsed.values.padding) || 1;
  const style = parsed.values.style;

  let rows;

  if (parsed.values.data) {
    rows = parseSemicolonData(parsed.values.data);
  } else {
    const stdin = await readStdin();
    if (!stdin) {
      console.error('Error: No input provided. Pipe data via stdin or use --data flag.');
      console.log(HELP);
      process.exit(1);
    }

    if (parsed.values.json) {
      try {
        const data = JSON.parse(stdin);
        if (!Array.isArray(data) || data.length === 0) {
          console.error('Error: JSON input must be a non-empty array of objects.');
          process.exit(1);
        }
        const keys = Object.keys(data[0]);
        rows = [keys, ...data.map(obj => keys.map(k => String(obj[k] ?? '')))];
      } catch (e) {
        console.error('Error: Invalid JSON input:', e.message);
        process.exit(1);
      }
    } else {
      const delimiter = detectDelimiter(stdin);
      rows = parseCSV(stdin, delimiter);
    }
  }

  if (!rows || rows.length === 0) {
    console.error('Error: No data to display.');
    process.exit(1);
  }

  const output = renderTable(rows, { style, header, align, padding });
  console.log(output);
}
