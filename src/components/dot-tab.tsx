import { useCanvas } from '@/contexts/canvas-context'
import { Dot } from '@/models/dot'
import { FormEvent, useState } from 'react'
import { AddShapeButton } from './add-shape-button'
import { InputWithLabel } from './input-with-label'
import { DialogFooter } from './ui/dialog'

interface DotTabProps {
  onClose: () => void
}

export function DotTab({ onClose }: DotTabProps) {
  const [name, setName] = useState('')
  const [x, setX] = useState('')
  const [y, setY] = useState('')

  const { addShapeToDisplayList } = useCanvas()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name || !x || !y) {
      return
    }

    const dot = new Dot(
      name,
      { x: Number(x), y: Number(y) },
      { width: 5, color: '#000' },
    )

    addShapeToDisplayList(dot)
    onClose()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputWithLabel
        label="Nome"
        id="name"
        placeholder="Nome do objeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="X"
          id="x"
          placeholder="Coordenada x"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />

        <InputWithLabel
          label="Y"
          id="y"
          placeholder="Coordenada y"
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>

      <DialogFooter>
        <AddShapeButton />
      </DialogFooter>
    </form>
  )
}
