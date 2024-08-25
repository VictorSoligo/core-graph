import { Canvas } from './components/canvas'
import { DisplayList } from './components/display-list'
import { Toolbar } from './components/toolbar'
import { DisplayListContextProvider } from './contexts/display-list-context'

export function App() {
  return (
    <DisplayListContextProvider>
      <div className="flex flex-col w-full h-[100dvh] overflow-hidden">
        <Toolbar />

        <div className="grid grid-cols-[280px_1fr] flex-1">
          <DisplayList />

          <Canvas />
        </div>
      </div>
    </DisplayListContextProvider>
  )
}
