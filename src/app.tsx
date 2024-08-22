import { Actions } from './components/actions'
import { Canvas } from './components/canvas'
import { CanvasContextProvider } from './contexts/canvas-context'

export function App() {
  return (
    <CanvasContextProvider>
      <div className="p-4 flex flex-col gap-4">
        <Actions />

        <Canvas />
      </div>
    </CanvasContextProvider>
  )
}
