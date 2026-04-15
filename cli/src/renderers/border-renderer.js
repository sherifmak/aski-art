// Border renderer — wrap content in a styled border box

const STYLES = {
  single:  { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double:  { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  bold:    { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  ascii:   { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' },
};

export function renderBorder(content, options = {}) {
  const {
    style = 'single',
    title = '',
    padding = 1,
    width = 0,
    align = 'left',
  } = options;

  const chars = STYLES[style] || STYLES.single;
  const lines = content.split('\n');
  const maxLineWidth = Math.max(...lines.map(l => l.length));
  const innerWidth = width > 0 ? width - 2 : maxLineWidth + 2 * padding;

  // Top border
  let topBar;
  if (title) {
    const titleStr = ` ${title} `;
    const remaining = innerWidth - titleStr.length;
    const leftH = Math.max(1, Math.floor(remaining / 2));
    const rightH = Math.max(0, remaining - leftH);
    topBar = chars.tl + chars.h.repeat(leftH) + titleStr + chars.h.repeat(rightH) + chars.tr;
  } else {
    topBar = chars.tl + chars.h.repeat(innerWidth) + chars.tr;
  }

  // Bottom border
  const bottomBar = chars.bl + chars.h.repeat(innerWidth) + chars.br;

  // Padding rows
  const padRow = chars.v + ' '.repeat(innerWidth) + chars.v;
  const padRows = Array(padding).fill(padRow);

  // Content rows
  const pad = ' '.repeat(padding);
  const contentWidth = innerWidth - 2 * padding;
  const contentRows = lines.map(line => {
    let aligned;
    if (align === 'center') {
      const leftPad = Math.floor((contentWidth - line.length) / 2);
      const rightPad = contentWidth - line.length - leftPad;
      aligned = ' '.repeat(Math.max(0, leftPad)) + line + ' '.repeat(Math.max(0, rightPad));
    } else if (align === 'right') {
      aligned = line.padStart(contentWidth);
    } else {
      aligned = line.padEnd(contentWidth);
    }
    return chars.v + pad + aligned + pad + chars.v;
  });

  return [
    topBar,
    ...padRows,
    ...contentRows,
    ...padRows,
    bottomBar,
  ].join('\n');
}
