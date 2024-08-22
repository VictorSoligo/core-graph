import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'

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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.config.color
    ctx.lineWidth = this.config.width

    ctx.beginPath()
    ctx.moveTo(this.from.x, this.from.y)
    ctx.lineTo(this.to.x, this.to.y)
    ctx.stroke()
  }
}
