import { Coord } from '@/@types/coord'

export function calculateCentroid(vertices: Coord[]) {
  if (vertices.length === 0) {
    throw new Error('A lista de vértices está vazia')
  }

  const sum = vertices.reduce(
    (acc, vertex) => {
      acc.x += vertex.x
      acc.y += vertex.y
      return acc
    },
    { x: 0, y: 0 },
  )

  const n = vertices.length

  return { x: sum.x / n, y: sum.y / n }
}
