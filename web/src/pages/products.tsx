import { Filter, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { ProductSkeleton } from '@/components/product-skeleton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { useCategories } from '@/hooks/use-categories'
import { useProducts } from '@/hooks/use-products'
import { ProductCard } from '@/components/product-card'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId')

  const { data: products } = useProducts(categoryId ?? undefined)
  const { data: categories } = useCategories()

  function handleCheckedChange(checked: boolean | string, categoryId: number) {
    if (checked) {
      setSearchParams({ categoryId: String(categoryId) })
    } else {
      setSearchParams()
    }
  }

  return (
    <Drawer direction="right">
      <div className="max-w-6xl mx-auto px-4 my-8 flex flex-col gap-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-3xl">Produtos</h2>

            <DrawerTrigger asChild>
              <Button variant="outline" className="items-center gap-3">
                Personalizar
                <Filter className="w-4 h-4" />
              </Button>
            </DrawerTrigger>
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
                    images={product.images}
                    name={product.name}
                    price={product.price}
                  />
                ))}
          </div>
        </div>
      </div>

      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[400px] rounded-none">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="relative">
            <DrawerTitle>Filtros</DrawerTitle>
            <DrawerDescription>
              Personalize os filtros dos produtos.
            </DrawerDescription>

            <div className="flex flex-col gap-4 mt-12">
              <h3 className="font-medium">Categorias</h3>

              <div className="flex flex-col gap-3">
                {categories?.map(category => (
                  <div
                    key={category.id + 'category'}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category.name}
                      checked={categoryId === category.id.toString()}
                      onCheckedChange={value =>
                        handleCheckedChange(value, category.id)
                      }
                    />
                    <label
                      htmlFor={category.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

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
