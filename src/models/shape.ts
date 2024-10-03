import { Viewport } from './viewport'

export type ShapeConfig = {
  color: string
  width: number
}

export abstract class Shape {
  abstract name: string
  abstract config: ShapeConfig

  abstract rotate(degrees: number): void
  abstract translate(dx: number, dy: number): void

  abstract draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void
}
