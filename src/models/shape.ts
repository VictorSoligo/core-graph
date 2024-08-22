export type ShapeConfig = {
  color: string
  width: number
}

export abstract class Shape {
  abstract name: string
  abstract config: ShapeConfig

  abstract draw(ctx: CanvasRenderingContext2D): void
}
