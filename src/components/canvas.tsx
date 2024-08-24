import { useCanvas } from '../contexts/canvas-context'

export function Canvas() {
  const { canvasRef } = useCanvas()

  const width = window.innerWidth - 280
  const height = window.innerHeight - 72

  return (
    <canvas ref={canvasRef} height={height} width={width}>
      Seu browser não suporta o canvas
    </canvas>
  )
}
