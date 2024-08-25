import { useDisplayList } from '../contexts/display-list-context'

export function Canvas() {
  const { canvasRef } = useDisplayList()

  const width = window.innerWidth - 280
  const height = window.innerHeight - 72

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      className="bg-zinc-50"
    >
      Seu browser não suporta o canvas
    </canvas>
  )
}
