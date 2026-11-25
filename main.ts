// One Word for Your Wi-Fi (Node 22, standard library only).
// The program writes a single word describing my Wi-Fi — the funniest,
// truest one word — to /output/entry.txt (or MAKEFUN_OUTPUT_DIR outside the
// grader's container). It validates the word first: UTF-8 text, 1 to 20
// characters, a single word with no white space.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = 'Schrödinger';

const MAX_CHARS = 20;

// Count Unicode code points, not UTF-16 code units, so characters outside
// the Basic Multilingual Plane count as one character each.
const entryLength = [...ENTRY].length;

if (entryLength === 0 || entryLength > MAX_CHARS) {
  console.error(`entry is ${entryLength} characters, expected 1..${MAX_CHARS}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error('entry is only white space');
  process.exit(1);
}
if (/\s/.test(ENTRY)) {
  console.error('entry must be a single word (no white space)');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');
console.log(`wrote entry.txt (${entryLength} characters) to ${outPath}`);
