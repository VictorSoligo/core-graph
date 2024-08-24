import { useCanvas } from '@/contexts/canvas-context'
import { Eraser, Plus } from 'lucide-react'
import { useState } from 'react'
import { ShapeModal } from './shape-modal'
import { Button } from './ui/button'

export function Toolbar() {
  const [isShapeModalOpen, setIsShapeModalOpen] = useState(false)

  const { clearDisplayList } = useCanvas()

  function handleOpenShapeModal() {
    setIsShapeModalOpen(true)
  }

  return (
    <>
      <header className="h-[72px] px-4 w-full flex gap-2 items-center bg-white border-b-2">
        <Button size="icon" onClick={handleOpenShapeModal}>
          <Plus className="h-5 w-5 text-white" />
        </Button>

        <Button size="icon" variant="destructive" onClick={clearDisplayList}>
          <Eraser className="h-5 w-5 text-white" />
        </Button>
      </header>

      <ShapeModal
        isOpen={isShapeModalOpen}
        onOpenChange={setIsShapeModalOpen}
      />
    </>
  )
}
