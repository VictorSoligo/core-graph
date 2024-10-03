import { useDisplayList } from '@/contexts/display-list-context'
import { Line } from '@/models/line'
import { FormEvent, useState } from 'react'
import { AddShapeButton } from './add-shape-button'
import { InputWithLabel } from './input-with-label'
import { DialogFooter } from './ui/dialog'

interface LineTabProps {
  onClose: () => void
}

export function LineTab({ onClose }: LineTabProps) {
  const [name, setName] = useState('')
  const [fromX, setFromX] = useState('')
  const [fromY, setFromY] = useState('')
  const [toX, setToX] = useState('')
  const [toY, setToY] = useState('')

  const { addShapeToDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name || !fromX || !fromY || !toX || !toY) {
      return
    }

    const line = new Line(
      name,
      { x: Number(fromX), y: Number(fromY) },
      { x: Number(toX), y: Number(toY) },
      { width: 5, color: '#000' },
    )

    addShapeToDisplayList(line)
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
          label="Início x"
          id="from-x"
          placeholder="Coordenada x"
          type="number"
          value={fromX}
          onChange={(e) => setFromX(e.target.value)}
        />

        <InputWithLabel
          label="Início y"
          id="from-y"
          placeholder="Coordenada y"
          type="number"
          value={fromY}
          onChange={(e) => setFromY(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel
          label="Fim x"
          id="to-x"
          placeholder="Coordenada x"
          type="number"
          value={toX}
          onChange={(e) => setToX(e.target.value)}
        />

        <InputWithLabel
          label="Fim y"
          id="to-y"
          placeholder="Coordenada y"
          type="number"
          value={toY}
          onChange={(e) => setToY(e.target.value)}
        />
      </div>

      <DialogFooter>
        <AddShapeButton />
      </DialogFooter>
    </form>
  )
}
