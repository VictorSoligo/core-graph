'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useEffect, useState } from 'react'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Slider } from './ui/slider'

type Rotation = 'origin' | 'center' | 'pivot'

interface RotationTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function RotationTab({ shape, shapeIndex, onClose }: RotationTabProps) {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [pivotX, setPivotX] = useState('')
  const [pivotY, setPivotY] = useState('')
  const [rotation, setRotation] = useState<Rotation>('origin')

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (rotation === 'origin') {
      shape.rotate(rotationAngle)
    }

    if (rotation === 'pivot') {
      shape.rotateAroundPoint(rotationAngle, Number(pivotX), Number(pivotY))
    }

    if (rotation === 'center') {
      shape.rotateAroundCenter(rotationAngle)
    }

    editShapeFromDisplayList(shapeIndex, shape)

    setPivotX('')
    setPivotY('')

    onClose()
  }

  useEffect(() => {
    setPivotX('')
    setPivotY('')
  }, [rotation])

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

      <RadioGroup
        defaultValue="origin"
        value={rotation}
        onValueChange={(value: Rotation) => setRotation(value)}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="origin" id="origin" />
            <Label htmlFor="origin">Rotacionar sobre a origem</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pivot" id="pivot" />
            <Label htmlFor="pivot">Rotacionar sobre um ponto fixo</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="center" />
            <Label htmlFor="center">Rotacionar sobre o centro</Label>
          </div>
        </div>
      </RadioGroup>

      {rotation === 'pivot' && (
        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            label="Pivô X"
            id="pivotX"
            placeholder="Pivô X"
            type="number"
            value={pivotX}
            onChange={(e) => setPivotX(e.target.value)}
            disabled={!(rotation === 'pivot')}
          />

          <InputWithLabel
            label="Pivô Y"
            id="pivotY"
            placeholder="Pivô Y"
            type="number"
            value={pivotY}
            onChange={(e) => setPivotY(e.target.value)}
            disabled={!(rotation === 'pivot')}
          />
        </div>
      )}

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
