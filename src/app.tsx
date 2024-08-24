import { Canvas } from './components/canvas'
import { DisplayList } from './components/display-list'
import { Toolbar } from './components/toolbar'
import { CanvasContextProvider } from './contexts/canvas-context'

export function App() {
  return (
    <CanvasContextProvider>
      <div className="flex flex-col w-full h-[100dvh] overflow-hidden">
        <Toolbar />

        <div className="grid grid-cols-[280px_1fr] flex-1">
          <DisplayList />

          <Canvas />
        </div>
      </div>
    </CanvasContextProvider>
  )
}
