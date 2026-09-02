import { z } from 'zod'

export const urlTextZodSchema = z
  .string()
  .trim()
  .min(1, 'متن لینک را وارد کنید.')

export const urlZodSchema = z.url({
  error: 'مقدار وارد شده باید یک URL باشد.',
})
