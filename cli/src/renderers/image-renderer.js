// ASCII image renderer — converts pixel data to ASCII characters

const CHARSETS = {
  standard: ' .:-=+*#%@',
  detailed: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: ' ░▒▓█',
  minimal: ' .:#',
  binary: ' █',
};

/**
 * Render pixel data to ASCII art.
 *
 * @param {{ width: number, height: number, pixels: number[][] }} pixelData
 *   pixels is a flat array of [r, g, b] triplets, row-major order.
 * @param {{ targetWidth?: number, charset?: string, invert?: boolean, aspect?: number }} options
 * @returns {string}
 */
export function renderImage(pixelData, options = {}) {
  const {
    targetWidth = 80,
    charset = 'standard',
    invert = false,
    aspect = 0.5,
  } = options;

  const chars = CHARSETS[charset] || CHARSETS.standard;
  const { width: srcWidth, height: srcHeight, pixels } = pixelData;

  if (!pixels || pixels.length === 0 || srcWidth === 0 || srcHeight === 0) {
    return 'Error: No pixel data to render.';
  }

  const stepX = srcWidth / targetWidth;
  const targetHeight = Math.floor((srcHeight / stepX) * aspect);
  const stepY = srcHeight / targetHeight;

  const lines = [];

  for (let ty = 0; ty < targetHeight; ty++) {
    let line = '';
    const srcY = Math.floor(ty * stepY);

    for (let tx = 0; tx < targetWidth; tx++) {
      const srcX = Math.floor(tx * stepX);
      const pixelIndex = srcY * srcWidth + srcX;

      if (pixelIndex >= pixels.length) {
        line += chars[0];
        continue;
      }

      const [r, g, b] = pixels[pixelIndex];
      let luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      if (invert) {
        luminance = 255 - luminance;
      }

      const charIndex = Math.floor((luminance / 255) * (chars.length - 1));
      line += chars[Math.min(charIndex, chars.length - 1)];
    }

    lines.push(line);
  }

  return lines.join('\n');
}

export { CHARSETS };
