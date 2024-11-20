import { Viewport } from './viewport'

export type ShapeConfig = {
  color: string
  width: number
}

export abstract class Shape {
  abstract name: string
  abstract config: ShapeConfig

  abstract translate(dx: number, dy: number): void

  abstract rotate(degrees: number): void
  abstract rotateAroundPoint(
    degrees: number,
    pivotX: number,
    pivotY: number,
  ): void

  abstract scale(sx: number, sy: number): void
  abstract scaleRelativeToOrigin(sx: number, sy: number): void

  abstract reflect(axes: { x: boolean; y: boolean }): void

  abstract draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void
}
