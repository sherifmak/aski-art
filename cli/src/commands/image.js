// Image command — convert images to ASCII art

import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import { readFileSync, unlinkSync, existsSync } from 'node:fs';
import { renderImage, CHARSETS } from '../renderers/image-renderer.js';
import { readStdin } from '../utils/input.js';

const HELP = `
Usage: aski image <file> [options]

Convert an image to ASCII art.

Options:
  --width <n>        Output width in characters (default: 80)
  --charset <name>   Character set: standard, detailed, blocks, minimal,
                     binary (default: standard)
  --invert           Invert brightness (light ↔ dark)
  --aspect <n>       Aspect ratio correction (default: 0.5)
  --raw              Read raw brightness values from stdin instead of a file
                     (comma-separated per row, one row per line)
  --help             Show this help

Examples:
  aski image photo.png
  aski image photo.jpg --width 120 --charset detailed
  aski image logo.png --invert --charset blocks
  cat brightness.csv | aski image --raw --width 40
`;

const TEMP_FILE = '/tmp/aski-temp.ppm';

export async function imageCommand(args) {
  let parsed;
  try {
    parsed = parseArgs({
      args,
      options: {
        width: { type: 'string', default: '80' },
        charset: { type: 'string', default: 'standard' },
        invert: { type: 'boolean', default: false },
        aspect: { type: 'string', default: '0.5' },
        raw: { type: 'boolean', default: false },
        help: { type: 'boolean', default: false },
      },
      allowPositionals: true,
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

  const targetWidth = parseInt(parsed.values.width) || 80;
  const charset = parsed.values.charset;
  const invert = parsed.values.invert;
  const aspect = parseFloat(parsed.values.aspect) || 0.5;

  if (charset && !CHARSETS[charset]) {
    console.error(`Error: Unknown charset "${charset}". Available: ${Object.keys(CHARSETS).join(', ')}`);
    process.exit(1);
  }

  let pixelData;

  if (parsed.values.raw) {
    pixelData = await parseRawStdin();
  } else {
    const filePath = parsed.positionals[0];
    if (!filePath) {
      console.error('Error: No image file specified.');
      console.log(HELP);
      process.exit(1);
    }

    if (!existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }

    pixelData = convertAndParse(filePath);
  }

  if (!pixelData) {
    console.error('Error: Failed to read image data.');
    process.exit(1);
  }

  const output = renderImage(pixelData, { targetWidth, charset, invert, aspect });
  console.log(output);
}

async function parseRawStdin() {
  const stdin = await readStdin();
  if (!stdin) {
    console.error('Error: No data on stdin. Use --raw with piped brightness values.');
    process.exit(1);
  }

  const rows = stdin.trim().split('\n').filter(line => line.trim());
  const pixels = [];
  let width = 0;

  for (const row of rows) {
    const values = row.split(',').map(v => parseInt(v.trim()));
    if (width === 0) width = values.length;
    for (const brightness of values) {
      const b = Math.max(0, Math.min(255, brightness || 0));
      pixels.push([b, b, b]);
    }
  }

  return { width, height: rows.length, pixels };
}

function convertAndParse(filePath) {
  // Try to convert image to PPM
  let converted = false;

  try {
    // macOS: use sips
    execSync(`sips -s format ppm "${filePath}" --out ${TEMP_FILE} 2>/dev/null`, {
      stdio: 'pipe',
      timeout: 10000,
    });
    converted = true;
  } catch {
    // Linux: try ImageMagick convert
    try {
      execSync(`convert "${filePath}" ppm:${TEMP_FILE} 2>/dev/null`, {
        stdio: 'pipe',
        timeout: 10000,
      });
      converted = true;
    } catch {
      // Neither worked
    }
  }

  if (!converted || !existsSync(TEMP_FILE)) {
    console.error('Error: Could not convert image. Requires sips (macOS) or ImageMagick (Linux).');
    process.exit(1);
  }

  try {
    const data = readFileSync(TEMP_FILE);
    return parsePPM(data);
  } finally {
    cleanup();
  }
}

function parsePPM(data) {
  // Detect P3 (ASCII) vs P6 (binary)
  const header = data.slice(0, 2).toString('ascii');

  if (header === 'P3') {
    return parsePPM_P3(data.toString('ascii'));
  } else if (header === 'P6') {
    return parsePPM_P6(data);
  } else {
    console.error('Error: Unsupported PPM format. Expected P3 or P6.');
    process.exit(1);
  }
}

function parsePPM_P3(text) {
  const lines = text.split('\n');
  const tokens = [];

  let headerParsed = false;
  let magic = null;
  let width = 0;
  let height = 0;
  let maxval = 255;

  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*/, '').trim();
    if (!line) continue;

    const parts = line.split(/\s+/);
    for (const part of parts) {
      tokens.push(part);
    }
  }

  let idx = 0;
  magic = tokens[idx++]; // P3
  width = parseInt(tokens[idx++]);
  height = parseInt(tokens[idx++]);
  maxval = parseInt(tokens[idx++]);

  const pixels = [];
  const scale = 255 / maxval;

  while (idx + 2 < tokens.length) {
    const r = Math.round(parseInt(tokens[idx++]) * scale);
    const g = Math.round(parseInt(tokens[idx++]) * scale);
    const b = Math.round(parseInt(tokens[idx++]) * scale);
    pixels.push([r, g, b]);
  }

  return { width, height, pixels };
}

function parsePPM_P6(data) {
  // Find the end of the header
  let pos = 0;
  const lines = [];
  let headerEnd = 0;

  // Read header lines, skipping comments
  while (lines.length < 3) {
    let lineEnd = data.indexOf(0x0a, pos);
    if (lineEnd === -1) lineEnd = data.length;

    const line = data.slice(pos, lineEnd).toString('ascii').replace(/#.*/, '').trim();
    pos = lineEnd + 1;

    if (line) {
      // A line may contain multiple tokens
      const parts = line.split(/\s+/);
      for (const part of parts) {
        lines.push(part);
      }
    }
  }

  // lines should now have: P6, width, height, maxval
  // But we need at least 4 tokens
  while (lines.length < 4) {
    let lineEnd = data.indexOf(0x0a, pos);
    if (lineEnd === -1) lineEnd = data.length;
    const line = data.slice(pos, lineEnd).toString('ascii').replace(/#.*/, '').trim();
    pos = lineEnd + 1;
    if (line) {
      lines.push(...line.split(/\s+/));
    }
  }

  headerEnd = pos;
  const width = parseInt(lines[1]);
  const height = parseInt(lines[2]);
  const maxval = parseInt(lines[3]);
  const scale = 255 / maxval;

  const pixels = [];
  const pixelData = data.slice(headerEnd);

  for (let i = 0; i + 2 < pixelData.length; i += 3) {
    const r = Math.round(pixelData[i] * scale);
    const g = Math.round(pixelData[i + 1] * scale);
    const b = Math.round(pixelData[i + 2] * scale);
    pixels.push([r, g, b]);
  }

  return { width, height, pixels };
}

function cleanup() {
  try {
    if (existsSync(TEMP_FILE)) {
      unlinkSync(TEMP_FILE);
    }
  } catch {
    // Ignore cleanup errors
  }
}
