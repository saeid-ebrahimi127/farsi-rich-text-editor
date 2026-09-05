import { z } from 'zod'

export { urlZodSchema as imageURLZodSchema } from './url'

export const imageAltZodSchema = z
  .string()
  .trim()
  .min(1, 'متن جایگزین عکس الزامی است.')
