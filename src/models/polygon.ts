import { Coord } from '@/@types/coord'
import { Shape, ShapeConfig } from './shape'
import { Viewport } from './viewport'
import { transformToViewport } from '@/logic/transform-to-viewport'
import { rotate } from '@/logic/rotate'
import { translate } from '@/logic/translate'
import { scale } from '@/logic/scale'

export class Polygon implements Shape {
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

  translate(dx: number, dy: number) {
    const vertices = this.vertices.map((vertex) => {
      return translate({ dx, dy, worldX: vertex.x, worldY: vertex.y })
    })

    this.vertices = vertices
  }

  scale(sx: number, sy: number) {
    const vertices = this.vertices.map((vertex) => {
      return scale({ sx, sy, worldX: vertex.x, worldY: vertex.y })
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

    ctx.closePath()
    ctx.stroke()
  }
}
