import { useCanvas } from '../contexts/canvas-context'
import { Line } from '../models/line'
import { Point } from '../models/point'

export function Actions() {
  const {
    addShapeToDisplayList,
    clearDisplayList,
    removeShapeFromDisplayList,
  } = useCanvas()

  function addLineShapeToDisplayList() {
    const line = new Line('Linha', { x: 20, y: 20 }, { x: 20, y: 100 })

    addShapeToDisplayList(line)
  }

  function addPointToDisplayList() {
    const point = new Point('Point', { x: 50, y: 50 })

    addShapeToDisplayList(point)
  }

  return (
    <div className="flex gap-4">
      <button onClick={clearDisplayList}>Clear</button>

      <button onClick={() => removeShapeFromDisplayList(0)}>Remove</button>

      <button onClick={addLineShapeToDisplayList} type="button">
        Draw line
      </button>

      <button onClick={addPointToDisplayList} type="button">
        Draw point
      </button>
    </div>
  )
}
