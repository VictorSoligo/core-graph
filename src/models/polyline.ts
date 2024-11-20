import { Coord } from '@/@types/coord'
import { Shape, ShapeConfig } from './shape'
import { transformToViewport } from '@/logic/transform-to-viewport'
import { Viewport } from './viewport'
import { rotate } from '@/logic/rotate'
import { translate } from '@/logic/translate'
import { scale } from '@/logic/scale'
import { scaleRelativeToOrigin } from '@/logic/scale-relative-to-origin'
import { rotateAroundPoint } from '@/logic/rotate-around-point'
import { reflect } from '@/logic/reflect'
import { shear } from '@/logic/shear'

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

  rotateAroundPoint(degrees: number, pivotX: number, pivotY: number) {
    const vertices = this.vertices.map((vertex) => {
      return rotateAroundPoint({
        degrees,
        pivotX,
        pivotY,
        worldX: vertex.x,
        worldY: vertex.y,
      })
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

  scaleRelativeToOrigin(sx: number, sy: number) {
    const vertices = this.vertices.map((vertex) => {
      return scaleRelativeToOrigin({
        sx,
        sy,
        originX: this.vertices[0].x,
        originY: this.vertices[0].y,
        worldX: vertex.x,
        worldY: vertex.y,
      })
    })

    this.vertices = vertices
  }

  reflect({ x, y }: { x: boolean; y: boolean }) {
    const vertices = this.vertices.map((vertex) => {
      return reflect({
        reflectX: x,
        reflectY: y,
        worldX: vertex.x,
        worldY: vertex.y,
      })
    })

    this.vertices = vertices
  }

  shear(shX: number, shY: number) {
    const vertices = this.vertices.map((vertex) => {
      return shear({
        gammaX: shX,
        gammaY: shY,
        worldX: vertex.x,
        worldY: vertex.y,
      })
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
