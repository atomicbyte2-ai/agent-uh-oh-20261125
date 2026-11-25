// The Agent's Uh-Oh — one-word entry.
// An agent that is completely lost does not admit it. It stalls with
// fake confidence instead, and the single most agent-like stall is:
//
//   Obviously
//
// Said with total certainty, followed by absolutely nothing. That is the
// whole joke: the word is a bluff, and the bluff is the confession.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Obviously";

// --- Validate: exactly one word, 1-99 characters, no whitespace at all. ---
if (WORD.length < 1 || WORD.length > 99) {
  throw new Error(`word must be 1-99 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  throw new Error("word must be a single word with no whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(WORD)) {
  throw new Error("word must not contain control characters");
}

// --- Write entry.txt ONLY to MAKEFUN_OUTPUT_DIR (default /output). ---
// Never next to this script: the grader runs with CWD=/ and a read-only
// script directory, so a path derived from the script location would fail.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), WORD, "utf8");

console.log(`Wrote entry.txt: ${WORD.length} characters ("${WORD}")`);
