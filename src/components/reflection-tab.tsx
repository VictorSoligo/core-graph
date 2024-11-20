'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useState } from 'react'
import { CheckboxWithLabel } from './checkbox-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'

interface ReflectionTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function ReflectionTab({
  shape,
  shapeIndex,
  onClose,
}: ReflectionTabProps) {
  const [y, setY] = useState(false)
  const [x, setX] = useState(false)

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    shape.reflect({ x, y })

    editShapeFromDisplayList(shapeIndex, shape)

    setX(false)
    setY(false)

    onClose()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <CheckboxWithLabel
          id="x"
          label="Em torno do eixo X"
          checked={x}
          onCheckedChange={(value: boolean) => setX(value)}
        />

        <CheckboxWithLabel
          id="y"
          label="Em torno do eixo Y"
          checked={y}
          onCheckedChange={(value: boolean) => setY(value)}
        />
      </div>

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
