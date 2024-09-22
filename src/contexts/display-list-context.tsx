import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Shape } from '../models/shape'
import { Viewport } from '@/models/viewport'

interface DisplayListContextData {
  canvasRef: RefObject<HTMLCanvasElement>
  displayList: Shape[]
  clearDisplayList: () => void
  addShapeToDisplayList: (shape: Shape) => void
  removeShapeFromDisplayList: (shapeIndex: number) => void
  zoomIn: () => void
  zoomOut: () => void
}

interface DisplayListContextProviderProps {
  children: ReactNode
}

const DisplayListContext = createContext({} as DisplayListContextData)

export function DisplayListContextProvider({
  children,
}: DisplayListContextProviderProps) {
  const [displayList, setDisplayList] = useState<Shape[]>([])
  const [zoom, setZoom] = useState(1)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvasWidth = canvasRef.current?.width ?? 0
  const canvasHeight = canvasRef.current?.height ?? 0

  function addShapeToDisplayList(shape: Shape) {
    setDisplayList((state) => [...state, shape])
  }

  function removeShapeFromDisplayList(shapeIndex: number) {
    if (displayList.length === 0) {
      return
    }

    setDisplayList((state) => state.toSpliced(shapeIndex, 1))
  }

  function zoomIn() {
    setZoom((prevZoom) => prevZoom * 1.2)
  }

  function zoomOut() {
    setZoom((prevZoom) => prevZoom / 1.2)
  }

  function clearDisplayList() {
    if (displayList.length === 0) {
      return
    }

    setDisplayList([])
  }

  function drawDisplayList() {
    if (!canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    const viewport: Viewport = {
      height: canvasHeight,
      width: canvasWidth,
      zoom,
    }

    displayList.forEach((shape) => shape.draw(ctx, viewport))
  }

  useEffect(() => {
    drawDisplayList()
  }, [displayList, zoom]) // eslint-disable-line

  return (
    <DisplayListContext.Provider
      value={{
        canvasRef,
        displayList,
        removeShapeFromDisplayList,
        addShapeToDisplayList,
        clearDisplayList,
        zoomIn,
        zoomOut,
      }}
    >
      {children}
    </DisplayListContext.Provider>
  )
}

export function useDisplayList() {
  return useContext(DisplayListContext)
}
