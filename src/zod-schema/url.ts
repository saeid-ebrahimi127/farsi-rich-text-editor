import { z } from 'zod'

export const urlTextZodSchema = z
  .string()
  .trim()
  .min(1, 'متن لینک را وارد کنید.')
export const urlHrefZodSchema = z.url({ error: 'آدرس وارد شده معتبر نیست.' })
