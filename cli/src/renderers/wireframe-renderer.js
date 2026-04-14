// ASCII wireframe renderer

import { borderSets } from '../utils/borders.js';

export function renderWireframe(components, options = {}) {
  const { width = 60 } = options;
  const b = borderSets.unicode;
  const innerWidth = width - 2;
  const lines = [];

  for (const comp of components) {
    const rendered = renderComponent(comp, innerWidth, b, width);
    lines.push(...rendered);
  }

  // Add spacer and bottom border
  lines.push(b.vertical + ' '.repeat(innerWidth) + b.vertical);
  lines.push(b.bottomLeft + b.horizontal.repeat(innerWidth) + b.bottomRight);

  return lines.join('\n');
}

function renderComponent(comp, innerWidth, b, totalWidth) {
  switch (comp.type) {
    case 'navbar': return renderNavbar(comp, totalWidth, b);
    case 'card': return renderCard(comp, totalWidth, b);
    case 'input': return renderInput(comp, totalWidth, b);
    case 'button': return renderButton(comp, totalWidth, b);
    case 'checkbox': return renderCheckbox(comp, totalWidth);
    case 'text': return renderText(comp, totalWidth);
    case 'spacer': return [''];
    default: return [];
  }
}

function renderNavbar(comp, width, b) {
  const title = comp.title || 'App';
  const inner = width - 2;
  const nav = `  ${'\u2630'}  ${title}`;
  const right = '\uD83D\uDD14   ';
  const mid = ' '.repeat(Math.max(0, inner - nav.length - right.length));

  return [
    b.topLeft + b.horizontal.repeat(inner) + b.topRight,
    b.vertical + nav + mid + right + b.vertical,
    b.teeRight + b.horizontal.repeat(inner) + b.teeLeft,
  ];
}

function renderCard(comp, width, b) {
  const title = comp.title || '';
  const inner = width - 2;
  const lines = [];

  // Card is inset
  const margin = 9;
  const cardWidth = inner - margin * 2;
  if (cardWidth < 10) return ['  Card too narrow'];

  const cb = borderSets.unicode;

  function cardLine(content) {
    const padded = content + ' '.repeat(Math.max(0, cardWidth - 2 - content.length));
    const cardStr = cb.vertical + padded + cb.vertical;
    const outerPad = Math.max(0, inner - margin - cardStr.length);
    return b.vertical + ' '.repeat(margin) + cardStr + ' '.repeat(outerPad) + b.vertical;
  }

  // Card top
  const cardTop = cb.topLeft + cb.horizontal.repeat(cardWidth - 2) + cb.topRight;
  lines.push(b.vertical + ' '.repeat(margin) + cardTop + ' '.repeat(Math.max(0, inner - margin - cardTop.length)) + b.vertical);

  if (title) {
    // Title
    const titleCentered = centerText(title, cardWidth - 2);
    lines.push(cardLine(titleCentered));

    // Title separator
    const sep = cb.teeRight + cb.horizontal.repeat(cardWidth - 2) + cb.teeLeft;
    lines.push(b.vertical + ' '.repeat(margin) + sep + ' '.repeat(Math.max(0, inner - margin - sep.length)) + b.vertical);
  }

  // Empty line
  lines.push(cardLine(''));

  // Render children
  const children = comp.children || [];
  for (const child of children) {
    const childLines = renderCardChild(child, cardWidth - 4);
    for (const cl of childLines) {
      lines.push(cardLine(cl));
    }
    lines.push(cardLine(''));
  }

  // Card bottom
  const cardBot = cb.bottomLeft + cb.horizontal.repeat(cardWidth - 2) + cb.bottomRight;
  lines.push(b.vertical + ' '.repeat(margin) + cardBot + ' '.repeat(Math.max(0, inner - margin - cardBot.length)) + b.vertical);

  return lines;
}

function renderCardChild(child, width) {
  switch (child.type) {
    case 'input': {
      const ph = child.placeholder || '';
      const inputBox = '[' + ' '.repeat(Math.max(0, width - 4)) + ']';
      return ['  ' + ph, '  ' + inputBox];
    }
    case 'button': {
      const text = child.text || 'Button';
      const btnWidth = width - 2;
      const eqCount = Math.floor((btnWidth - text.length - 2) / 2);
      const btn = '[' + '═'.repeat(eqCount) + ' ' + text + ' ' + '═'.repeat(btnWidth - text.length - 2 - eqCount) + ']';
      return ['  ' + btn];
    }
    case 'checkbox': {
      const text = child.text || child.label || '';
      return ['  [ ] ' + text];
    }
    case 'text': {
      return ['  ' + (child.content || child.text || '')];
    }
    case 'link': {
      return ['  ' + (child.text || child.content || '')];
    }
    default: return [];
  }
}

function renderInput(comp, width, b) {
  const ph = comp.placeholder || '';
  const inner = width - 2;
  const inputBox = '  [' + ' '.repeat(Math.max(0, inner - 6)) + ']';
  return [
    b.vertical + '  ' + ph + ' '.repeat(Math.max(0, inner - ph.length - 2)) + b.vertical,
    b.vertical + inputBox + ' '.repeat(Math.max(0, inner - inputBox.length)) + b.vertical,
  ];
}

function renderButton(comp, width, b) {
  const text = comp.text || 'Button';
  const inner = width - 2;
  const btnWidth = Math.min(inner - 4, text.length + 12);
  const eqCount = Math.floor((btnWidth - text.length - 2) / 2);
  const btn = '[' + '═'.repeat(eqCount) + ' ' + text + ' ' + '═'.repeat(btnWidth - text.length - 2 - eqCount) + ']';
  const padded = '  ' + btn;
  return [
    b.vertical + padded + ' '.repeat(Math.max(0, inner - padded.length)) + b.vertical,
  ];
}

function renderCheckbox(comp, width) {
  const text = comp.text || comp.label || '';
  const inner = width - 2;
  const line = '  [ ] ' + text;
  return [line + ' '.repeat(Math.max(0, inner - line.length))];
}

function renderText(comp, width) {
  const inner = width - 2;
  const text = comp.content || comp.text || '';
  return ['  ' + text + ' '.repeat(Math.max(0, inner - text.length - 2))];
}

function centerText(text, width) {
  const pad = width - text.length;
  if (pad <= 0) return text;
  const left = Math.floor(pad / 2);
  return ' '.repeat(left) + text + ' '.repeat(pad - left);
}

// Built-in templates
export function getTemplate(name, width = 60) {
  switch (name) {
    case 'login': return loginTemplate(width);
    case 'dashboard': return dashboardTemplate(width);
    case 'settings': return settingsTemplate(width);
    case 'landing': return landingTemplate(width);
    case 'chat': return chatTemplate(width);
    default: return null;
  }
}

function loginTemplate(width) {
  return [
    { type: 'navbar', title: 'MyApp' },
    { type: 'card', title: 'Login', children: [
      { type: 'input', placeholder: 'Email' },
      { type: 'input', placeholder: 'Password' },
      { type: 'checkbox', text: 'Remember me' },
      { type: 'button', text: 'Sign In' },
      { type: 'link', text: 'Forgot password?' },
    ]},
  ];
}

function dashboardTemplate(width) {
  return [
    { type: 'navbar', title: 'Dashboard' },
    { type: 'card', title: 'Overview', children: [
      { type: 'text', content: 'Welcome back, User!' },
      { type: 'text', content: 'You have 5 notifications.' },
    ]},
    { type: 'card', title: 'Recent Activity', children: [
      { type: 'text', content: '• Updated profile settings' },
      { type: 'text', content: '• Deployed v2.1.0' },
      { type: 'text', content: '• Reviewed PR #142' },
    ]},
  ];
}

function settingsTemplate(width) {
  return [
    { type: 'navbar', title: 'Settings' },
    { type: 'card', title: 'Profile Settings', children: [
      { type: 'input', placeholder: 'Display Name' },
      { type: 'input', placeholder: 'Email Address' },
      { type: 'input', placeholder: 'Bio' },
      { type: 'checkbox', text: 'Make profile public' },
      { type: 'checkbox', text: 'Enable notifications' },
      { type: 'button', text: 'Save Changes' },
    ]},
  ];
}

function landingTemplate(width) {
  return [
    { type: 'navbar', title: 'ProductName' },
    { type: 'card', title: 'Build Better Software', children: [
      { type: 'text', content: 'The modern platform for teams' },
      { type: 'text', content: 'who ship fast.' },
      { type: 'button', text: 'Get Started' },
      { type: 'link', text: 'Learn more ->' },
    ]},
    { type: 'card', title: 'Features', children: [
      { type: 'text', content: '★ Real-time collaboration' },
      { type: 'text', content: '★ Built-in CI/CD' },
      { type: 'text', content: '★ Enterprise security' },
    ]},
  ];
}

function chatTemplate(width) {
  return [
    { type: 'navbar', title: 'Chat' },
    { type: 'card', title: 'Messages', children: [
      { type: 'text', content: 'Alice: Hey, how are you?' },
      { type: 'text', content: 'Bob: Good! Working on the CLI.' },
      { type: 'text', content: 'Alice: Nice, let me know if you need help.' },
    ]},
    { type: 'card', title: '', children: [
      { type: 'input', placeholder: 'Type a message...' },
      { type: 'button', text: 'Send' },
    ]},
  ];
}
