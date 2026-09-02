import { z } from 'zod'

export type VideoIFrameProvider = {
  name: string
  isMatch: (url: URL) => boolean
}

export const videoIFrameProviders: VideoIFrameProvider[] = [
  {
    name: 'aparat',
    isMatch: (url) =>
      url.hostname === 'www.aparat.com' &&
      url.pathname.startsWith('/video/video/embed/'),
  },
]

export const findVideoIFrameProvider = (
  src: string,
): VideoIFrameProvider | undefined => {
  try {
    const url = new URL(src)

    return videoIFrameProviders.find((p) => p.isMatch(url))
  } catch {
    return undefined
  }
}

export const videoIFrameZodSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const document = new DOMParser().parseFromString(value, 'text/html')
    const iframe = document.querySelector('iframe')

    if (!iframe) {
      ctx.addIssue({
        code: 'custom',
        message: 'کد IFrame معتبر نیست.',
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
    z
      .url('آدرس ویدئو معتبر نیست.')
      .refine(
        (src) => findVideoIFrameProvider(src) !== undefined,
        'این سرویس ویدئویی پشتیبانی نمی‌شود.',
      ),
  )
