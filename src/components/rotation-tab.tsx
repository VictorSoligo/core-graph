'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useEffect, useState } from 'react'
import { CheckboxWithLabel } from './checkbox-with-label'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'
import { Slider } from './ui/slider'

interface RotationTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function RotationTab({ shape, shapeIndex, onClose }: RotationTabProps) {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [rotateAroundPoint, setRotateAroundPoint] = useState(false)
  const [pivotX, setPivotX] = useState('')
  const [pivotY, setPivotY] = useState('')

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (rotateAroundPoint) {
      shape.rotateAroundPoint(rotationAngle, Number(pivotX), Number(pivotY))
    } else {
      shape.rotate(rotationAngle)
    }

    editShapeFromDisplayList(shapeIndex, shape)

    setPivotX('')
    setPivotY('')

    onClose()
  }

  useEffect(() => {
    setPivotX('')
    setPivotY('')
  }, [rotateAroundPoint])

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Slider
        value={[rotationAngle]}
        onValueChange={(value) => setRotationAngle(value[0])}
        step={1}
        max={359}
        min={-359}
      />

      <span className="flex justify-center">{rotationAngle}°</span>

      <CheckboxWithLabel
        id="rotateAroundPoint"
        label="Rotacionar sobre ponto qualquer"
        checked={rotateAroundPoint}
        onCheckedChange={(value: boolean) => setRotateAroundPoint(value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Pivô X"
          id="pivotX"
          placeholder="Pivô X"
          type="number"
          value={pivotX}
          onChange={(e) => setPivotX(e.target.value)}
          disabled={!rotateAroundPoint}
        />

        <InputWithLabel
          label="Pivô Y"
          id="pivotY"
          placeholder="Pivô Y"
          type="number"
          value={pivotY}
          onChange={(e) => setPivotY(e.target.value)}
          disabled={!rotateAroundPoint}
        />
      </div>

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
