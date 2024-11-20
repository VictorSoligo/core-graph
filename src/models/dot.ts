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

export class Dot implements Shape {
  name: string
  coord: Coord
  config: ShapeConfig

  constructor(name: string, coord: Coord, config?: ShapeConfig) {
    this.name = name
    this.coord = coord
    this.config = config ?? { color: '#000', width: 1 }
  }

  rotate(degrees: number) {
    this.coord = rotate({ degrees, worldX: this.coord.x, worldY: this.coord.y })
  }

  rotateAroundPoint(degrees: number, pivotX: number, pivotY: number) {
    this.coord = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  rotateAroundCenter(degrees: number) {
    const { x: pivotX, y: pivotY } = calculateCentroid([this.coord])

    this.coord = rotateAroundPoint({
      degrees,
      pivotX,
      pivotY,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  translate(dx: number, dy: number) {
    this.coord = translate({
      dx,
      dy,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  scale(sx: number, sy: number) {
    this.coord = scale({
      sx,
      sy,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  scaleRelativeToOrigin(sx: number, sy: number) {
    this.coord = scaleRelativeToOrigin({
      sx,
      sy,
      originX: this.coord.x,
      originY: this.coord.y,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  reflect({ x, y }: { x: boolean; y: boolean }) {
    this.coord = reflect({
      reflectX: x,
      reflectY: y,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
  }

  shear(shX: number, shY: number) {
    this.coord = shear({
      gammaX: shX,
      gammaY: shY,
      worldX: this.coord.x,
      worldY: this.coord.y,
    })
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
