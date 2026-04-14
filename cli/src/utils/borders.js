// Border character sets for different styles

export const borderSets = {
  unicode: {
    topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘',
    horizontal: '─', vertical: '│',
    teeDown: '┬', teeUp: '┴', teeRight: '├', teeLeft: '┤',
    cross: '┼',
  },
  ascii: {
    topLeft: '+', topRight: '+', bottomLeft: '+', bottomRight: '+',
    horizontal: '-', vertical: '|',
    teeDown: '+', teeUp: '+', teeRight: '+', teeLeft: '+',
    cross: '+',
  },
  double: {
    topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝',
    horizontal: '═', vertical: '║',
    teeDown: '╦', teeUp: '╩', teeRight: '╠', teeLeft: '╣',
    cross: '╬',
  },
  rounded: {
    topLeft: '╭', topRight: '╮', bottomLeft: '╰', bottomRight: '╯',
    horizontal: '─', vertical: '│',
    teeDown: '┬', teeUp: '┴', teeRight: '├', teeLeft: '┤',
    cross: '┼',
  },
};

export function horizontalLine(b, width) {
  return b.topLeft + b.horizontal.repeat(width - 2) + b.topRight;
}

export function bottomLine(b, width) {
  return b.bottomLeft + b.horizontal.repeat(width - 2) + b.bottomRight;
}

export function middleLine(b, width) {
  return b.teeRight + b.horizontal.repeat(width - 2) + b.teeLeft;
}

export function contentLine(b, content, width) {
  const visLen = stripAnsi(content).length;
  const pad = width - 2 - visLen;
  return b.vertical + content + ' '.repeat(Math.max(0, pad)) + b.vertical;
}

function stripAnsi(s) {
  return s;
}

export function boxContent(b, lines, width) {
  const out = [];
  out.push(horizontalLine(b, width));
  for (const line of lines) {
    out.push(contentLine(b, line, width));
  }
  out.push(bottomLine(b, width));
  return out;
}
