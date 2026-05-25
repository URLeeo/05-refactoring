// history.js
// Owns snapshot history state and exposes safe functions for working with it.

import { analyzeText } from './utils.js';

const history = [];

export function addSnapshot(text) {
  const analysis = analyzeText(text);

  const snapshot = {
    id: history.length + 1,
    label: `Snapshot ${history.length + 1}`,
    text,
    characters: analysis.characters,
    words: analysis.words,
    tokens: analysis.tokens,
    timestamp: new Date().toLocaleTimeString(),
  };

  history.push(snapshot);
  return snapshot;
}

export function getHistory() {
  return [...history];
}

export function clearHistory() {
  history.length = 0;
}
