import { Matrix } from './matrix'

interface RotateParams {
  worldX: number
  worldY: number
  degrees: number
}

export function rotate({ worldX, worldY, degrees }: RotateParams) {
  const angleInRadians = (degrees * Math.PI) / 180

  const rotationMatrix = new Matrix([
    [Math.cos(angleInRadians), -Math.sin(angleInRadians), 0],
    [Math.sin(angleInRadians), Math.cos(angleInRadians), 0],
    [0, 0, 1],
  ])

  const pointVector = new Matrix([[worldX], [worldY], [1]])

  const rotatedPoint = rotationMatrix.multiplyByMatrix(pointVector)

  return { x: rotatedPoint.data[0][0], y: rotatedPoint.data[1][0] }
}
