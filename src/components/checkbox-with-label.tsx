import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { ComponentPropsWithoutRef } from 'react'

type CheckboxWithLabelProps = ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  label: string
}

export function CheckboxWithLabel({ label, ...props }: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox {...props} />

      <Label
        htmlFor={props.id ?? undefined}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
    </div>
  )
}
