import { Viewport } from '@/models/viewport'

interface TransformToViewportParams {
  worldX: number
  worldY: number
  viewport: Viewport
}

export function transformToViewport({
  worldX,
  worldY,
  viewport,
}: TransformToViewportParams) {
  const { height, width, zoom, offset } = viewport

  const viewportX = worldX * zoom + width / 2 + offset.x
  const viewportY = -worldY * zoom + height / 2 + offset.y

  return { x: viewportX, y: viewportY }
}
