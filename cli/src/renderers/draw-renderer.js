// Draw renderer — quick shape drawing

const HR_CHARS = {
  single: '─',
  double: '═',
  bold: '━',
  dashed: '╌',
  wave: '~',
  dot: '·',
};

export function renderDraw(options = {}) {
  const { shape } = options;

  switch (shape) {
    case 'box':
      return drawBox(options);
    case 'diamond':
      return drawDiamond(options);
    case 'tree':
      return drawTree(options);
    case 'hr':
      return drawHr(options);
    case 'arrow':
      return drawArrowShape(options);
    case 'brace':
      return drawBrace(options);
    case 'circle':
      return drawCircle(options);
    case 'star':
      return drawStar(options);
    default:
      return `Unknown shape: ${shape}. Available: box, diamond, tree, hr, arrow, brace, circle, star`;
  }
}

function drawBox(options) {
  const { width = 30, height = 5, text = '', style = 'single' } = options;

  const STYLES = {
    single:  { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
    double:  { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
    bold:    { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
    ascii:   { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' },
  };

  const chars = STYLES[style] || STYLES.single;
  const innerW = width - 2;
  const lines = [];

  lines.push(chars.tl + chars.h.repeat(innerW) + chars.tr);

  const totalInnerRows = height - 2;
  const textRow = Math.floor(totalInnerRows / 2);

  for (let i = 0; i < totalInnerRows; i++) {
    if (i === textRow && text) {
      const pad = Math.max(0, Math.floor((innerW - text.length) / 2));
      const rightPad = Math.max(0, innerW - text.length - pad);
      lines.push(chars.v + ' '.repeat(pad) + text + ' '.repeat(rightPad) + chars.v);
    } else {
      lines.push(chars.v + ' '.repeat(innerW) + chars.v);
    }
  }

  lines.push(chars.bl + chars.h.repeat(innerW) + chars.br);
  return lines.join('\n');
}

function drawDiamond(options) {
  const { size = 4, text = '' } = options;
  const s = typeof size === 'string' ? parseInt(size) : size;
  const lines = [];

  // Top half
  for (let i = 0; i < s; i++) {
    const pad = s - i - 1;
    const inner = 2 * i;
    if (inner === 0) {
      lines.push(' '.repeat(pad + s) + '/\\');
    } else {
      const content = ' '.repeat(inner);
      lines.push(' '.repeat(pad + s - i) + '/' + content + '\\');
    }
  }

  // Middle row with text
  const midInner = 2 * s - 1;
  if (text) {
    const textPad = Math.max(0, Math.floor((midInner - text.length) / 2));
    const rightPad = Math.max(0, midInner - text.length - textPad);
    lines.push('/' + ' '.repeat(textPad) + text + ' '.repeat(rightPad) + '\\');
  } else {
    lines.push('/' + ' '.repeat(midInner) + '\\');
  }

  // Bottom half
  for (let i = s - 1; i >= 0; i--) {
    const pad = s - i - 1;
    const inner = 2 * i;
    if (inner === 0) {
      lines.push(' '.repeat(pad + s) + '\\/');
    } else {
      const content = ' '.repeat(inner);
      lines.push(' '.repeat(pad + s - i) + '\\' + content + '/');
    }
  }

  return lines.join('\n');
}

function drawTree(options) {
  const { data = '' } = options;
  if (!data) return 'Error: --data required for tree shape';

  const items = data.split(';').map(s => s.trim()).filter(Boolean);
  if (items.length === 0) return 'Error: No tree data provided';

  let rootName = '';
  const topLevel = [];
  const childMap = {};

  for (const item of items) {
    if (item.includes('>')) {
      const parts = item.split('>').map(s => s.trim());
      if (!childMap[parts[0]]) childMap[parts[0]] = [];
      childMap[parts[0]].push(parts[1]);
    } else if (!rootName) {
      rootName = item;
    } else {
      topLevel.push(item);
    }
  }

  rootName = rootName || 'Root';

  function getChildren(name) {
    const children = [];
    if (name === rootName) {
      for (const t of topLevel) children.push(t);
    }
    if (childMap[name]) {
      for (const c of childMap[name]) {
        if (!children.includes(c)) children.push(c);
      }
    }
    return children;
  }

  const lines = [rootName];

  function renderNode(name, prefix) {
    const children = getChildren(name);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const isLast = i === children.length - 1;
      lines.push(prefix + (isLast ? '└── ' : '├── ') + child);
      renderNode(child, prefix + (isLast ? '    ' : '│   '));
    }
  }

  renderNode(rootName, '');
  return lines.join('\n');
}

function drawHr(options) {
  const { length = 40, style = 'single', text = '', label = '' } = options;
  const displayText = text || label;
  const ch = HR_CHARS[style] || HR_CHARS.single;

  if (displayText) {
    const textStr = ` ${displayText} `;
    const remaining = length - textStr.length;
    const leftLen = Math.max(1, Math.floor(remaining / 2));
    const rightLen = Math.max(1, remaining - leftLen);
    return ch.repeat(leftLen) + textStr + ch.repeat(rightLen);
  }

  return ch.repeat(length);
}

function drawArrowShape(options) {
  const { direction = 'right', length = 30, label = '', text = '' } = options;
  const displayLabel = label || text;
  const lineLen = length - 1; // leave room for arrowhead

  if (direction === 'right') {
    if (displayLabel) {
      const remaining = lineLen - displayLabel.length - 2;
      const leftLen = Math.max(1, Math.floor(remaining / 2));
      const rightLen = Math.max(1, remaining - leftLen);
      return '─'.repeat(leftLen) + ' ' + displayLabel + ' ' + '─'.repeat(rightLen) + '>';
    }
    return '─'.repeat(lineLen) + '>';
  }

  if (direction === 'left') {
    if (displayLabel) {
      const remaining = lineLen - displayLabel.length - 2;
      const leftLen = Math.max(1, Math.floor(remaining / 2));
      const rightLen = Math.max(1, remaining - leftLen);
      return '<' + '─'.repeat(leftLen) + ' ' + displayLabel + ' ' + '─'.repeat(rightLen);
    }
    return '<' + '─'.repeat(lineLen);
  }

  if (direction === 'up') {
    const lines = ['^'];
    for (let i = 0; i < lineLen; i++) {
      if (displayLabel && i === Math.floor(lineLen / 2)) {
        lines.push('│ ' + displayLabel);
      } else {
        lines.push('│');
      }
    }
    return lines.join('\n');
  }

  if (direction === 'down') {
    const lines = [];
    for (let i = 0; i < lineLen; i++) {
      if (displayLabel && i === Math.floor(lineLen / 2)) {
        lines.push('│ ' + displayLabel);
      } else {
        lines.push('│');
      }
    }
    lines.push('v');
    return lines.join('\n');
  }

  return '─'.repeat(lineLen) + '>';
}

function drawBrace(options) {
  const { direction = 'right', height = 5, label = '', text = '' } = options;
  const displayLabel = label || text;
  const h = Math.max(3, height);
  const midRow = Math.floor(h / 2);
  const lines = [];

  if (direction === 'left') {
    for (let i = 0; i < h; i++) {
      if (i === 0) lines.push('⎫');
      else if (i === midRow) lines.push(displayLabel ? '⎬ ' + displayLabel : '⎬');
      else if (i === h - 1) lines.push('⎭');
      else lines.push('⎪');
    }
  } else {
    // right (default)
    for (let i = 0; i < h; i++) {
      if (i === 0) lines.push('⎧');
      else if (i === midRow) lines.push(displayLabel ? '⎨ ' + displayLabel : '⎨');
      else if (i === h - 1) lines.push('⎩');
      else lines.push('⎪');
    }
  }

  return lines.join('\n');
}

function drawCircle(options) {
  const { radius = 4 } = options;
  const r = typeof radius === 'string' ? parseInt(radius) : radius;
  const diameter = 2 * r + 1;
  const lines = [];

  for (let y = 0; y < diameter; y++) {
    let row = '';
    for (let x = 0; x < diameter * 2; x++) {
      const dx = (x / 2) - r;
      const dy = y - r;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (Math.abs(dist - r) < 0.5) {
        row += '*';
      } else {
        row += ' ';
      }
    }
    lines.push(row);
  }

  // Trim trailing whitespace on each line
  return lines.map(l => l.trimEnd()).join('\n');
}

function drawStar(options) {
  const { size = 'medium' } = options;

  if (size === 'small' || size === '1') {
    return [
      '  *  ',
      ' *** ',
      '*****',
      ' * * ',
      '** **',
    ].join('\n');
  }

  if (size === 'large' || size === '3') {
    return [
      '        *        ',
      '       ***       ',
      '      *****      ',
      ' ****************',
      '  **************',
      '   ************  ',
      '    **********   ',
      '   ****  ****    ',
      '  ****    ****   ',
      ' ****      ****  ',
      '****        **** ',
    ].join('\n');
  }

  // medium (default)
  return [
    '    *    ',
    '   ***   ',
    '  *****  ',
    '*********',
    ' ***  ** ',
    ' **   ** ',
    '**     **',
  ].join('\n');
}
