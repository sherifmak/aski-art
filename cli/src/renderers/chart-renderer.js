// Chart renderer — supports sparkline, bar, line, and histogram chart types

const SPARK_CHARS = '▁▂▃▄▅▆▇█';

export function renderChart(options = {}) {
  const {
    type,
    data,
    width = 60,
    height = 12,
    title,
    sort,
    max,
    label,
  } = options;

  if (!type || !data || data.length === 0) return '';

  let sorted = [...data];
  if (sort === 'asc') sorted.sort((a, b) => a.value - b.value);
  else if (sort === 'desc') sorted.sort((a, b) => b.value - a.value);

  let chart = '';
  switch (type) {
    case 'sparkline':
      chart = renderSparkline(sorted, { max, label });
      break;
    case 'bar':
      chart = renderBar(sorted, { width, max });
      break;
    case 'line':
      chart = renderLine(sorted, { width, height, max });
      break;
    case 'histogram':
      chart = renderHistogram(sorted, { height, max });
      break;
    default:
      return `Unknown chart type: ${type}`;
  }

  if (title) {
    const lines = chart.split('\n');
    const chartWidth = Math.max(...lines.map(l => l.length));
    const titlePad = Math.max(0, Math.floor((chartWidth - title.length) / 2));
    chart = ' '.repeat(titlePad) + title + '\n' + chart;
  }

  return chart;
}

function renderSparkline(data, { max, label: prefix }) {
  const values = data.map(d => d.value);
  const lo = Math.min(...values);
  const hi = max != null ? max : Math.max(...values);
  const range = hi - lo || 1;

  const sparks = values.map(v => {
    const norm = Math.min(1, Math.max(0, (v - lo) / range));
    const idx = Math.min(SPARK_CHARS.length - 1, Math.round(norm * (SPARK_CHARS.length - 1)));
    return SPARK_CHARS[idx];
  }).join('');

  return prefix ? `${prefix} ${sparks}` : sparks;
}

function renderBar(data, { width, max: maxOverride }) {
  if (data.length === 0) return '';

  const maxVal = maxOverride != null ? maxOverride : Math.max(...data.map(d => d.value));
  const maxLabelLen = Math.max(...data.map(d => String(d.label).length));
  const maxValStr = Math.max(...data.map(d => String(d.value).length));
  const barArea = Math.max(1, width - maxLabelLen - maxValStr - 4);

  const lines = data.map(d => {
    const lbl = String(d.label).padEnd(maxLabelLen);
    const barLen = maxVal > 0 ? Math.round((d.value / maxVal) * barArea) : 0;
    const bar = '█'.repeat(barLen);
    const val = String(d.value).padStart(maxValStr);
    return `${lbl}  ${bar.padEnd(barArea)}  ${val}`;
  });

  return lines.join('\n');
}

function renderLine(data, { width, height, max: maxOverride }) {
  if (data.length === 0) return '';

  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = maxOverride != null ? maxOverride : Math.max(...values);
  const range = maxVal - minVal || 1;

  const plotWidth = Math.max(data.length, Math.min(width - 10, data.length * 4));
  const plotHeight = height;

  // Interpolate data points across the plot width
  const plotValues = [];
  for (let x = 0; x < plotWidth; x++) {
    const dataPos = (x / (plotWidth - 1)) * (data.length - 1);
    const lo = Math.floor(dataPos);
    const hi = Math.min(lo + 1, data.length - 1);
    const frac = dataPos - lo;
    plotValues[x] = values[lo] * (1 - frac) + values[hi] * frac;
  }

  // Map values to row positions (0 = bottom, plotHeight-1 = top)
  const rowPositions = plotValues.map(v => {
    const norm = (v - minVal) / range;
    return Math.min(plotHeight - 1, Math.max(0, Math.round(norm * (plotHeight - 1))));
  });

  // Y-axis label width
  const yLabels = [];
  for (let r = 0; r < plotHeight; r++) {
    const val = maxVal - (r / (plotHeight - 1)) * range;
    yLabels.push(formatNum(val));
  }
  const yLabelWidth = Math.max(...yLabels.map(l => l.length));

  // Build grid
  const grid = [];
  for (let r = 0; r < plotHeight; r++) {
    grid[r] = new Array(plotWidth).fill(' ');
  }

  // Plot the line
  for (let x = 0; x < plotWidth; x++) {
    const row = (plotHeight - 1) - rowPositions[x];
    grid[row][x] = '●';

    // Connect to next point
    if (x < plotWidth - 1) {
      const currRow = (plotHeight - 1) - rowPositions[x];
      const nextRow = (plotHeight - 1) - rowPositions[x + 1];

      if (currRow === nextRow) {
        // Horizontal — draw ─ between points if adjacent
      } else if (currRow < nextRow) {
        // Going down
        for (let r = currRow + 1; r < nextRow; r++) {
          grid[r][x] = '│';
        }
      } else {
        // Going up
        for (let r = nextRow + 1; r < currRow; r++) {
          grid[r][x] = '│';
        }
      }
    }
  }

  // Render lines
  const lines = [];
  for (let r = 0; r < plotHeight; r++) {
    const yLabel = yLabels[r].padStart(yLabelWidth);
    const rowStr = grid[r].join('');
    lines.push(`${yLabel} ┤${rowStr}`);
  }

  // X-axis
  const axisLine = ' '.repeat(yLabelWidth) + ' └' + '─'.repeat(plotWidth);
  lines.push(axisLine);

  // X-axis labels
  if (data.length <= plotWidth) {
    const labelLine = [];
    const spacing = plotWidth / data.length;
    let xLabels = ' '.repeat(yLabelWidth + 2);
    const positions = data.map((_, i) => Math.round((i / (data.length - 1)) * (plotWidth - 1)));
    let cursor = 0;
    for (let i = 0; i < data.length; i++) {
      const pos = positions[i];
      const lbl = String(data[i].label);
      const padNeeded = pos - cursor;
      if (padNeeded > 0) {
        xLabels += ' '.repeat(padNeeded);
        cursor = pos;
      }
      xLabels += lbl;
      cursor += lbl.length;
    }
    lines.push(xLabels);
  }

  return lines.join('\n');
}

function renderHistogram(data, { height, max: maxOverride }) {
  if (data.length === 0) return '';

  const maxVal = maxOverride != null ? maxOverride : Math.max(...data.map(d => d.value));
  const plotHeight = height;

  // Normalize values to height
  const barHeights = data.map(d => {
    return maxVal > 0 ? Math.round((d.value / maxVal) * plotHeight) : 0;
  });

  // Each column is 2 chars wide with 1 char gap = 3 chars per entry
  const lines = [];

  for (let r = plotHeight; r >= 1; r--) {
    let row = '  ';
    for (let i = 0; i < data.length; i++) {
      if (i > 0) row += ' ';
      if (barHeights[i] >= r) {
        row += '██';
      } else {
        row += '  ';
      }
    }
    lines.push(row);
  }

  // Label line
  let labelLine = '  ';
  const labels = data.map(d => {
    const lbl = String(d.label);
    if (lbl.length <= 2) return lbl.padStart(2);
    return lbl.substring(0, 2);
  });

  // Build wider label line with full labels if they fit
  const fullLabels = data.map(d => String(d.label));
  const maxLblLen = Math.max(...fullLabels.map(l => l.length));

  if (maxLblLen <= 3) {
    // Center labels under each 2-char column with 1-char gaps
    let lbl = '  ';
    for (let i = 0; i < data.length; i++) {
      if (i > 0) lbl += ' ';
      const l = fullLabels[i];
      if (l.length === 1) lbl += ' ' + l;
      else if (l.length === 2) lbl += l;
      else lbl += l.substring(0, 2);
    }
    labelLine = lbl;
  } else {
    // Use abbreviated labels, center under columns
    let lbl = '';
    const colWidth = 3; // 2 bar + 1 gap
    for (let i = 0; i < data.length; i++) {
      const fl = fullLabels[i];
      const totalSlot = i === 0 ? 4 : 3; // first has 2 leading spaces + 2 bar
      if (i === 0) {
        const padded = fl.length <= 4 ? fl.padStart(2 + Math.ceil((2 - fl.length) / 2) + fl.length).padEnd(4) : '  ' + fl.substring(0, 2);
        lbl += padded;
      } else {
        if (fl.length <= 3) {
          const centered = fl.length === 1 ? ' ' + fl + ' ' :
                           fl.length === 2 ? fl + ' ' :
                           fl;
          lbl += centered.substring(0, 3);
        } else {
          lbl += fl.substring(0, 3);
        }
      }
    }
    labelLine = lbl;
  }

  lines.push(labelLine);

  return lines.join('\n');
}

function formatNum(n) {
  if (Number.isInteger(n)) return String(n);
  if (Math.abs(n) < 0.01) return n.toExponential(1);
  return n.toFixed(1);
}
