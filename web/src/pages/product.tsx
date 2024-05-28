import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useProduct } from '@/hooks/use-product'
import { formatMoney } from '@/utils/format'

export function Product() {
  const params = useParams<{ id: string }>()
  const addItemToCart = useCart(item => item.addItemToCart)

  const { data: product } = useProduct(params.id ?? '')

  if (!product) {
    return <div>Carregando...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 flex flex-col gap-8">
      <div className="flex items-center text-muted-foreground gap-1">
        <Link to="/products">Produtos</Link>
        <ArrowRight className="w-4 h-4" />
        <Link to={`/products/${params.id}`}>{product.name}</Link>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[400px] rounded-lg object-contain bg-slate-50"
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium">{product.name}</h1>

            <strong className="text-3xl font-semibold">
              {formatMoney(product.price)}
            </strong>
          </div>

          {product.colors && product.colors.length > 0 && (
            <span className="text-sm text-gray-600">
              Cores: {product.colors.join(', ')}
            </span>
          )}

          <p className="text-muted-foreground">{product.description}</p>

          <Button
            onClick={() => {
              addItemToCart(product.id)
              toast.success(`Produto ${name} adicionado ao carrinho.`)
            }}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  )
}
