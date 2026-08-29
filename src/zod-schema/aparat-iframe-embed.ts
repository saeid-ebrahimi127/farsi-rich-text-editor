import { z } from 'zod'

export const aparatIframeEmbedZodSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const document = new DOMParser().parseFromString(value, 'text/html')
    const iframe = document.querySelector('iframe')

    if (!iframe) {
      ctx.addIssue({
        code: 'custom',
        message: 'کد iframe معتبر نیست.',
      })

      return z.NEVER
    }

    const src = iframe.getAttribute('src')

    if (!src) {
      ctx.addIssue({
        code: 'custom',
        message: 'آدرس ویدئو یافت نشد.',
      })

      return z.NEVER
    }

    return src
  })
  .pipe(
    z.url('آدرس ویدئو معتبر نیست.').refine((src) => {
      try {
        const url = new URL(src)

        return (
          url.hostname === 'www.aparat.com' &&
          url.pathname.startsWith('/video/video/embed/')
        )
      } catch {
        return false
      }
    }, 'آدرس ویدئوی آپاراتی معتبر نیست.'),
  )
