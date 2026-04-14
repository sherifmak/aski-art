// ASCII flowchart renderer with auto-layout

export function renderFlow(nodes, edges, options = {}) {
  const { direction = 'TB' } = options;

  const parsedNodes = parseNodes(nodes);
  const parsedEdges = parseEdges(edges);

  // Build adjacency
  const adj = {};
  for (const node of parsedNodes) adj[node.name] = [];
  for (const edge of parsedEdges) {
    if (adj[edge.from]) adj[edge.from].push(edge.to);
  }

  // Assign layers using longest-path from roots
  const layers = longestPathLayers(parsedNodes, adj);

  // Group by layer
  const layerGroups = {};
  let maxLayer = 0;
  for (const node of parsedNodes) {
    const l = layers[node.name];
    if (!layerGroups[l]) layerGroups[l] = [];
    layerGroups[l].push(node);
    maxLayer = Math.max(maxLayer, l);
  }

  if (direction === 'LR') {
    return renderLR(parsedNodes, parsedEdges, layerGroups, maxLayer);
  }
  return renderTB(parsedNodes, parsedEdges, layerGroups, maxLayer);
}

function parseNodes(specs) {
  return specs.map(spec => {
    const m = spec.match(/^(.+?)\((\w+)\)$/);
    if (m) return { name: m[1].trim(), type: m[2] };
    return { name: spec.trim(), type: 'rect' };
  });
}

function parseEdges(specs) {
  return specs.map(spec => {
    const m = spec.match(/^(.+?)->(.+?):(.+)$/);
    if (m) return { from: m[1].trim(), to: m[2].trim(), label: m[3].trim() };
    const m2 = spec.match(/^(.+?)->(.+)$/);
    if (m2) return { from: m2[1].trim(), to: m2[2].trim(), label: '' };
    return { from: '', to: '', label: '' };
  });
}

function longestPathLayers(nodes, adj) {
  // First detect back-edges to break cycles
  const nodeIndex = {};
  nodes.forEach((n, i) => nodeIndex[n.name] = i);

  // Build forward-only adjacency (edges where target has higher node index)
  // to handle cycles gracefully
  const forwardAdj = {};
  const backEdges = new Set();
  for (const n of nodes) {
    forwardAdj[n.name] = [];
    for (const child of (adj[n.name] || [])) {
      if (nodeIndex[child] > nodeIndex[n.name]) {
        forwardAdj[n.name].push(child);
      } else {
        backEdges.add(`${n.name}->${child}`);
      }
    }
  }

  // BFS on forward edges only
  const inDeg = {};
  for (const n of nodes) inDeg[n.name] = 0;
  for (const n of nodes) {
    for (const child of forwardAdj[n.name]) {
      if (inDeg[child] !== undefined) inDeg[child]++;
    }
  }

  const layers = {};
  const queue = [];
  for (const n of nodes) {
    if (inDeg[n.name] === 0) {
      layers[n.name] = 0;
      queue.push(n.name);
    }
  }

  const remaining = { ...inDeg };

  while (queue.length > 0) {
    const cur = queue.shift();
    for (const child of forwardAdj[cur]) {
      const newLayer = (layers[cur] || 0) + 1;
      if (layers[child] === undefined || layers[child] < newLayer) {
        layers[child] = newLayer;
      }
      remaining[child]--;
      if (remaining[child] === 0) {
        queue.push(child);
      }
    }
  }

  // Handle unreached nodes
  for (const n of nodes) {
    if (layers[n.name] === undefined) layers[n.name] = 0;
  }

  return layers;
}

function renderNode(node, width) {
  const name = node.name;
  const padded = centerText(name, width - 4);

  switch (node.type) {
    case 'diamond': {
      const w = name.length + 6;
      const half = Math.floor(w / 2);
      const topBot = ' '.repeat(half) + '/\\';
      const top2 = ' '.repeat(Math.max(0, half - Math.floor(name.length / 2) - 2)) + '/  ' + name + '  \\';
      const bot2 = ' '.repeat(Math.max(0, half - Math.floor(name.length / 2) - 2)) + '\\  ' + ' '.repeat(name.length) + '  /';
      const botBot = ' '.repeat(half) + '\\/';
      return [topBot, top2, bot2, botBot];
    }
    case 'round': {
      const inner = '  ' + padded + '  ';
      return [
        ' ' + '_'.repeat(inner.length) + ' ',
        '(' + inner + ')',
        ' ' + '-'.repeat(inner.length) + ' ',
      ];
    }
    default: {
      const inner = ' ' + padded + ' ';
      return [
        '+' + '-'.repeat(inner.length) + '+',
        '|' + inner + '|',
        '+' + '-'.repeat(inner.length) + '+',
      ];
    }
  }
}

function renderTB(nodes, edges, layerGroups, maxLayer) {
  const nodeWidth = Math.max(14, ...nodes.map(n => n.name.length + 8));
  const colSpacing = nodeWidth + 4;
  const lines = [];

  // Track positions for arrows
  const nodeCenters = {};

  for (let layer = 0; layer <= maxLayer; layer++) {
    const group = layerGroups[layer] || [];

    // Render nodes
    const rendered = group.map(n => renderNode(n, nodeWidth));
    const maxH = Math.max(...rendered.map(r => r.length));

    // Calculate positions
    group.forEach((n, idx) => {
      nodeCenters[n.name] = { col: idx, layer };
    });

    // Merge rows
    for (let row = 0; row < maxH; row++) {
      let line = '';
      for (let i = 0; i < group.length; i++) {
        const r = rendered[i];
        const s = r[row] || '';
        line += s;
        if (i < group.length - 1) {
          line += ' '.repeat(Math.max(2, colSpacing - s.length));
        }
      }
      lines.push(line);
    }

    // Draw arrows to next layer
    if (layer < maxLayer) {
      const nextGroup = layerGroups[layer + 1] || [];

      // Find relevant edges
      const layerEdges = [];
      for (const edge of edges) {
        const fromIdx = group.findIndex(n => n.name === edge.from);
        const toIdx = nextGroup.findIndex(n => n.name === edge.to);
        if (fromIdx !== -1 && toIdx !== -1) {
          layerEdges.push({ ...edge, fromIdx, toIdx });
        }
      }

      // Also find back-edges or skip-edges for labeling
      const otherEdges = [];
      for (const edge of edges) {
        const fromInGroup = group.findIndex(n => n.name === edge.from);
        if (fromInGroup !== -1) {
          const toInNext = nextGroup.findIndex(n => n.name === edge.to);
          if (toInNext === -1 && edge.label) {
            // Edge to node not in next layer — show label as side annotation
            otherEdges.push({ ...edge, fromIdx: fromInGroup });
          }
        }
      }

      // Arrow lines
      for (let r = 0; r < 3; r++) {
        const maxCols = Math.max(group.length, nextGroup.length, 1);
        const lineWidth = maxCols * colSpacing + nodeWidth + 40;
        const chars = new Array(lineWidth).fill(' ');

        for (const e of layerEdges) {
          const fromX = e.fromIdx * colSpacing + Math.floor(nodeWidth / 2);
          const toX = e.toIdx * colSpacing + Math.floor(nodeWidth / 2);

          if (fromX === toX) {
            if (r < 2) chars[fromX] = '|';
            else chars[fromX] = 'v';
            if (r === 0 && e.label) {
              const start = fromX + 2;
              for (let i = 0; i < e.label.length && start + i < lineWidth; i++) {
                chars[start + i] = e.label[i];
              }
            }
          } else {
            if (r === 0) {
              chars[fromX] = '|';
            } else if (r === 1) {
              const left = Math.min(fromX, toX);
              const right = Math.max(fromX, toX);
              for (let i = left; i <= right; i++) chars[i] = '-';
              chars[left] = '+';
              chars[right] = '+';
              if (e.label) {
                const mid = Math.floor((left + right) / 2) - Math.floor(e.label.length / 2);
                for (let i = 0; i < e.label.length; i++) {
                  if (mid + i >= 0 && mid + i < lineWidth) chars[mid + i] = e.label[i];
                }
              }
            } else {
              chars[toX] = 'v';
            }
          }
        }

        // Show labels for non-direct edges as side annotations
        if (r === 0) {
          for (const e of otherEdges) {
            const fromX = e.fromIdx * colSpacing + Math.floor(nodeWidth / 2);
            const start = fromX + nodeWidth;
            const annotation = `--${e.label}--> ${e.to}`;
            for (let i = 0; i < annotation.length && start + i < lineWidth; i++) {
              chars[start + i] = annotation[i];
            }
          }
        }

        lines.push(chars.join('').trimEnd());
      }
    }
  }

  return lines.join('\n');
}

function renderLR(nodes, edges, layerGroups, maxLayer) {
  const nodeWidth = Math.max(14, ...nodes.map(n => n.name.length + 8));
  const arrowWidth = 10;
  const lines = [];

  // Find max nodes in any layer for row count
  const maxInLayer = Math.max(...Object.values(layerGroups).map(g => g.length));

  for (let row = 0; row < maxInLayer; row++) {
    // For each row, render across all layers
    const rendered = [];
    for (let layer = 0; layer <= maxLayer; layer++) {
      const group = layerGroups[layer] || [];
      const node = group[row];
      if (node) {
        rendered.push({ node, lines: renderNode(node, nodeWidth), layer });
      } else {
        rendered.push({ node: null, lines: [' '.repeat(nodeWidth + 2), ' '.repeat(nodeWidth + 2), ' '.repeat(nodeWidth + 2)], layer });
      }
    }

    const maxH = Math.max(...rendered.map(r => r.lines.length));
    for (let h = 0; h < maxH; h++) {
      let line = '';
      for (let i = 0; i < rendered.length; i++) {
        const r = rendered[i];
        line += r.lines[h] || ' '.repeat(nodeWidth + 2);

        // Arrow between layers
        if (i < rendered.length - 1) {
          const midH = Math.floor(maxH / 2);
          if (h === midH && r.node) {
            const nextR = rendered[i + 1];
            // Check for any edge from this node to any node in the next layer
            let edge = null;
            if (nextR.node) {
              edge = edges.find(e => e.from === r.node.name && e.to === nextR.node.name);
            }
            if (edge) {
              const label = edge.label ? ` ${edge.label} ` : '';
              line += '  --' + label + '-->  ';
            } else {
              line += ' '.repeat(arrowWidth + 4);
            }
          } else {
            line += ' '.repeat(arrowWidth + 4);
          }
        }
      }
      lines.push(line.trimEnd());
    }
    if (row < maxInLayer - 1) lines.push('');
  }

  return lines.join('\n');
}

function centerText(text, width) {
  const pad = width - text.length;
  if (pad <= 0) return text;
  const left = Math.floor(pad / 2);
  return ' '.repeat(left) + text + ' '.repeat(pad - left);
}
