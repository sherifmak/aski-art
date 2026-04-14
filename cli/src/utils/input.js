// Input utilities for reading stdin and parsing data

export async function readStdin() {
  if (process.stdin.isTTY) return null;
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8').trim();
}

export function parseCSV(text, delimiter = ',') {
  return text.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(delimiter).map(cell => cell.trim()));
}

export function parseSemicolonData(data) {
  return data.split(';')
    .filter(row => row.trim() !== '')
    .map(row => row.split(',').map(cell => cell.trim()));
}

export function detectDelimiter(text) {
  const firstLine = text.split('\n')[0];
  if (firstLine.includes('\t')) return '\t';
  return ',';
}
