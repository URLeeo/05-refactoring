// utils.js
// Pure text-processing functions. This file does not touch the DOM or history state.

export function cleanText(text) {
  return text.trim();
}

export function splitIntoWords(text) {
  return cleanText(text).split(/\s+/);
}

export function removeEmptyWords(words) {
  return words.filter((word) => word.length > 0);
}

export function estimateTokens(characterCount) {
  return Math.ceil(characterCount / 4);
}

export function countTokens(text) {
  const cleanedText = cleanText(text);

  if (cleanedText.length === 0) {
    return 0;
  }

  return estimateTokens(cleanedText.length);
}

export function analyzeText(text) {
  const cleanedText = cleanText(text);
  const words = cleanedText.length === 0 ? [] : removeEmptyWords(splitIntoWords(cleanedText));

  return {
    characters: text.length,
    words: words.length,
    tokens: countTokens(text),
  };
}
