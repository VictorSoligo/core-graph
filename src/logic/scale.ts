import { Matrix } from './matrix'

interface ScaleParams {
  worldX: number
  worldY: number
  sx: number
  sy: number
}

export function scale({ worldX, worldY, sx, sy }: ScaleParams) {
  const scalingMatrix = new Matrix([
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ])

  const pointVector = new Matrix([[worldX], [worldY], [1]])

  const scaledPoint = scalingMatrix.multiplyByMatrix(pointVector)

  return { x: scaledPoint.data[0][0], y: scaledPoint.data[1][0] }
}
