import { Minus, Plus, X } from 'lucide-react'
import { Button } from './ui/button'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer'
import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'
import { formatMoney } from '@/utils/format'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

type CartProps = {
  onOpenCart: (value: boolean) => void
}

export function Cart({ onOpenCart }: CartProps) {
  const cart = useCart(state => state.cart)
  const addItemToCart = useCart(state => state.addItemToCart)
  const removeItemFromCart = useCart(item => item.removeItemFromCart)

  const { data: products } = useProducts()

  const total = cart.reduce((acc, item) => {
    const product = products?.find(prod => prod.id === item.productId)

    return acc + (product?.price ?? 0) * item.quantity
  }, 0)

  return (
    <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[400px] rounded-none">
      {!products ? (
        <div className="grid place-items-center h-full w-full">
          <span>Carregando...</span>
        </div>
      ) : (
        <div className="mx-auto w-full flex flex-col max-w-sm h-full justify-between">
          <DrawerHeader className="relative flex-1 flex flex-col">
            <DrawerTitle>Carrinho</DrawerTitle>
            <DrawerDescription>
              Visualize todos os itens no seu carrinho.
            </DrawerDescription>

            <div className="mt-8 flex flex-col gap-6 overflow-y-scroll max-h-[70%]">
              {cart.map((cartItem, index) => {
                const product = products.find(
                  prod => prod.id === cartItem.productId
                )

                if (!product) {
                  return (
                    <div key={cartItem.productId} className="py-4 w-full">
                      <span>Ocorreu um erro.</span>
                    </div>
                  )
                }

                return (
                  <Fragment key={cartItem.productId}>
                    <div className="w-full flex gap-4">
                      <div className="p-1 w-24 rounded-xl border border-border object-cover">
                        <img
                          className="w-24 h-24 rounded-xl"
                          src={product.images[0]}
                        />
                      </div>

                      <div className="flex flex-col justify-between flex-1 py-2">
                        <div className="flex justify-between items-center">
                          <span>{product.name}</span>
                          <strong className="text-lg">
                            {formatMoney(product.price)}
                          </strong>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeItemFromCart(product.id)}
                            className="p-1 rounded-full border border-primary"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button
                            onClick={() => addItemToCart(product.id)}
                            className="p-1 rounded-full border border-primary"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {index !== cart.length - 1 && (
                      <div className="w-full h-[1px] bg-border"></div>
                    )}
                  </Fragment>
                )
              })}
            </div>

            <DrawerClose asChild className="absolute top-3 right-3">
              <Button variant="outline" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="w-full">
            <div className="w-full h-[1px] bg-border"></div>
            <div className="p-4 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">Total</p>
                <p className="font-medium">{formatMoney(total)}</p>
              </div>

              <Button asChild>
                <Link onClick={() => onOpenCart(false)} to="/checkout">
                  Finalizar compra
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </DrawerContent>
  )
}
