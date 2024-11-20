import { Matrix } from './matrix'

interface ReflectParams {
  worldX: number
  worldY: number
  reflectX: boolean
  reflectY: boolean
}

export function reflect({ worldX, worldY, reflectX, reflectY }: ReflectParams) {
  let reflectionMatrix = new Matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])

  if (reflectX) {
    reflectionMatrix = new Matrix([
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, 1],
    ])
  }

  if (reflectY) {
    reflectionMatrix = reflectionMatrix.multiplyByMatrix(
      new Matrix([
        [-1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
    )
  }

  const pointVector = new Matrix([[worldX], [worldY], [1]])

  const reflectedPoint = reflectionMatrix.multiplyByMatrix(pointVector)

  return { x: reflectedPoint.data[0][0], y: reflectedPoint.data[1][0] }
}
