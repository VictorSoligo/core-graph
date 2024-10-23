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
import { Matrix } from '@/logic/matrix'

interface DisplayListContextData {
  canvasRef: RefObject<HTMLCanvasElement>
  displayList: Shape[]
  clearDisplayList: () => void
  addShapeToDisplayList: (shape: Shape) => void
  removeShapeFromDisplayList: (shapeIndex: number) => void
  editShapeFromDisplayList: (shapeIndex: number, shape: Shape) => void
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

  const defaultZoom = 1
  const defaultOffset = 0

  const [zoom, setZoom] = useState(defaultZoom)
  const [offsetX, setOffsetX] = useState<number>(defaultOffset)
  const [offsetY, setOffsetY] = useState<number>(defaultOffset)

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

  function editShapeFromDisplayList(shapeIndex: number, shape: Shape) {
    const newDisplayList = [...displayList]

    newDisplayList[shapeIndex] = shape

    setDisplayList(newDisplayList)
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

    setZoom(defaultZoom)
    setOffsetX(defaultOffset)
    setOffsetY(defaultOffset)

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

  useEffect(() => {
    const matrix1 = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ])

    const matrix2 = new Matrix([
      [7, 8],
      [9, 10],
      [11, 12],
    ])

    const resultMatrix = matrix1.multiplyByMatrix(matrix2)
    resultMatrix.print()

    const vector = [1, 2, 3]
    const resultVector = matrix1.multiplyByVector(vector)
    console.log(resultVector)
  }, [])

  return (
    <DisplayListContext.Provider
      value={{
        canvasRef,
        displayList,
        removeShapeFromDisplayList,
        addShapeToDisplayList,
        editShapeFromDisplayList,
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
