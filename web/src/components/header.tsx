import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, ShoppingCart } from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'

import { Button } from './ui/button'
import { Drawer, DrawerTrigger } from './ui/drawer'
import { Cart } from './cart'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { signOut, userId } = useAuth()

  return (
    <Drawer open={isCartOpen} onOpenChange={setIsCartOpen} direction="right">
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link className="font-bold text-xl" to="/">
            Logo
          </Link>

          <nav className="flex items-center gap-2">
            <Button size="sm" variant="ghost" asChild>
              <Link to="/products">Produtos</Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/orders">Pedidos</Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/favorites">Favoritos</Link>
            </Button>
          </nav>

          {userId ? (
            <div className="space-x-2">
              <Button onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </DrawerTrigger>
            </div>
          ) : (
            <Button asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </header>

      <Cart onOpenCart={setIsCartOpen} />
    </Drawer>
  )
}
