import { Matrix } from './matrix'

interface TranslateParams {
  worldX: number
  worldY: number
  dx: number
  dy: number
}

export function translate({ worldX, worldY, dx, dy }: TranslateParams) {
  const translationMatrix = new Matrix([
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1],
  ])

  const pointVector = [worldX, worldY, 1]

  const result = translationMatrix.multiplyByVector(pointVector)

  return { x: result[0], y: result[1] }
}
