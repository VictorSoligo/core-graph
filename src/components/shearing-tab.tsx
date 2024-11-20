'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useState } from 'react'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'

interface ShearingTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function ShearingTab({ shape, shapeIndex, onClose }: ShearingTabProps) {
  const [shX, setShX] = useState('')
  const [shY, setShY] = useState('')

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    shape.shear(Number(shX), Number(shY))

    editShapeFromDisplayList(shapeIndex, shape)

    setShX('')
    setShY('')

    onClose()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Sh X"
          placeholder="Sh X"
          id="shX"
          type="number"
          value={shX}
          onChange={(e) => setShX(e.target.value)}
        />

        <InputWithLabel
          label="Sh Y"
          placeholder="Sh Y"
          id="shY"
          type="number"
          value={shY}
          onChange={(e) => setShY(e.target.value)}
        />
      </div>

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
