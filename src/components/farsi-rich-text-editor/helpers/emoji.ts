import type { EmojiItem } from '@tiptap/extension-emoji'

export const emojis = [
  // Faces
  '😀',
  '😂',
  '🤣',
  '😊',
  '😍',
  '🥰',
  '😘',
  '😎',
  '🤩',
  '🥳',
  '🤔',
  '🙄',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😱',
  '😴',

  // Gestures & reactions
  '👍',
  '👎',
  '👌',
  '✌️',
  '🤞',
  '🤟',
  '🤘',
  '👏',
  '🙌',
  '🙏',
  '💪',
  '👀',
  '👋',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🖤',
  '🤍',
  '💔',
  '💕',
  '💯',

  // Celebration
  '🎉',
  '🎊',
  '🥳',
  '🎂',
  '🎁',
  '🏆',
  '🥇',
  '✨',
  '🎈',
  '🔥',
  '⭐',
  '🌟',
  '💫',

  // Common objects
  '🚀',
  '💻',
  '📱',
  '💡',
  '🔔',
  '📌',
  '📎',
  '✏️',
  '📝',
  '📷',
  '🎵',
  '🎶',

  // Food & drink
  '🍕',
  '🍔',
  '🍟',
  '🌭',
  '🍎',
  '🍓',
  '🍉',
  '🍌',
  '☕',
  '🍺',
  '🍻',
  '🍷',

  // Nature & animals
  '🐶',
  '🐱',
  '🐭',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐸',
  '🐵',
  '🌸',
  '🌹',
  '🌈',
  '☀️',
  '🌙',
]

const APPLE_EMOJI_CDN_BASE =
  'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64'

export const getUnified = (emoji: string) =>
  [...emoji].map((char) => char.codePointAt(0)!.toString(16)).join('-')

export const getAppleEmojiUrl = (emoji: string) =>
  `${APPLE_EMOJI_CDN_BASE}/${getUnified(emoji)}.png`

export const appleEmojis: EmojiItem[] = emojis.map((emoji) => {
  return {
    emoji,
    name: `apple-${emoji}`,
    shortcodes: [`apple-${emoji}`],
    tags: [],
    fallbackImage: getAppleEmojiUrl(emoji),
  }
})
