// Table renderer — supports 7 styles with alignment and padding

const STYLES = {
  unicode: {
    topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘',
    teeRight: '├', teeLeft: '┤', teeDown: '┬', teeUp: '┴',
    cross: '┼', h: '─', v: '│',
  },
  double: {
    topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝',
    teeRight: '╠', teeLeft: '╣', teeDown: '╦', teeUp: '╩',
    cross: '╬', h: '═', v: '║',
  },
  rounded: {
    topLeft: '╭', topRight: '╮', bottomLeft: '╰', bottomRight: '╯',
    teeRight: '├', teeLeft: '┤', teeDown: '┬', teeUp: '┴',
    cross: '┼', h: '─', v: '│',
  },
  grid: {
    topLeft: '+', topRight: '+', bottomLeft: '+', bottomRight: '+',
    teeRight: '+', teeLeft: '+', teeDown: '+', teeUp: '+',
    cross: '+', h: '-', v: '|',
  },
};

export function renderTable(rows, options = {}) {
  const {
    style = 'unicode',
    header = true,
    align = [],
    padding = 1,
  } = options;

  if (!rows || rows.length === 0) return '';

  const colCount = Math.max(...rows.map(r => r.length));
  // Normalize rows to same column count
  const normalizedRows = rows.map(r => {
    const row = [...r];
    while (row.length < colCount) row.push('');
    return row;
  });

  // Calculate column widths
  const colWidths = [];
  for (let c = 0; c < colCount; c++) {
    colWidths[c] = Math.max(...normalizedRows.map(r => String(r[c]).length));
  }

  const pad = ' '.repeat(padding);

  function alignCell(text, width, alignment) {
    const s = String(text);
    const diff = width - s.length;
    if (diff <= 0) return s;
    if (alignment === 'right') return ' '.repeat(diff) + s;
    if (alignment === 'center') {
      const left = Math.floor(diff / 2);
      return ' '.repeat(left) + s + ' '.repeat(diff - left);
    }
    return s + ' '.repeat(diff);
  }

  function getAlign(colIndex) {
    if (align[colIndex]) return align[colIndex];
    return 'left';
  }

  if (style === 'simple') return renderSimple(normalizedRows, colWidths, pad, header, getAlign);
  if (style === 'markdown') return renderMarkdown(normalizedRows, colWidths, pad, header, getAlign);
  if (style === 'compact') return renderCompact(normalizedRows, colWidths, pad, header, getAlign);

  const s = STYLES[style] || STYLES.unicode;
  return renderBoxed(normalizedRows, colWidths, pad, header, getAlign, s);
}

function renderBoxed(rows, colWidths, pad, header, getAlign, s) {
  const lines = [];
  const padding = pad;

  function hLine(left, mid, right, h) {
    const segments = colWidths.map(w => h.repeat(w + padding.length * 2));
    return left + segments.join(mid) + right;
  }

  function dataLine(row) {
    const cells = row.map((cell, i) => {
      const aligned = alignCell(String(cell), colWidths[i], getAlign(i));
      return padding + aligned + padding;
    });
    return s.v + cells.join(s.v) + s.v;
  }

  function alignCell(text, width, alignment) {
    const diff = width - text.length;
    if (diff <= 0) return text;
    if (alignment === 'right') return ' '.repeat(diff) + text;
    if (alignment === 'center') {
      const left = Math.floor(diff / 2);
      return ' '.repeat(left) + text + ' '.repeat(diff - left);
    }
    return text + ' '.repeat(diff);
  }

  lines.push(hLine(s.topLeft, s.teeDown, s.topRight, s.h));

  if (header && rows.length > 0) {
    lines.push(dataLine(rows[0]));
    lines.push(hLine(s.teeRight, s.cross, s.teeLeft, s.h));
    for (let i = 1; i < rows.length; i++) {
      lines.push(dataLine(rows[i]));
    }
  } else {
    for (const row of rows) {
      lines.push(dataLine(row));
    }
  }

  lines.push(hLine(s.bottomLeft, s.teeUp, s.bottomRight, s.h));
  return lines.join('\n');
}

function renderSimple(rows, colWidths, pad, header, getAlign) {
  const lines = [];

  function alignCell(text, width, alignment) {
    const diff = width - text.length;
    if (diff <= 0) return text;
    if (alignment === 'right') return ' '.repeat(diff) + text;
    if (alignment === 'center') {
      const left = Math.floor(diff / 2);
      return ' '.repeat(left) + text + ' '.repeat(diff - left);
    }
    return text + ' '.repeat(diff);
  }

  function dataLine(row) {
    return row.map((cell, i) => {
      return pad + alignCell(String(cell), colWidths[i], getAlign(i)) + pad;
    }).join('');
  }

  function sepLine() {
    return colWidths.map(w => pad + '-'.repeat(w) + pad).join('');
  }

  if (header && rows.length > 0) {
    lines.push(dataLine(rows[0]));
    lines.push(sepLine());
    for (let i = 1; i < rows.length; i++) {
      lines.push(dataLine(rows[i]));
    }
  } else {
    for (const row of rows) {
      lines.push(dataLine(row));
    }
  }

  return lines.join('\n');
}

function renderMarkdown(rows, colWidths, pad, header, getAlign) {
  const lines = [];

  function alignCell(text, width, alignment) {
    const diff = width - text.length;
    if (diff <= 0) return text;
    if (alignment === 'right') return ' '.repeat(diff) + text;
    if (alignment === 'center') {
      const left = Math.floor(diff / 2);
      return ' '.repeat(left) + text + ' '.repeat(diff - left);
    }
    return text + ' '.repeat(diff);
  }

  function dataLine(row) {
    const cells = row.map((cell, i) => {
      return ' ' + alignCell(String(cell), colWidths[i], getAlign(i)) + ' ';
    });
    return '|' + cells.join('|') + '|';
  }

  function sepLine() {
    const cells = colWidths.map((w, i) => {
      const a = getAlign(i);
      const dashes = '-'.repeat(w);
      if (a === 'center') return ':' + '-'.repeat(w) + ':';
      if (a === 'right') return '-'.repeat(w) + ':';
      return '-'.repeat(w + 1) + ' ';
    });
    return '|' + cells.join('|') + '|';
  }

  if (header && rows.length > 0) {
    lines.push(dataLine(rows[0]));
    lines.push(sepLine());
    for (let i = 1; i < rows.length; i++) {
      lines.push(dataLine(rows[i]));
    }
  } else {
    for (const row of rows) {
      lines.push(dataLine(row));
    }
  }

  return lines.join('\n');
}

function renderCompact(rows, colWidths, pad, header, getAlign) {
  const lines = [];

  function alignCell(text, width, alignment) {
    const diff = width - text.length;
    if (diff <= 0) return text;
    if (alignment === 'right') return ' '.repeat(diff) + text;
    if (alignment === 'center') {
      const left = Math.floor(diff / 2);
      return ' '.repeat(left) + text + ' '.repeat(diff - left);
    }
    return text + ' '.repeat(diff);
  }

  function dataLine(row) {
    return row.map((cell, i) => {
      return alignCell(String(cell), colWidths[i], getAlign(i));
    }).join('  ');
  }

  if (header && rows.length > 0) {
    lines.push(dataLine(rows[0]));
    lines.push(colWidths.map(w => '-'.repeat(w)).join('  '));
    for (let i = 1; i < rows.length; i++) {
      lines.push(dataLine(rows[i]));
    }
  } else {
    for (const row of rows) {
      lines.push(dataLine(row));
    }
  }

  return lines.join('\n');
}
