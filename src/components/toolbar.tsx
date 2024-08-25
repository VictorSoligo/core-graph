import { useDisplayList } from '@/contexts/display-list-context'
import {
  Eraser,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  Plus,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useState } from 'react'
import { ShapeModal } from './shape-modal'
import { ToolbarSeparator } from './toolbar-separator'
import { Button } from './ui/button'

export function Toolbar() {
  const [isShapeModalOpen, setIsShapeModalOpen] = useState(false)

  const { clearDisplayList } = useDisplayList()

  function handleOpenShapeModal() {
    setIsShapeModalOpen(true)
  }

  return (
    <>
      <header className="h-[72px] px-4 w-full flex gap-4 items-center bg-white border-b-2">
        <Button size="icon" onClick={handleOpenShapeModal}>
          <Plus className="size-5 text-white" />
        </Button>

        <ToolbarSeparator />

        <div className="flex gap-2">
          <Button size="icon" variant="secondary">
            <MoveLeft className="size-5" />
          </Button>

          <Button size="icon" variant="secondary">
            <MoveRight className="size-5" />
          </Button>

          <Button size="icon" variant="secondary">
            <MoveUp className="size-5" />
          </Button>

          <Button size="icon" variant="secondary">
            <MoveDown className="size-5" />
          </Button>
        </div>

        <ToolbarSeparator />

        <div className="flex gap-2">
          <Button size="icon" variant="secondary">
            <ZoomOut className="size-5" />
          </Button>

          <Button size="icon" variant="secondary">
            <ZoomIn className="size-5" />
          </Button>
        </div>

        <ToolbarSeparator />

        <Button size="icon" variant="destructive" onClick={clearDisplayList}>
          <Eraser className="size-5 text-white" />
        </Button>
      </header>

      <ShapeModal
        isOpen={isShapeModalOpen}
        onOpenChange={setIsShapeModalOpen}
      />
    </>
  )
}
