import { Shape } from '@/models/shape'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { FormEvent, useState } from 'react'
import { Label } from './ui/label'
import { useDisplayList } from '@/contexts/display-list-context'

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

  const { editShapeFromDisplayList } = useDisplayList()

  function handleClose() {
    onOpenChange(false)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    shape.rotate(rotationAngle)

    editShapeFromDisplayList(shapeIndex, shape)

    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Editar objeto {shape.name}</DialogTitle>

          <div className="mt-4">
            <div className="space-y-1.5">
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
