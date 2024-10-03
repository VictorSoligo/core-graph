import { Coord } from '@/@types/coord'
import { Shape, ShapeConfig } from './shape'
import { transformToViewport } from '@/logic/transform-to-viewport'
import { Viewport } from './viewport'
import { rotate } from '@/logic/rotate'

export class Polyline implements Shape {
  name: string
  vertices: Coord[]
  config: ShapeConfig

  constructor(name: string, vertices: Coord[], config?: ShapeConfig) {
    this.name = name
    this.vertices = vertices
    this.config = config ?? { color: '#000', width: 1 }
  }

  rotate(degrees: number) {
    const vertices = this.vertices.map((vertex) => {
      return rotate({ degrees, worldX: vertex.x, worldY: vertex.y })
    })

    this.vertices = vertices
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport) {
    if (this.vertices.length < 3) {
      return
    }

    const { x: initialX, y: initialY } = transformToViewport({
      worldX: this.vertices[0].x,
      worldY: this.vertices[0].y,
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
        viewport,
      })

      ctx.lineTo(x, y)
    })

    ctx.stroke()
  }
}
