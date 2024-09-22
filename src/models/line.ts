import { transformToViewport } from '@/logic/transform-to-viewport'
import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'
import { Viewport } from './viewport'

export class Line implements Shape {
  name: string
  from: Coord
  to: Coord
  config: ShapeConfig

  constructor(name: string, from: Coord, to: Coord, config?: ShapeConfig) {
    this.name = name
    this.from = from
    this.to = to
    this.config = config ?? { color: '#000', width: 1 }
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport) {
    ctx.strokeStyle = this.config.color
    ctx.lineWidth = this.config.width

    const { x: fromX, y: fromY } = transformToViewport({
      worldX: this.from.x,
      worldY: this.from.y,
      viewport,
    })

    const { x: toX, y: toY } = transformToViewport({
      worldX: this.to.x,
      worldY: this.to.y,
      viewport,
    })

    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()
  }
}
