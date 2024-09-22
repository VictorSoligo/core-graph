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
  const { height, width, zoom } = viewport

  const viewportX = worldX * zoom + width / 2
  const viewportY = -worldY * zoom + height / 2

  return { x: viewportX, y: viewportY }
}
