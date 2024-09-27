import { Shape as ShapeModel } from '@/models/shape'
import { EllipsisVertical } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Dot } from '@/models/dot'
import { Line } from '@/models/line'
import { ShapeCardDetails } from './shape-card-details'
import { Polygon } from '@/models/polygon'
import { Polyline } from '@/models/polyline'
import { EditShapeModal } from './edit-shape-modal'
import { useState } from 'react'

interface ShapeCardProps {
  shape: ShapeModel
  shapeIndex: number
  onRemove: () => void
}

export function ShapeCard({ shape, shapeIndex, onRemove }: ShapeCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function handleOpenEditShapeModal() {
    setIsEditModalOpen(true)
  }

  return (
    <li className="flex items-center justify-between p-4 border-b-2 hover:bg-zinc-50 transition-colors gap-x-2">
      <div className="flex flex-col flex-1 gap-1">
        <span
          className="font-semibold text-md break-all line-clamp-1"
          title={shape.name}
        >
          {shape.name}
        </span>

        {shape instanceof Dot && (
          <ShapeCardDetails text={`[${shape.coord.x} ; ${shape.coord.y}]`} />
        )}

        {shape instanceof Line && (
          <ShapeCardDetails
            text={`[${shape.from.x} ; ${shape.from.y}] -> [${shape.to.x} ; ${shape.to.y}]`}
          />
        )}

        {shape instanceof Polygon && (
          <ShapeCardDetails
            text={shape.vertices
              .map((vertex) => `[${vertex.x} ; ${vertex.y}]`)
              .join(' -> ')}
          />
        )}

        {shape instanceof Polyline && (
          <ShapeCardDetails
            text={shape.vertices
              .map((vertex) => `[${vertex.x} ; ${vertex.y}]`)
              .join(' -> ')}
          />
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpenEditShapeModal}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onRemove}>Remover</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditShapeModal
        shape={shape}
        shapeIndex={shapeIndex}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </li>
  )
}
