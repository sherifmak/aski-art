// TUI-style dashboard interface renderer

import { borderSets } from '../utils/borders.js';

export function renderInterface(components, options = {}) {
  const {
    width = 60,
    border = 'unicode',
  } = options;

  const b = borderSets[border] || borderSets.unicode;
  const innerWidth = width - 2;
  const lines = [];

  lines.push(b.topLeft + b.horizontal.repeat(innerWidth) + b.topRight);

  for (let ci = 0; ci < components.length; ci++) {
    const comp = components[ci];
    if (comp.type === 'divider') {
      lines.push(b.teeRight + b.horizontal.repeat(innerWidth) + b.teeLeft);
      continue;
    }
    const rendered = renderComponent(comp, innerWidth, b);
    for (const line of rendered) {
      lines.push(b.vertical + padRight(line, innerWidth) + b.vertical);
    }
  }

  lines.push(b.bottomLeft + b.horizontal.repeat(innerWidth) + b.bottomRight);
  return lines.join('\n');
}

function renderComponent(comp, width, b) {
  switch (comp.type) {
    case 'header': return renderHeader(comp, width);
    case 'divider': return renderDivider(comp, width, b);
    case 'progress': return renderProgress(comp, width);
    case 'kvlist': return renderKVList(comp, width);
    case 'statuslist': return renderStatusList(comp, width);
    case 'text': return renderTextBlock(comp, width);
    case 'badge': return renderBadge(comp, width);
    default: return ['  Unknown component: ' + comp.type];
  }
}

function renderHeader(comp, width) {
  const text = comp.text || 'HEADER';
  const centered = centerText(text, width);
  return ['', centered, ''];
}

function renderDivider(comp, width, b) {
  // Return a special marker — the parent will draw the divider
  return [b.horizontal.repeat(width)];
}

function renderProgress(comp, width) {
  const label = comp.label || 'Progress';
  const value = parseInt(comp.value) || 0;
  const max = parseInt(comp.max) || 100;
  const pct = Math.round((value / max) * 100);

  const labelPart = `  ${label}: `;
  const pctPart = `  ${pct}%`;
  const barWidth = width - labelPart.length - pctPart.length - 2;
  const filled = Math.round((value / max) * barWidth);

  const bar = '█'.repeat(filled) + '░'.repeat(Math.max(0, barWidth - filled));
  return [labelPart + bar + pctPart];
}

function renderKVList(comp, width) {
  const items = parseItems(comp.items || '');
  if (items.length === 0) return [];

  const maxKeyLen = Math.max(...items.map(([k]) => k.length));
  const lines = [];
  for (const [key, val] of items) {
    lines.push(`  ${key}:${' '.repeat(maxKeyLen - key.length)}  ${val}`);
  }
  return lines;
}

function renderStatusList(comp, width) {
  const raw = comp.items || '';
  const items = raw.split(';').filter(s => s.trim());
  return items.map(item => `  ${item.trim()}`);
}

function renderTextBlock(comp, width) {
  const content = comp.content || '';
  const words = content.split(' ');
  const lines = [];
  let current = '  ';
  for (const word of words) {
    if (current.length + word.length + 1 > width - 2) {
      lines.push(current);
      current = '  ' + word;
    } else {
      current += (current.length > 2 ? ' ' : '') + word;
    }
  }
  if (current.trim()) lines.push(current);
  return lines;
}

function renderBadge(comp, width) {
  const text = comp.text || 'OK';
  const style = comp.style || 'info';
  let badge;
  switch (style) {
    case 'success': badge = `[${text}]`; break;
    case 'warn': case 'warning': badge = `[${text}]`; break;
    case 'fail': case 'error': badge = `[${text}]`; break;
    default: badge = `[${text}]`;
  }
  return [`  ${badge}`];
}

function parseItems(str) {
  return str.split(';')
    .filter(s => s.trim())
    .map(pair => {
      const sep = pair.indexOf('|');
      if (sep === -1) return [pair.trim(), ''];
      return [pair.substring(0, sep).trim(), pair.substring(sep + 1).trim()];
    });
}

function centerText(text, width) {
  const pad = width - text.length;
  if (pad <= 0) return text;
  const left = Math.floor(pad / 2);
  return ' '.repeat(left) + text + ' '.repeat(pad - left);
}

function padRight(text, width) {
  if (text.length >= width) return text.substring(0, width);
  return text + ' '.repeat(width - text.length);
}

// Built-in templates
export function getTemplate(name, width = 60) {
  switch (name) {
    case 'server-status': return serverStatusTemplate(width);
    case 'deploy-log': return deployLogTemplate(width);
    case 'migration': return migrationTemplate(width);
    case 'api-response': return apiResponseTemplate(width);
    default: return null;
  }
}

function serverStatusTemplate(width) {
  return [
    { type: 'header', text: 'SERVER STATUS' },
    { type: 'divider' },
    { type: 'progress', label: 'CPU   ', value: '22', max: '100' },
    { type: 'progress', label: 'Memory', value: '42', max: '100' },
    { type: 'progress', label: 'Disk  ', value: '67', max: '100' },
    { type: 'divider' },
    { type: 'kvlist', items: 'Hostname|prod-web-01;Uptime|14d 6h 32m;Load|0.42 / 0.38 / 0.35;IP|10.0.1.42' },
    { type: 'divider' },
    { type: 'header', text: 'Services' },
    { type: 'statuslist', items: '● nginx          Running;● postgres       Running;● redis          Running;○ worker-3       Stopped' },
  ];
}

function deployLogTemplate(width) {
  return [
    { type: 'header', text: 'DEPLOY LOG' },
    { type: 'divider' },
    { type: 'kvlist', items: 'Branch|main;Commit|a3f8c21;Author|deploy-bot;Time|2024-01-15 14:32:01' },
    { type: 'divider' },
    { type: 'statuslist', items: '✓ Build completed;✓ Tests passed (142/142);✓ Image pushed to registry;✓ Rolling update started;● Waiting for health checks;○ DNS update pending' },
    { type: 'divider' },
    { type: 'progress', label: 'Deploy', value: '68', max: '100' },
  ];
}

function migrationTemplate(width) {
  return [
    { type: 'header', text: 'DATABASE MIGRATION' },
    { type: 'divider' },
    { type: 'kvlist', items: 'Database|production;Version|from v42 to v43;Started|2024-01-15 14:30:00' },
    { type: 'divider' },
    { type: 'statuslist', items: '✓ Backup completed;✓ Schema validated;✓ Migration 001_add_users_table;✓ Migration 002_add_indexes;● Migration 003_data_backfill;○ Migration 004_cleanup' },
    { type: 'divider' },
    { type: 'progress', label: 'Progress', value: '60', max: '100' },
  ];
}

function apiResponseTemplate(width) {
  return [
    { type: 'header', text: 'API RESPONSE' },
    { type: 'divider' },
    { type: 'kvlist', items: 'Status|200 OK;Method|GET;URL|/api/v1/users;Time|142ms;Size|2.4 KB' },
    { type: 'divider' },
    { type: 'header', text: 'Headers' },
    { type: 'kvlist', items: 'Content-Type|application/json;Cache-Control|max-age=3600;X-Request-Id|abc-123-def' },
    { type: 'divider' },
    { type: 'text', content: '{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}],"total":2,"page":1}' },
  ];
}
