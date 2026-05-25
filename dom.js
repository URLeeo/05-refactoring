// dom.js
// Handles DOM queries, rendering, and event listeners.

import { analyzeText } from './utils.js';
import { addSnapshot, clearHistory, getHistory } from './history.js';

const textInput = document.querySelector('#textInput');
const charCount = document.querySelector('#charCount');
const wordCount = document.querySelector('#wordCount');
const tokenCount = document.querySelector('#tokenCount');
const saveSnapshotButton = document.querySelector('#saveSnapshot');
const clearHistoryButton = document.querySelector('#clearHistory');
const historyList = document.querySelector('#historyList');

function updateCounts() {
  const analysis = analyzeText(textInput.value);

  charCount.textContent = analysis.characters;
  wordCount.textContent = analysis.words;
  tokenCount.textContent = analysis.tokens;
}

function createSnapshotItem(snapshot) {
  const item = document.createElement('li');

  const title = document.createElement('strong');
  title.textContent = snapshot.label;

  const counts = document.createElement('span');
  counts.textContent = `${snapshot.characters} characters • ${snapshot.words} words • ${snapshot.tokens} tokens`;

  const time = document.createElement('span');
  time.textContent = `Saved at ${snapshot.timestamp}`;

  item.append(title, counts, time);
  return item;
}

function renderHistory() {
  const snapshots = getHistory();
  historyList.innerHTML = '';

  if (snapshots.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No snapshots saved yet.';
    historyList.append(emptyItem);
    return;
  }

  snapshots.forEach((snapshot) => {
    historyList.append(createSnapshotItem(snapshot));
  });
}

textInput.addEventListener('input', updateCounts);

saveSnapshotButton.addEventListener('click', () => {
  addSnapshot(textInput.value);
  renderHistory();
});

clearHistoryButton.addEventListener('click', () => {
  clearHistory();
  renderHistory();
});

updateCounts();
renderHistory();
