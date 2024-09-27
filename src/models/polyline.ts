import { Coord } from '@/@types/coord'
import { Shape, ShapeConfig } from './shape'
import { transformToViewport } from '@/logic/transform-to-viewport'
import { Viewport } from './viewport'

export class Polyline implements Shape {
  name: string
  vertices: Coord[]
  rotationAngle: number
  config: ShapeConfig

  constructor(
    name: string,
    vertices: Coord[],
    rotationAngle: number,
    config?: ShapeConfig,
  ) {
    this.name = name
    this.vertices = vertices
    this.rotationAngle = rotationAngle
    this.config = config ?? { color: '#000', width: 1 }
  }

  rotate(degrees: number) {
    this.rotationAngle = degrees
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport) {
    if (this.vertices.length < 3) {
      return
    }

    const { x: initialX, y: initialY } = transformToViewport({
      worldX: this.vertices[0].x,
      worldY: this.vertices[0].y,
      rotationAngle: this.rotationAngle,
      viewport,
    })

    ctx.strokeStyle = this.config.color
    ctx.lineWidth = this.config.width

    ctx.beginPath()

    ctx.moveTo(initialX, initialY)

    this.vertices.forEach((vertex) => {
      const { x, y } = transformToViewport({
        worldX: vertex.x,
        worldY: vertex.y,
        rotationAngle: this.rotationAngle,
        viewport,
      })

      ctx.lineTo(x, y)
    })

    ctx.stroke()
  }
}
