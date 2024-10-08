import { DotTab } from './dot-tab'
import { LineTab } from './line-tab'
import { PolygonTab } from './polygon-tab'
import { PolylineTab } from './polyline-tab'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
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
        <DialogTitle>Novo objeto</DialogTitle>

        <Tabs defaultValue="dot">
          <TabsList>
            <TabsTrigger value="dot">Ponto</TabsTrigger>
            <TabsTrigger value="line">Linha</TabsTrigger>
            <TabsTrigger value="polyline">Polilinha</TabsTrigger>
            <TabsTrigger value="polygon">Polígono</TabsTrigger>
          </TabsList>

          <TabsContent value="dot">
            <DotTab onClose={handleClose} />
          </TabsContent>

          <TabsContent value="line">
            <LineTab onClose={handleClose} />
          </TabsContent>

          <TabsContent value="polygon">
            <PolygonTab onClose={handleClose} />
          </TabsContent>

          <TabsContent value="polyline">
            <PolylineTab onClose={handleClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
