export function getReadingTime(wordCount: number) {
  const wordsPerMinute = 200

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
