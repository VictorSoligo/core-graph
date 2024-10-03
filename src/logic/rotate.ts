interface RotateParams {
  worldX: number
  worldY: number
  degrees: number
}

export function rotate({ worldX, worldY, degrees }: RotateParams) {
  const angleInRadians = (degrees * Math.PI) / 180

  const rotatedX =
    worldX * Math.cos(angleInRadians) - worldY * Math.sin(angleInRadians)

  const rotatedY =
    worldX * Math.sin(angleInRadians) + worldY * Math.cos(angleInRadians)

  return { x: rotatedX, y: rotatedY }
}
