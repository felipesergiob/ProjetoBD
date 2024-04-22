import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { ShoppingCart, X } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'

export function Header() {
  return (
    <Drawer direction="right">
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1>Nome</h1>

          <nav className="flex items-center gap-2">
            <Button size="sm" variant="ghost" asChild>
              <Link to="/">Produtos</Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/">Pedidos</Link>
            </Button>
          </nav>

          <DrawerTrigger asChild>
            <Button size="sm">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
        </div>
      </header>

      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[400px] rounded-none">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="relative">
            <DrawerTitle>Carrinho</DrawerTitle>
            <DrawerDescription>
              Visualize todos os itens no seu carrinho.
            </DrawerDescription>

            <DrawerClose asChild className="absolute top-3 right-3">
              <Button variant="outline" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
