// Compose renderer — horizontal, vertical, and grid layout for ASCII art blocks

import { renderBorder } from './border-renderer.js';

export function renderCompose(blocks, options = {}) {
  const {
    mode = 'horizontal',
    gap = 2,
    align = 'top',
    separator = '',
    border = '',
  } = options;

  let result;

  if (mode === 'vertical') {
    result = composeVertical(blocks, separator);
  } else if (mode.includes('x')) {
    result = composeGrid(blocks, mode, gap, align);
  } else {
    result = composeHorizontal(blocks, gap, align);
  }

  if (border) {
    result = renderBorder(result, { style: border });
  }

  return result;
}

function composeHorizontal(blocks, gap, align) {
  const splitBlocks = blocks.map(b => b.split('\n'));
  const maxHeight = Math.max(...splitBlocks.map(b => b.length));
  const blockWidths = splitBlocks.map(b => Math.max(...b.map(line => line.length)));

  // Pad each block to maxHeight based on alignment
  const padded = splitBlocks.map(b => {
    const diff = maxHeight - b.length;
    if (diff === 0) return b;

    let topPad = 0;
    if (align === 'middle') {
      topPad = Math.floor(diff / 2);
    } else if (align === 'bottom') {
      topPad = diff;
    }
    const bottomPad = diff - topPad;

    return [
      ...Array(topPad).fill(''),
      ...b,
      ...Array(bottomPad).fill(''),
    ];
  });

  const gapStr = ' '.repeat(gap);
  const lines = [];
  for (let row = 0; row < maxHeight; row++) {
    const parts = padded.map((b, i) => {
      const line = b[row] || '';
      return line.padEnd(blockWidths[i]);
    });
    lines.push(parts.join(gapStr));
  }

  return lines.join('\n');
}

function composeVertical(blocks, separator) {
  if (!separator) {
    return blocks.join('\n');
  }

  const allLines = blocks.flatMap(b => b.split('\n'));
  const maxWidth = Math.max(...allLines.map(l => l.length));
  const sepLine = separator.repeat(maxWidth).slice(0, maxWidth);

  return blocks.join('\n' + sepLine + '\n');
}

function composeGrid(blocks, mode, gap, align) {
  const match = mode.match(/^(\d+)x(\d+)$/);
  if (!match) {
    throw new Error(`Invalid grid mode: "${mode}". Expected format like "2x2", "3x2".`);
  }

  const rows = parseInt(match[1]);
  const cols = parseInt(match[2]);

  const rowGroups = [];
  for (let r = 0; r < rows; r++) {
    const start = r * cols;
    const group = blocks.slice(start, start + cols);
    if (group.length > 0) {
      rowGroups.push(group);
    }
  }

  const composedRows = rowGroups.map(group => composeHorizontal(group, gap, align));
  return composedRows.join('\n\n');
}
