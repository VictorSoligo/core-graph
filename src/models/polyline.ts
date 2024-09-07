import { Coord } from '@/@types/coord'
import { Shape, ShapeConfig } from './shape'

export class Polyline implements Shape {
  name: string
  vertices: Coord[]
  config: ShapeConfig

  constructor(name: string, vertices: Coord[], config?: ShapeConfig) {
    this.name = name
    this.vertices = vertices
    this.config = config ?? { color: '#000', width: 1 }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.vertices.length < 3) {
      return
    }

    ctx.strokeStyle = this.config.color
    ctx.lineWidth = this.config.width

    ctx.beginPath()

    ctx.moveTo(this.vertices[0].x, this.vertices[0].y)
    this.vertices.forEach((vertex) => ctx.lineTo(vertex.x, vertex.y))

    ctx.stroke()
  }
}
