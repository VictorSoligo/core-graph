import { Matrix } from './matrix'

interface ShearParams {
  worldX: number
  worldY: number
  gammaX: number
  gammaY: number
}

export function shear({ worldX, worldY, gammaX, gammaY }: ShearParams) {
  const tanGammaX = Math.tan((gammaX * Math.PI) / 180)
  const tanGammaY = Math.tan((gammaY * Math.PI) / 180)

  const shearingMatrix = new Matrix([
    [1, tanGammaX, 0],
    [tanGammaY, 1, 0],
    [0, 0, 1],
  ])

  const pointVector = new Matrix([[worldX], [worldY], [1]])

  const shearedPoint = shearingMatrix.multiplyByMatrix(pointVector)

  return { x: shearedPoint.data[0][0], y: shearedPoint.data[1][0] }
}
