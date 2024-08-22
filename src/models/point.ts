import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'

export class Point implements Shape {
  name: string
  coord: Coord
  config: ShapeConfig

  constructor(name: string, coord: Coord, config?: ShapeConfig) {
    this.name = name
    this.coord = coord
    this.config = config ?? { color: '#000', width: 1 }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.config.color

    ctx.beginPath()
    ctx.arc(this.coord.x, this.coord.y, this.config.width, 0, 2 * Math.PI)
    ctx.fill()
  }
}
