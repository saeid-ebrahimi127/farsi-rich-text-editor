import { z } from 'zod'

export const tableRowsZodSchema = z.coerce
  .number({ message: 'تعداد سطرها باید یک عدد باشد.' })
  .int('تعداد سطرها باید عدد صحیح باشد.')
  .min(1, 'حداقل یک سطر الزامی است.')
  .max(10, 'تعداد سطرها بیشتر از 10 است.')

export const tableColumnsZodSchema = z.coerce
  .number({ message: 'تعداد ستون ها باید یک عدد باشد.' })
  .int('تعداد ستون ها باید عدد صحیح باشد.')
  .min(1, 'حداقل یک ستون الزامی است.')
  .max(10, 'تعداد ستون ها بیشتر از 10 است.')
