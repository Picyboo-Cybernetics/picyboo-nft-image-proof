import exifr from 'exifr';
import Jimp from 'jimp';

/**
 * Extract image metadata including dimensions and EXIF data.
 * @param {string} path - Path to the image on disk.
 * @returns {Promise<{ dimensions: { width: number, height: number }, exif: Record<string, unknown> }>} Metadata payload.
 */
export async function extractImageMetadata (path) {
  const [exif, image] = await Promise.all([exifr.parse(path), Jimp.read(path)]);
  return {
    dimensions: {
      width: image.bitmap.width,
      height: image.bitmap.height,
    },
    exif: exif || {},
  };
}
