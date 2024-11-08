import { rotate } from './rotate'
import { translate } from './translate'

interface RotateAroundPointParams {
  worldX: number
  worldY: number
  degrees: number
  pivotX: number
  pivotY: number
}

export function rotateAroundPoint({
  worldX,
  worldY,
  degrees,
  pivotX,
  pivotY,
}: RotateAroundPointParams) {
  const translatedToOrigin = translate({
    worldX,
    worldY,
    dx: -pivotX,
    dy: -pivotY,
  })

  const rotatedPoint = rotate({
    worldX: translatedToOrigin.x,
    worldY: translatedToOrigin.y,
    degrees,
  })

  const finalPoint = translate({
    worldX: rotatedPoint.x,
    worldY: rotatedPoint.y,
    dx: pivotX,
    dy: pivotY,
  })

  return { x: finalPoint.x, y: finalPoint.y }
}
