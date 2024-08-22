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

interface CanvasContextData {
  canvasRef: RefObject<HTMLCanvasElement>
  displayList: Shape[]
  clearDisplayList: () => void
  addShapeToDisplayList: (shape: Shape) => void
  removeShapeFromDisplayList: (shapeIndex: number) => void
}

interface CanvasContextProviderProps {
  children: ReactNode
}

const CanvasContext = createContext({} as CanvasContextData)

export function CanvasContextProvider({
  children,
}: CanvasContextProviderProps) {
  const [displayList, setDisplayList] = useState<Shape[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function addShapeToDisplayList(shape: Shape) {
    setDisplayList((state) => [...state, shape])
  }

  function removeShapeFromDisplayList(shapeIndex: number) {
    if (displayList.length === 0) {
      return
    }

    const newShapes = displayList.toSpliced(shapeIndex, 1)

    setDisplayList(newShapes)
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

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    displayList.forEach((shape) => {
      shape.draw(ctx)
    })
  }

  useEffect(() => {
    drawDisplayList()
  }, [displayList]) // eslint-disable-line

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        displayList,
        removeShapeFromDisplayList,
        addShapeToDisplayList,
        clearDisplayList,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export function useCanvas() {
  return useContext(CanvasContext)
}
