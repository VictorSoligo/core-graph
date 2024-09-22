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
  moveRight: () => void
  moveLeft: () => void
  moveUp: () => void
  moveDown: () => void
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
  const [offsetX, setOffsetX] = useState<number>(0)
  const [offsetY, setOffsetY] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvasWidth = canvasRef.current?.width ?? 0
  const canvasHeight = canvasRef.current?.height ?? 0

  const moveFactor = 10
  const zoomFactor = 1.2

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
    setZoom((prevZoom) => prevZoom * zoomFactor)
  }

  function zoomOut() {
    setZoom((prevZoom) => prevZoom / zoomFactor)
  }

  function moveViewport(dx: number, dy: number) {
    setOffsetX((prevX) => prevX - dx)
    setOffsetY((prevY) => prevY - dy)
  }

  function moveLeft() {
    moveViewport(-moveFactor, 0)
  }

  function moveRight() {
    moveViewport(moveFactor, 0)
  }

  function moveUp() {
    moveViewport(0, -moveFactor)
  }

  function moveDown() {
    moveViewport(0, moveFactor)
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
      offset: {
        x: offsetX,
        y: offsetY,
      },
    }

    displayList.forEach((shape) => shape.draw(ctx, viewport))
  }

  useEffect(() => {
    drawDisplayList()
  }, [displayList, zoom, offsetX, offsetY]) // eslint-disable-line

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
        moveLeft,
        moveRight,
        moveUp,
        moveDown,
      }}
    >
      {children}
    </DisplayListContext.Provider>
  )
}

export function useDisplayList() {
  return useContext(DisplayListContext)
}
