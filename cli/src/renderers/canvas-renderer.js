// Canvas renderer — 2D character grid with drawable elements

const STYLES = {
  single:  { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double:  { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  bold:    { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  ascii:   { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' },
};

export function renderCanvas(options = {}) {
  const { width = 80, height = 24, elements = [], bg = ' ' } = options;

  // Create grid
  const grid = Array.from({ length: height }, () => Array(width).fill(bg));

  // Helper to safely set a character
  function set(x, y, ch) {
    if (y >= 0 && y < height && x >= 0 && x < width) grid[y][x] = ch;
  }

  for (const el of elements) {
    switch (el.type) {
      case 'box':
        drawBox(el);
        break;
      case 'text':
        drawText(el);
        break;
      case 'line':
        drawLine(el);
        break;
      case 'arrow':
        drawArrow(el);
        break;
      case 'fill':
        drawFill(el);
        break;
    }
  }

  function drawBox(el) {
    const chars = STYLES[el.style] || STYLES.single;
    const bx = el.x;
    const by = el.y;
    const bw = el.width;
    const bh = el.height;

    // Top border
    set(bx, by, chars.tl);
    set(bx + bw - 1, by, chars.tr);
    for (let i = 1; i < bw - 1; i++) {
      set(bx + i, by, chars.h);
    }

    // Insert title into top border
    if (el.title) {
      const titleStr = ` ${el.title} `;
      const startX = bx + 1 + Math.floor(((bw - 2) - titleStr.length) / 2);
      for (let i = 0; i < titleStr.length; i++) {
        set(startX + i, by, titleStr[i]);
      }
    }

    // Bottom border
    set(bx, by + bh - 1, chars.bl);
    set(bx + bw - 1, by + bh - 1, chars.br);
    for (let i = 1; i < bw - 1; i++) {
      set(bx + i, by + bh - 1, chars.h);
    }

    // Side borders
    for (let j = 1; j < bh - 1; j++) {
      set(bx, by + j, chars.v);
      set(bx + bw - 1, by + j, chars.v);
    }
  }

  function drawText(el) {
    const str = el.text || '';
    for (let i = 0; i < str.length; i++) {
      set(el.x + i, el.y, str[i]);
    }
  }

  function drawLine(el) {
    const { x1, y1, x2, y2 } = el;
    if (y1 === y2) {
      // Horizontal line
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x++) {
        set(x, y1, '─');
      }
    } else if (x1 === x2) {
      // Vertical line
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y <= maxY; y++) {
        set(x1, y, '│');
      }
    } else {
      // Diagonal line
      drawDiagonal(x1, y1, x2, y2);
    }
  }

  function drawDiagonal(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const ch = (dx > 0 && dy > 0) || (dx < 0 && dy < 0) ? '\\' : '/';
    for (let i = 0; i <= steps; i++) {
      const x = Math.round(x1 + (dx * i) / steps);
      const y = Math.round(y1 + (dy * i) / steps);
      set(x, y, ch);
    }
  }

  function drawArrow(el) {
    const { x1, y1, x2, y2 } = el;

    // Draw line portion (all but endpoint)
    if (y1 === y2) {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x < maxX; x++) {
        set(x, y1, '─');
      }
    } else if (x1 === x2) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y < maxY; y++) {
        set(x1, y, '│');
      }
    } else {
      drawDiagonal(x1, y1, x2, y2);
    }

    // Arrowhead at (x2, y2)
    let arrowChar;
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.abs(dx) >= Math.abs(dy)) {
      arrowChar = dx > 0 ? '>' : '<';
    } else {
      arrowChar = dy > 0 ? 'v' : '^';
    }
    set(x2, y2, arrowChar);
  }

  function drawFill(el) {
    const ch = el.char || ' ';
    for (let y = el.y; y < el.y + el.height; y++) {
      for (let x = el.x; x < el.x + el.width; x++) {
        set(x, y, ch);
      }
    }
  }

  // Convert grid to string, trim trailing empty lines
  const lines = grid.map(row => row.join(''));
  let lastNonEmpty = lines.length - 1;
  while (lastNonEmpty >= 0 && lines[lastNonEmpty].trim() === '') {
    lastNonEmpty--;
  }
  return lines.slice(0, lastNonEmpty + 1).join('\n');
}
