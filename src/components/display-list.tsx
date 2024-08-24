import { useCanvas } from '@/contexts/canvas-context'
import { ShapeCard } from './shape-card'

export function DisplayList() {
  const { displayList, removeShapeFromDisplayList } = useCanvas()

  return (
    <div className="bg-white border-r-2 flex flex-col overflow-y-auto">
      <ul>
        {displayList.map((shape, index) => (
          <ShapeCard
            key={shape.name}
            shape={shape}
            onRemove={() => {
              removeShapeFromDisplayList(index)
            }}
          />
        ))}
      </ul>
    </div>
  )
}
