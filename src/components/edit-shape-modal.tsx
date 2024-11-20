import { Shape } from '@/models/shape'
import { RotationTab } from './rotation-tab'
import { ScaleTab } from './scale-tab'
import { Dialog, DialogContent } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { TranslationTab } from './translation-tab'
import { ReflectionTab } from './reflection-tab'
import { ShearingTab } from './shearing-tab'

interface EditShapeModalProps {
  shape: Shape
  shapeIndex: number
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function EditShapeModal({
  isOpen,
  shapeIndex,
  onOpenChange,
  shape,
}: EditShapeModalProps) {
  function handleClose() {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <Tabs defaultValue="shearing">
          <TabsList>
            <TabsTrigger value="shearing">Cisalhamento</TabsTrigger>
            <TabsTrigger value="scale">Escalonamento</TabsTrigger>
            <TabsTrigger value="reflection">Reflexão</TabsTrigger>
            <TabsTrigger value="rotation">Rotação</TabsTrigger>
            <TabsTrigger value="translation">Translação</TabsTrigger>
          </TabsList>

          <TabsContent value="shearing">
            <ShearingTab
              shape={shape}
              shapeIndex={shapeIndex}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="scale">
            <ScaleTab
              shape={shape}
              shapeIndex={shapeIndex}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="rotation">
            <RotationTab
              shape={shape}
              shapeIndex={shapeIndex}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="reflection">
            <ReflectionTab
              shape={shape}
              shapeIndex={shapeIndex}
              onClose={handleClose}
            />
          </TabsContent>

          <TabsContent value="translation">
            <TranslationTab
              shape={shape}
              shapeIndex={shapeIndex}
              onClose={handleClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
