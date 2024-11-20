'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useState } from 'react'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'

interface TranslationTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function TranslationTab({
  shape,
  shapeIndex,
  onClose,
}: TranslationTabProps) {
  const [dx, setDx] = useState('')
  const [dy, setDy] = useState('')

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    shape.translate(dx ? Number(dx) : 0, dy ? Number(dy) : 0)

    editShapeFromDisplayList(shapeIndex, shape)

    setDx('')
    setDy('')

    onClose()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Dx"
          id="dx"
          placeholder="Dx"
          type="number"
          value={dx}
          onChange={(e) => setDx(e.target.value)}
        />

        <InputWithLabel
          label="Dy"
          id="dy"
          placeholder="Dy"
          type="number"
          value={dy}
          onChange={(e) => setDy(e.target.value)}
        />
      </div>

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
