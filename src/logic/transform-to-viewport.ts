import { Viewport } from '@/models/viewport'

interface TransformToViewportParams {
  worldX: number
  worldY: number
  viewport: Viewport
  rotationAngle: number
}

export function transformToViewport({
  worldX,
  worldY,
  viewport,
  rotationAngle,
}: TransformToViewportParams) {
  const { zoom, offset } = viewport

  const angleInRadians = (rotationAngle * Math.PI) / 180

  const translatedX = worldX * zoom + offset.x
  const translatedY = -worldY * zoom + offset.y

  const rotatedX =
    translatedX * Math.cos(angleInRadians) -
    translatedY * Math.sin(angleInRadians)

  const rotatedY =
    translatedX * Math.sin(angleInRadians) +
    translatedY * Math.cos(angleInRadians)

  const viewportX = rotatedX + viewport.width / 2
  const viewportY = rotatedY + viewport.height / 2

  return { x: viewportX, y: viewportY }
}
