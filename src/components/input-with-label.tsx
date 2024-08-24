import { Input, InputProps } from './ui/input'
import { Label } from './ui/label'

type InputWithLabelProps = InputProps & {
  label: string
}

export function InputWithLabel({ label, ...inputProps }: InputWithLabelProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={inputProps.id}>{label}</Label>

      <Input {...inputProps} />
    </div>
  )
}
