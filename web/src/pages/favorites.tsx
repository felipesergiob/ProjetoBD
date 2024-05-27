import { ProductCard } from '@/components/product-card'
import { ProductSkeleton } from '@/components/product-skeleton'
import { useFavorites } from '@/hooks/use-favorites'

export function Favorites() {
  const { data: products } = useFavorites()

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 flex flex-col gap-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl">Favoritos</h2>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {!products
            ? Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index + 'skeleton' + 'product'} />
              ))
            : products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  description={product.description}
                  images={product.images ?? ''}
                  name={product.name}
                  price={product.price}
                />
              ))}
        </div>
      </div>
    </div>
  )
}
