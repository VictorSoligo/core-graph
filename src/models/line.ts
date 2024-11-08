import { transformToViewport } from '@/logic/transform-to-viewport'
import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'
import { Viewport } from './viewport'
import { rotate } from '@/logic/rotate'
import { translate } from '@/logic/translate'
import { scale } from '@/logic/scale'
import { scaleRelativeToOrigin } from '@/logic/scale-relative-to-origin'

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

  rotate(degrees: number) {
    this.to = rotate({ degrees, worldX: this.to.x, worldY: this.to.y })
    this.from = rotate({ degrees, worldX: this.from.x, worldY: this.from.y })
  }

  translate(dx: number, dy: number) {
    this.to = translate({ dx, dy, worldX: this.to.x, worldY: this.to.y })
    this.from = translate({ dx, dy, worldX: this.from.x, worldY: this.from.y })
  }

  scale(sx: number, sy: number) {
    this.to = scale({ sx, sy, worldX: this.to.x, worldY: this.to.y })
    this.from = scale({ sx, sy, worldX: this.from.x, worldY: this.from.y })
  }

  scaleRelativeToOrigin(sx: number, sy: number) {
    const originX = this.from.x
    const originY = this.from.y

    this.from = scaleRelativeToOrigin({
      sx,
      sy,
      originX,
      originY,
      worldX: this.from.x,
      worldY: this.from.y,
    })

    this.to = scaleRelativeToOrigin({
      sx,
      sy,
      originX,
      originY,
      worldX: this.to.x,
      worldY: this.to.y,
    })
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
