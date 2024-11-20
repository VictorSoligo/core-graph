import { transformToViewport } from '@/logic/transform-to-viewport'
import { Coord } from '../@types/coord'
import { Shape, ShapeConfig } from './shape'
import { Viewport } from './viewport'
import { rotate } from '@/logic/rotate'
import { translate } from '@/logic/translate'
import { scale } from '@/logic/scale'
import { scaleRelativeToOrigin } from '@/logic/scale-relative-to-origin'
import { rotateAroundPoint } from '@/logic/rotate-around-point'
import { reflect } from '@/logic/reflect'
import { shear } from '@/logic/shear'
import { calculateCentroid } from '@/logic/calculate-centroid'

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

  rotateAroundPoint(degrees: number, pivotX: number, pivotY: number) {
    this.from = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.from.x,
      worldY: this.from.y,
    })

    this.to = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.to.x,
      worldY: this.to.y,
    })
  }

  rotateAroundCenter(degrees: number) {
    const { x: pivotX, y: pivotY } = calculateCentroid([this.from, this.to])

    this.from = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.from.x,
      worldY: this.from.y,
    })

    this.to = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.to.x,
      worldY: this.to.y,
    })
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

  scaleRelativeToCenter(sx: number, sy: number) {
    const { x, y } = calculateCentroid([this.to, this.from])

    this.from = scaleRelativeToOrigin({
      sx,
      sy,
      originX: x,
      originY: y,
      worldX: this.from.x,
      worldY: this.from.y,
    })

    this.to = scaleRelativeToOrigin({
      sx,
      sy,
      originX: x,
      originY: y,
      worldX: this.to.x,
      worldY: this.to.y,
    })
  }

  reflect({ x, y }: { x: boolean; y: boolean }) {
    this.to = reflect({
      reflectX: x,
      reflectY: y,
      worldX: this.to.x,
      worldY: this.to.y,
    })

    this.from = reflect({
      reflectX: x,
      reflectY: y,
      worldX: this.from.x,
      worldY: this.from.y,
    })
  }

  shear(shX: number, shY: number) {
    this.from = shear({
      gammaX: shX,
      gammaY: shY,
      worldX: this.from.x,
      worldY: this.from.y,
    })

    this.to = shear({
      gammaX: shX,
      gammaY: shY,
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
