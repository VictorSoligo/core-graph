'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useState } from 'react'
import { CheckboxWithLabel } from './checkbox-with-label'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'

interface ScaleTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function ScaleTab({ shape, shapeIndex, onClose }: ScaleTabProps) {
  const [sx, setSx] = useState('')
  const [sy, setSy] = useState('')
  const [scaleRelativeToOrigin, setScaleRelativeToOrigin] = useState(false)

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (scaleRelativeToOrigin) {
      shape.scaleRelativeToOrigin(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    } else {
      shape.scale(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    }

    editShapeFromDisplayList(shapeIndex, shape)

    setSx('')
    setSy('')

    onClose()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Sx"
          id="sx"
          placeholder="Sx"
          type="number"
          value={sx}
          onChange={(e) => setSx(e.target.value)}
        />

        <InputWithLabel
          label="Sy"
          id="sy"
          placeholder="Sy"
          type="number"
          value={sy}
          onChange={(e) => setSy(e.target.value)}
        />
      </div>

      <CheckboxWithLabel
        id="scaleRelativeToOrigin"
        label="Em relação à origem"
        checked={scaleRelativeToOrigin}
        onCheckedChange={(value: boolean) => setScaleRelativeToOrigin(value)}
      />

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
