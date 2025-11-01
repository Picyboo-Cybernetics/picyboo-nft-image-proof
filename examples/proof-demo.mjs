import { buildImageProof } from '../src/index.js';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

async function run() {
  const imagePath = fileURLToPath(new URL('./sample.png', import.meta.url));
  const proof = await buildImageProof(imagePath);
  const outputPath = resolve(
    fileURLToPath(new URL('./output/sample-proof.json', import.meta.url)),
  );
  await writeFile(outputPath, `${JSON.stringify(proof, null, 2)}\n`);
  console.log(`Proof stored at ${outputPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
