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

interface DisplayListContextData {
  canvasRef: RefObject<HTMLCanvasElement>
  displayList: Shape[]
  clearDisplayList: () => void
  addShapeToDisplayList: (shape: Shape) => void
  removeShapeFromDisplayList: (shapeIndex: number) => void
}

interface DisplayListContextProviderProps {
  children: ReactNode
}

const DisplayListContext = createContext({} as DisplayListContextData)

export function DisplayListContextProvider({
  children,
}: DisplayListContextProviderProps) {
  const [displayList, setDisplayList] = useState<Shape[]>([])
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

    // limpa o canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // transforma em plano cartesiano
    ctx.translate(canvasWidth / 2, canvasHeight / 2)
    ctx.scale(1, -1)

    displayList.forEach((shape) => shape.draw(ctx))
  }

  useEffect(() => {
    drawDisplayList()
  }, [displayList]) // eslint-disable-line

  return (
    <DisplayListContext.Provider
      value={{
        canvasRef,
        displayList,
        removeShapeFromDisplayList,
        addShapeToDisplayList,
        clearDisplayList,
      }}
    >
      {children}
    </DisplayListContext.Provider>
  )
}

export function useDisplayList() {
  return useContext(DisplayListContext)
}
