import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import plaintext from 'highlight.js/lib/languages/plaintext'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { createLowlight } from 'lowlight'

const lowlight = createLowlight()

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('javascript', js)
lowlight.register('typescript', ts)
lowlight.register('plaintext', plaintext)

export { lowlight }
