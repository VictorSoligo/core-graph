import { useCanvas } from '../contexts/canvas-context'

export function Canvas() {
  const { canvasRef } = useCanvas()

  return (
    <canvas
      ref={canvasRef}
      height="600"
      width="600"
      className="border border-black"
    >
      Seu browser não suporta o canvas
    </canvas>
  )
}
