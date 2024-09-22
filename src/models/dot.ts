import { transformToViewport } from '@/logic/transform-to-viewport'
import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'
import { Viewport } from './viewport'

export class Dot implements Shape {
  name: string
  coord: Coord
  config: ShapeConfig

  constructor(name: string, coord: Coord, config?: ShapeConfig) {
    this.name = name
    this.coord = coord
    this.config = config ?? { color: '#000', width: 1 }
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport) {
    ctx.fillStyle = this.config.color

    const { x, y } = transformToViewport({
      worldX: this.coord.x,
      worldY: this.coord.y,
      viewport,
    })

    ctx.beginPath()
    ctx.arc(x, y, this.config.width, 0, 2 * Math.PI)
    ctx.fill()
  }
}
