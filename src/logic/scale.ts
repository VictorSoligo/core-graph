interface ScaleParams {
  worldX: number
  worldY: number
  sx: number
  sy: number
}

export function scale({ worldX, worldY, sx, sy }: ScaleParams) {
  const scaledX = worldX * sx
  const scaledY = worldY * sy

  return { x: scaledX, y: scaledY }
}
