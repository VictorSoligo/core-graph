import { Shape } from '@/models/shape'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { FormEvent, useState } from 'react'
import { Label } from './ui/label'
import { useDisplayList } from '@/contexts/display-list-context'
import { InputWithLabel } from './input-with-label'
import { CheckboxWithLabel } from './checkbox-with-label'

interface EditShapeModalProps {
  shape: Shape
  shapeIndex: number
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function EditShapeModal({
  isOpen,
  shapeIndex,
  onOpenChange,
  shape,
}: EditShapeModalProps) {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [dx, setDx] = useState('')
  const [dy, setDy] = useState('')
  const [sx, setSx] = useState('')
  const [sy, setSy] = useState('')
  const [scaleRelativeToOrigin, setScaleRelativeToOrigin] = useState(false)

  const { editShapeFromDisplayList } = useDisplayList()

  function handleClose() {
    onOpenChange(false)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    shape.rotate(rotationAngle)
    shape.translate(dx ? Number(dx) : 0, dy ? Number(dy) : 0)

    if (scaleRelativeToOrigin) {
      shape.scaleRelativeToOrigin(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    } else {
      shape.scale(sx ? Number(sx) : 1, sy ? Number(sy) : 1)
    }

    editShapeFromDisplayList(shapeIndex, shape)

    setDx('')
    setDy('')
    setSx('')
    setSy('')

    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Editar objeto {shape.name}</DialogTitle>

          <div className="mt-4 gap-4 flex flex-col">
            <div className="space-y-4">
              <Label>Escalonamento</Label>

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
                onCheckedChange={(value: boolean) =>
                  setScaleRelativeToOrigin(value)
                }
              />
            </div>

            <div className="space-y-4">
              <Label>Translação</Label>

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
            </div>

            <div className="space-y-4">
              <Label>Rotação</Label>

              <Slider
                value={[rotationAngle]}
                onValueChange={(value) => setRotationAngle(value[0])}
                step={1}
                max={359}
                min={-359}
              />

              <span className="flex justify-center">{rotationAngle}°</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
