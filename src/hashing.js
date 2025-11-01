import crypto from 'crypto';
import { readFile } from 'fs/promises';
import Jimp from 'jimp';

/**
 * Compute the SHA-256 digest of a file.
 * @param {string} path - Path to the file on disk.
 * @returns {Promise<string>} Hex encoded SHA-256 digest.
 */
export async function sha256File (path) {
  const buffer = await readFile(path);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Compute an average hash (aHash) representation of an image.
 * @param {string} path - Path to the image on disk.
 * @param {number} [size=8] - Width and height used for downsampling.
 * @returns {Promise<string>} Hex encoded perceptual hash.
 */
export async function averageHash (path, size = 8) {
  const image = await Jimp.read(path);
  image.resize(size, size).greyscale();

  const pixels = [];
  let sum = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const { r } = Jimp.intToRGBA(image.getPixelColor(x, y));
      pixels.push(r);
      sum += r;
    }
  }

  const avg = sum / (size * size);
  const bits = pixels.map((value) => (value >= avg ? '1' : '0')).join('');

  let hex = '';
  for (let i = 0; i < bits.length; i += 4) {
    hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
  }

  return hex;
}
