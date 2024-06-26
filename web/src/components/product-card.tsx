import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

import { formatMoney } from '@/utils/format'

import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useFavorites } from '@/hooks/use-favorites'

type ProductCardProps = {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  colors: string[] | null
}

export function ProductCard({
  description,
  id,
  name,
  price,
  images,
  colors
}: ProductCardProps) {
  const addItemToCart = useCart(state => state.addItemToCart)
  const { userInfo } = useAuth()
  const queryClient = useQueryClient()
  const { data: products } = useFavorites()
  const navigate = useNavigate()

  const favorites = products ? products.map(item => item.id) : []

  const favoriteProductMutation = useMutation({
    mutationFn: async () => {
      return api.post('/favorites', {
        userId: userInfo?.userId,
        productId: id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userInfo?.userId]
      })

      toast.success(`Produto ${name} favoritado com sucesso`)
    }
  })

  return (
    <div className="rounded-md overflow-hidden">
      <button
        onClick={event => {
          event.stopPropagation()
          navigate(`/products/${id}`)
        }}
        className="group w-full"
      >
        <div className="relative z-50 w-full h-96">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-96 group-hover:opacity-60 transition-all absolute"
          />
          <Button
            onClick={event => {
              event.stopPropagation()
              favoriteProductMutation.mutateAsync()
            }}
            type="button"
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 z-50"
          >
            {favorites.includes(id) ? (
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            ) : (
              <Heart className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-between items-start mt-2">
          <div className="text-start">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-sm text-muted-foreground">{description}</span>

            {colors && colors.length > 0 && (
              <span>Cores: {colors.join(', ')}</span>
            )}
          </div>
          <strong>{formatMoney(price)}</strong>
        </div>
      </button>
      <Button
        className="mt-6 w-full"
        onClick={() => {
          addItemToCart(id)
          toast.success(`Produto ${name} adicionado ao carrinho.`)
        }}
      >
        Adicionar ao carrinho
      </Button>
    </div>
  )
}
