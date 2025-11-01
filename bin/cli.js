#!/usr/bin/env node
import { program } from 'commander';
import { buildImageProof } from '../src/index.js';

async function handleProofCommand (imagePath) {
  const proof = await buildImageProof(imagePath);
  process.stdout.write(`${JSON.stringify(proof, null, 2)}\n`);
}

program
  .name('pboimg')
  .description('Generate deterministic descriptors for an image file')
  .version('0.2.0');

program.command('proof').argument('<imagePath>').action(handleProofCommand);

program.parse();
