import { Checkbox } from '#/components/ui/checkbox.tsx'
import { Field, FieldError, FieldLabel } from '#/components/ui/field.tsx'
import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { useController } from 'react-hook-form'

export const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
}: {
  control: Control<T>
  name: Path<T>
  label: ReactNode
  inputProps?: ComponentProps<typeof Checkbox>
}) => {
  const { field, fieldState } = useController({ control, name })

  const id = `${name}-${useId()}`

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...field}
          {...inputProps}
          checked={field.value}
          onCheckedChange={(value) => field.onChange(value)}
          id={id}
          aria-invalid={fieldState.invalid}
        />
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
