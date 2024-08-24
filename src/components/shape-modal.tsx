import { DotTab } from './dot-tab'
import { LineTab } from './line-tab'
import { Dialog, DialogContent } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface ShapeModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function ShapeModal({ isOpen, onOpenChange }: ShapeModalProps) {
  function handleClose() {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <Tabs defaultValue="dot" className="min-w-max">
          <TabsList>
            <TabsTrigger value="dot">Ponto</TabsTrigger>
            <TabsTrigger value="line">Linha</TabsTrigger>
          </TabsList>

          <TabsContent value="dot">
            <DotTab onClose={handleClose} />
          </TabsContent>

          <TabsContent value="line">
            <LineTab onClose={handleClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
