import { translate } from './translate'
import { scale } from './scale'

interface ScaleRelativeToOriginParams {
  worldX: number
  worldY: number
  originX: number
  originY: number
  sx: number
  sy: number
}

export function scaleRelativeToOrigin({
  worldX,
  worldY,
  originX,
  originY,
  sx,
  sy,
}: ScaleRelativeToOriginParams) {
  const { x: translatedX, y: translatedY } = translate({
    worldX,
    worldY,
    dx: -originX,
    dy: -originY,
  })

  const { x: scaledX, y: scaledY } = scale({
    worldX: translatedX,
    worldY: translatedY,
    sx,
    sy,
  })

  const { x: finalX, y: finalY } = translate({
    worldX: scaledX,
    worldY: scaledY,
    dx: originX,
    dy: originY,
  })

  return { x: finalX, y: finalY }
}
