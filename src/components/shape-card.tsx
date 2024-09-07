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

interface ShapeCardProps {
  shape: ShapeModel
  onRemove: () => void
}

export function ShapeCard({ shape, onRemove }: ShapeCardProps) {
  return (
    <li className="flex items-center justify-between p-4 border-b-2 hover:bg-zinc-50 transition-colors gap-x-2">
      <div className="flex flex-col flex-1">
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
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={onRemove}>Remover</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}
