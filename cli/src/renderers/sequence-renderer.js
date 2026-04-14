// Sequence diagram renderer

export function renderSequence(actors, messages, options = {}) {
  const { width: customWidth } = options;

  // Parse messages
  const parsed = messages.map(parseMessage);

  // Calculate column width
  const maxLabel = Math.max(
    ...actors.map(a => a.length),
    ...parsed.map(m => (m.label || '').length + 4),
    20
  );
  const colWidth = customWidth || Math.max(maxLabel + 4, 24);
  const actorPositions = {};
  actors.forEach((a, i) => {
    actorPositions[a] = i;
  });

  const totalWidth = colWidth * actors.length;
  const lines = [];

  // Draw actor headers
  lines.push(drawActorHeaders(actors, colWidth));
  lines.push(drawLifelines(actors, colWidth));

  // Draw each message
  for (const msg of parsed) {
    if (msg.type === 'note') {
      lines.push(...drawNote(msg, actors, colWidth, actorPositions));
    } else if (msg.from === msg.to) {
      lines.push(...drawSelfCall(msg, actors, colWidth, actorPositions));
    } else {
      lines.push(...drawArrow(msg, actors, colWidth, actorPositions));
    }
    lines.push(drawLifelines(actors, colWidth));
  }

  // Draw actor footers
  lines.push(drawActorHeaders(actors, colWidth));

  return lines.join('\n');
}

function parseMessage(msg) {
  // note@Actor:text
  const noteMatch = msg.match(/^note@(\w+):(.+)$/);
  if (noteMatch) {
    return { type: 'note', actor: noteMatch[1], label: noteMatch[2].trim() };
  }

  // A-->B:label (dashed)
  const dashedMatch = msg.match(/^(.+?)-->(.+?):(.+)$/);
  if (dashedMatch) {
    return { type: 'dashed', from: dashedMatch[1].trim(), to: dashedMatch[2].trim(), label: dashedMatch[3].trim() };
  }

  // A->B:label (solid)
  const solidMatch = msg.match(/^(.+?)->(.+?):(.+)$/);
  if (solidMatch) {
    return { type: 'solid', from: solidMatch[1].trim(), to: solidMatch[2].trim(), label: solidMatch[3].trim() };
  }

  return { type: 'solid', from: '', to: '', label: msg };
}

function centerText(text, width) {
  const pad = width - text.length;
  if (pad <= 0) return text.substring(0, width);
  const left = Math.floor(pad / 2);
  return ' '.repeat(left) + text + ' '.repeat(pad - left);
}

function drawActorHeaders(actors, colWidth) {
  return actors.map(a => {
    const boxWidth = Math.min(a.length + 4, colWidth);
    const padded = centerText(a, boxWidth - 4);
    const box = '┌' + '─'.repeat(boxWidth - 2) + '┐';
    const mid = '│ ' + padded + ' │';
    const bot = '└' + '─'.repeat(boxWidth - 2) + '┘';
    return centerText(mid, colWidth);
  }).join('');
}

function drawLifelines(actors, colWidth) {
  return actors.map((_, i) => {
    return centerText('│', colWidth);
  }).join('');
}

function drawArrow(msg, actors, colWidth, positions) {
  const fromPos = positions[msg.from];
  const toPos = positions[msg.to];
  if (fromPos === undefined || toPos === undefined) {
    return [drawLifelines(actors, colWidth)];
  }

  const lines = [];
  const leftToRight = fromPos < toPos;
  const startCol = Math.min(fromPos, toPos);
  const endCol = Math.max(fromPos, toPos);
  const span = endCol - startCol;

  // Label line
  const labelLine = actors.map((_, i) => {
    if (i === Math.min(fromPos, toPos)) {
      const label = msg.label || '';
      const arrowSpace = colWidth * span;
      const centered = centerText(label, arrowSpace);
      return centerText('│', colWidth).substring(0, Math.floor(colWidth / 2)) +
        centered.substring(Math.floor(colWidth / 2));
    }
    if (i > startCol && i <= endCol) return '';
    return centerText('│', colWidth);
  }).filter(s => s !== undefined);

  // Build the label line properly
  const labelLineStr = buildLabelLine(msg, actors, colWidth, positions);
  lines.push(labelLineStr);

  // Arrow line
  const arrowLineStr = buildArrowLine(msg, actors, colWidth, positions);
  lines.push(arrowLineStr);

  return lines;
}

function buildLabelLine(msg, actors, colWidth, positions) {
  const fromPos = positions[msg.from];
  const toPos = positions[msg.to];
  const total = actors.length * colWidth;
  const chars = new Array(total).fill(' ');

  // Draw lifelines
  for (let i = 0; i < actors.length; i++) {
    const center = i * colWidth + Math.floor(colWidth / 2);
    if (center < total) chars[center] = '│';
  }

  // Place label between from and to
  const fromCenter = fromPos * colWidth + Math.floor(colWidth / 2);
  const toCenter = toPos * colWidth + Math.floor(colWidth / 2);
  const midPoint = Math.floor((fromCenter + toCenter) / 2);
  const label = msg.label || '';
  const labelStart = midPoint - Math.floor(label.length / 2);
  for (let i = 0; i < label.length; i++) {
    const pos = labelStart + i;
    if (pos >= 0 && pos < total) chars[pos] = label[i];
  }

  return chars.join('');
}

function buildArrowLine(msg, actors, colWidth, positions) {
  const fromPos = positions[msg.from];
  const toPos = positions[msg.to];
  const total = actors.length * colWidth;
  const chars = new Array(total).fill(' ');
  const isDashed = msg.type === 'dashed';

  // Draw lifelines for actors not in the arrow path
  for (let i = 0; i < actors.length; i++) {
    const center = i * colWidth + Math.floor(colWidth / 2);
    if (center < total) chars[center] = '│';
  }

  const fromCenter = fromPos * colWidth + Math.floor(colWidth / 2);
  const toCenter = toPos * colWidth + Math.floor(colWidth / 2);
  const leftPos = Math.min(fromCenter, toCenter);
  const rightPos = Math.max(fromCenter, toCenter);

  // Draw arrow line
  if (isDashed) {
    for (let i = leftPos; i <= rightPos; i++) {
      chars[i] = (i % 2 === leftPos % 2) ? '─' : ' ';
    }
  } else {
    for (let i = leftPos; i <= rightPos; i++) {
      chars[i] = '─';
    }
  }

  // Arrow head
  if (fromPos < toPos) {
    chars[toCenter] = '>';
    chars[fromCenter] = isDashed ? '─' : '─';
  } else {
    chars[toCenter] = '<';
    chars[fromCenter] = isDashed ? '─' : '─';
  }

  return chars.join('');
}

function drawSelfCall(msg, actors, colWidth, positions) {
  const pos = positions[msg.from];
  const total = actors.length * colWidth;
  const center = pos * colWidth + Math.floor(colWidth / 2);
  const lines = [];

  // Line 1: ──┐ with label
  const line1 = new Array(total).fill(' ');
  for (let i = 0; i < actors.length; i++) {
    const c = i * colWidth + Math.floor(colWidth / 2);
    if (c < total) line1[c] = '│';
  }
  const label = msg.label || '';
  line1[center] = '─';
  line1[center + 1] = '─';
  const loopEnd = center + 6;
  for (let i = center; i <= Math.min(loopEnd, total - 1); i++) {
    line1[i] = '─';
  }
  if (loopEnd < total) line1[loopEnd] = '┐';
  // Place label
  const labelStart = loopEnd + 2;
  for (let i = 0; i < label.length && labelStart + i < total; i++) {
    line1[labelStart + i] = label[i];
  }
  lines.push(line1.join(''));

  // Line 2: │
  const line2 = new Array(total).fill(' ');
  for (let i = 0; i < actors.length; i++) {
    const c = i * colWidth + Math.floor(colWidth / 2);
    if (c < total) line2[c] = '│';
  }
  if (loopEnd < total) line2[loopEnd] = '│';
  lines.push(line2.join(''));

  // Line 3: <──┘
  const line3 = new Array(total).fill(' ');
  for (let i = 0; i < actors.length; i++) {
    const c = i * colWidth + Math.floor(colWidth / 2);
    if (c < total) line3[c] = '│';
  }
  line3[center] = '<';
  for (let i = center + 1; i <= Math.min(loopEnd - 1, total - 1); i++) {
    line3[i] = '─';
  }
  if (loopEnd < total) line3[loopEnd] = '┘';
  lines.push(line3.join(''));

  return lines;
}

function drawNote(msg, actors, colWidth, positions) {
  const pos = positions[msg.actor];
  if (pos === undefined) return [drawLifelines(actors, colWidth)];

  const total = actors.length * colWidth;
  const center = pos * colWidth + Math.floor(colWidth / 2);
  const label = msg.label || '';
  const boxWidth = label.length + 4;
  const boxStart = center - Math.floor(boxWidth / 2);

  const lines = [];

  function makeNoteLine(content) {
    const line = new Array(total).fill(' ');
    for (let i = 0; i < actors.length; i++) {
      const c = i * colWidth + Math.floor(colWidth / 2);
      if (c < total) line[c] = '│';
    }
    for (let i = 0; i < content.length; i++) {
      const p = boxStart + i;
      if (p >= 0 && p < total) line[p] = content[i];
    }
    return line.join('');
  }

  lines.push(makeNoteLine('┌' + '─'.repeat(boxWidth - 2) + '┐'));
  lines.push(makeNoteLine('│ ' + label + ' │'));
  lines.push(makeNoteLine('└' + '─'.repeat(boxWidth - 2) + '┘'));

  return lines;
}
