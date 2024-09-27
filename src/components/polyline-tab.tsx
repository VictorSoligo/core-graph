import { useDisplayList } from '@/contexts/display-list-context'
import { Polyline } from '@/models/polyline'
import { Plus, Trash } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { AddShapeButton } from './add-shape-button'
import { InputWithLabel } from './input-with-label'
import { Button } from './ui/button'
import { DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface PolylineTabProps {
  onClose: () => void
}

export function PolylineTab({ onClose }: PolylineTabProps) {
  const [name, setName] = useState('')
  const [vertices, setVertices] = useState<{ x: string; y: string }[]>([
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' },
  ])

  const { addShapeToDisplayList } = useDisplayList()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return
    }

    if (vertices.length < 3) {
      return
    }

    if (vertices.some((vertex) => !vertex.x || !vertex.y)) {
      return
    }

    const polyline = new Polyline(
      name,
      vertices.map((vertex) => {
        return { x: Number(vertex.x), y: Number(vertex.y) }
      }),
      0,
      { width: 1, color: '#000' },
    )

    addShapeToDisplayList(polyline)
    onClose()
  }

  function handleAddVertex() {
    setVertices((state) => [...state, { x: '', y: '' }])
  }

  function handleRemoveVertex(vertexIndex: number) {
    setVertices((state) => state.filter((_, i) => vertexIndex !== i))
  }

  function handleChangeXVertex(value: string, vertexIndex: number) {
    setVertices((state) =>
      state.map((vertex, i) => {
        if (i === vertexIndex) {
          return { ...vertex, x: value }
        }

        return vertex
      }),
    )
  }

  function handleChangeYVertex(value: string, vertexIndex: number) {
    setVertices((state) =>
      state.map((vertex, i) => {
        if (i === vertexIndex) {
          return { ...vertex, y: value }
        }

        return vertex
      }),
    )
  }

  const isRemoveVertexButtonDisabled = vertices.length === 3

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputWithLabel
        label="Nome"
        id="name"
        placeholder="Nome do objeto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Vértices</Label>

          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleAddVertex}
          >
            <Plus className="size-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {vertices.map((vertex, vertexIndex) => (
            <div className="flex gap-4" key={vertexIndex}>
              <Input
                id="x"
                className="flex flex-1"
                placeholder="Coordenada x"
                type="number"
                value={vertex.x}
                onChange={(e) =>
                  handleChangeXVertex(e.target.value, vertexIndex)
                }
              />

              <Input
                id="y"
                className="flex flex-1"
                placeholder="Coordenada y"
                type="number"
                value={vertex.y}
                onChange={(e) =>
                  handleChangeYVertex(e.target.value, vertexIndex)
                }
              />

              <Button
                type="button"
                size="icon"
                disabled={isRemoveVertexButtonDisabled}
                variant="outline"
                onClick={() => handleRemoveVertex(vertexIndex)}
              >
                <Trash className="size-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <DialogFooter>
        <AddShapeButton />
      </DialogFooter>
    </form>
  )
}
