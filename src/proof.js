import { basename } from 'path';
import crypto from 'crypto';
import { averageHash, sha256File } from './hashing.js';
import { extractImageMetadata } from './metadata.js';

async function deriveCtxToken(hexHash) {
  const seed = Buffer.from(hexHash, 'hex');
  const baseKey = await crypto.webcrypto.subtle.importKey(
    'raw',
    seed,
    'HKDF',
    false,
    ['deriveBits'],
  );

  const encoder = new TextEncoder();
  const derivedBits = await crypto.webcrypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: encoder.encode('picyboo.ctx'),
      info: encoder.encode('0'),
    },
    baseKey,
    256,
  );
  return Buffer.from(derivedBits).toString('hex');
}

/**
 * Construct a deterministic proof payload for the given image.
 * @param {string} imagePath - Path to an image file.
 * @returns {Promise<object>} Proof description including hashes and metadata.
 */
export async function buildImageProof(imagePath) {
  const [hash, perceptualHash, metadata] = await Promise.all([
    sha256File(imagePath),
    averageHash(imagePath),
    extractImageMetadata(imagePath),
  ]);

  return {
    schema: 'PBO-NFT-PROOF/1.0',
    source: 'picyboo-nft-image-proof',
    file: basename(imagePath),
    hash_sha256: hash,
    pHash_ahash: perceptualHash,
    dimensions: metadata.dimensions,
    exif: metadata.exif,
    ctx_token: await deriveCtxToken(hash),
    created_at: new Date().toISOString(),
  };
}

export { deriveCtxToken };
