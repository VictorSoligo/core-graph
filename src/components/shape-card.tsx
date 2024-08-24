import { Shape as ShapeModel } from '@/models/shape'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'

interface ShapeCardProps {
  shape: ShapeModel
  onRemove: () => void
}

export function ShapeCard({ shape, onRemove }: ShapeCardProps) {
  return (
    <li className="flex items-center justify-between p-4 border-b-2 ">
      <span className="font-semibold">{shape.name}</span>

      <Button variant="outline" size="icon">
        <Trash2 className="h-4 w-4 text-red-400" onClick={onRemove} />
      </Button>
    </li>
  )
}
