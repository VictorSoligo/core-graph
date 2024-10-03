interface TranslateParams {
  worldX: number
  worldY: number
  dx: number
  dy: number
}

export function translate({ worldX, worldY, dx, dy }: TranslateParams) {
  const translatedX = worldX + dx
  const translatedY = worldY + dy

  return { x: translatedX, y: translatedY }
}
