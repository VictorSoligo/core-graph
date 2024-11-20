'use client'

import { useDisplayList } from '@/contexts/display-list-context'
import { Shape } from '@/models/shape'
import { FormEvent, useState } from 'react'
import { InputWithLabel } from './input-with-label'
import { SaveShapeButton } from './save-shape-button'
import { DialogFooter } from './ui/dialog'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

type Scale = 'default' | 'origin' | 'center'

interface ScaleTabProps {
  shape: Shape
  shapeIndex: number
  onClose: () => void
}

export function ScaleTab({ shape, shapeIndex, onClose }: ScaleTabProps) {
  const [sx, setSx] = useState('')
  const [sy, setSy] = useState('')
  const [scale, setScale] = useState<Scale>('default')

  const { editShapeFromDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (scale === 'default') {
      shape.scale(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    }

    if (scale === 'origin') {
      shape.scaleRelativeToOrigin(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    }

    if (scale === 'center') {
      shape.scaleRelativeToCenter(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
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

      <RadioGroup
        defaultValue="default"
        value={scale}
        onValueChange={(value: Scale) => setScale(value)}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">Escalonar simples</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="origin" id="origin" />
            <Label htmlFor="origin">Escalonar em relação à origem</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="center" />
            <Label htmlFor="center">Escalonar sobre o centro</Label>
          </div>
        </div>
      </RadioGroup>

      <DialogFooter>
        <SaveShapeButton />
      </DialogFooter>
    </form>
  )
}
