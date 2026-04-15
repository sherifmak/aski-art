// Chart command

import { parseArgs } from 'node:util';
import { renderChart } from '../renderers/chart-renderer.js';
import { readStdin } from '../utils/input.js';

const HELP = `
Usage: aski chart [options]

Generate ASCII charts from data.

Chart types:
  sparkline    Inline sparkline using ▁▂▃▄▅▆▇█ characters
  bar          Horizontal bar chart
  line         ASCII line chart with Y-axis
  histogram    Vertical bar chart

Input methods:
  Pipe data via stdin:   echo "Mon,10;Tue,20;Wed,15" | aski chart --type bar
  Use --data flag:       aski chart --type bar --data "Mon,10;Tue,20;Wed,15"
  Sparkline shorthand:   aski chart --type sparkline --data "1,3,5,2,7,4,6"

Options:
  --type <name>    Chart type: sparkline, bar, line, histogram (required)
  --data <string>  Inline data as "label,value;label,value;..." or
                   comma-separated numbers for sparkline
  --width <n>      Chart width in characters (default: 60)
  --height <n>     Chart height in rows (default: 12)
  --title <text>   Title displayed above the chart
  --sort <order>   Sort data: asc, desc, none (default: none)
  --max <n>        Override maximum value for scaling
  --label <text>   Prefix label for sparkline output
  --help           Show this help

Examples:
  aski chart --type sparkline --data "1,4,2,7,3,8,5,6" --label "CPU"
  aski chart --type bar --data "JS,72;Python,65;TS,58;Rust,41" --width 50
  aski chart --type line --data "Jan,10;Feb,25;Mar,18;Apr,32;May,28" --height 10
  aski chart --type histogram --data "Mon,3;Tue,7;Wed,5;Thu,2;Fri,6" --title "Weekly"
  echo "10,20,15,30,25" | aski chart --type sparkline
`;

export async function chartCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        type: { type: 'string', default: '' },
        data: { type: 'string', default: '' },
        width: { type: 'string', default: '60' },
        height: { type: 'string', default: '12' },
        title: { type: 'string', default: '' },
        sort: { type: 'string', default: '' },
        max: { type: 'string', default: '' },
        label: { type: 'string', default: '' },
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

  const type = parsed.values.type;
  if (!type) {
    console.error('Error: --type is required. Choose: sparkline, bar, line, histogram');
    console.log(HELP);
    process.exit(1);
  }

  const width = parseInt(parsed.values.width) || 60;
  const height = parseInt(parsed.values.height) || 12;
  const title = parsed.values.title || undefined;
  const sort = parsed.values.sort || undefined;
  const max = parsed.values.max ? parseFloat(parsed.values.max) : undefined;
  const label = parsed.values.label || undefined;

  let rawData = parsed.values.data;

  if (!rawData) {
    const stdin = await readStdin();
    if (!stdin) {
      console.error('Error: No input provided. Pipe data via stdin or use --data flag.');
      console.log(HELP);
      process.exit(1);
    }
    rawData = stdin.trim();
  }

  const data = parseChartData(rawData, type);

  if (!data || data.length === 0) {
    console.error('Error: Could not parse data. Use "label,value;label,value;..." format.');
    process.exit(1);
  }

  const output = renderChart({ type, data, width, height, title, sort, max, label });
  console.log(output);
}

function parseChartData(raw, type) {
  // Check if it's just comma-separated numbers (sparkline shorthand)
  const parts = raw.split(';').map(s => s.trim()).filter(Boolean);

  if (parts.length === 1 && type === 'sparkline') {
    // Could be just "1,2,3,4" without labels
    const nums = parts[0].split(',').map(s => s.trim());
    const allNumbers = nums.every(n => !isNaN(parseFloat(n)));
    if (allNumbers) {
      return nums.map((n, i) => ({ label: String(i), value: parseFloat(n) }));
    }
  }

  // Also handle single semicolon-less comma numbers for sparkline
  if (type === 'sparkline' && !raw.includes(';')) {
    const nums = raw.split(',').map(s => s.trim());
    const allNumbers = nums.every(n => !isNaN(parseFloat(n)));
    if (allNumbers) {
      return nums.map((n, i) => ({ label: String(i), value: parseFloat(n) }));
    }
  }

  // Standard label,value;label,value format
  return parts.map(part => {
    const [labelPart, ...rest] = part.split(',').map(s => s.trim());
    const valuePart = rest[rest.length - 1];
    const value = parseFloat(valuePart);
    if (isNaN(value)) {
      return { label: labelPart, value: 0 };
    }
    return { label: labelPart, value };
  });
}
