import { fileURLToPath } from 'url';
import { buildImageProof, sha256File, averageHash } from '../src/index.js';

const imagePath = fileURLToPath(new URL('../examples/sample.png', import.meta.url));

describe('image proof pipeline', () => {
  it('computes reproducible hashes', async () => {
    await expect(sha256File(imagePath)).resolves.toBe(
      '5bc07fdf873df8a87a1c1d505c05ae8dfea5dd6951202444f6624c18538e4ac2',
    );
    await expect(averageHash(imagePath)).resolves.toBe('b8e0f0d8fe7a2038');
  });

  it('builds a complete proof object', async () => {
    const proof = await buildImageProof(imagePath);
    expect(proof).toMatchObject({
      schema: 'PBO-NFT-PROOF/1.0',
      source: 'picyboo-nft-image-proof',
      file: 'sample.png',
      hash_sha256: '5bc07fdf873df8a87a1c1d505c05ae8dfea5dd6951202444f6624c18538e4ac2',
      pHash_ahash: 'b8e0f0d8fe7a2038',
      dimensions: { width: 320, height: 230 },
      ctx_token: '8abcc0066cb29938983e2b1e057e55451de65941022970d44f9f54275c614e33',
    });
    expect(typeof proof.created_at).toBe('string');
    expect(proof.exif).toBeDefined();
  });
});
