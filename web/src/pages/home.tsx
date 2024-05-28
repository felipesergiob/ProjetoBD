import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/hooks/use-products'
import { ProductSkeleton } from '@/components/product-skeleton'
import { useCategories } from '@/hooks/use-categories'
import { ProductCard } from '@/components/product-card'

export function Home() {
  const { data: categories } = useCategories()
  const { data: products } = useProducts()

  return (
    <>
      <div className="bg-primary h-[600px] w-full flex items-center">
        <div className="max-w-6xl grid grid-cols-2 items-center justify-center gap-8 mx-auto">
          <div className="flex flex-col gap-8 text-white">
            <h1 className="text-5xl">MELHORES PRODUTOS DO MERCADO</h1>
            <span className="text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam ipsa, enim consequuntur doloribus inventore sint quia
              sit, deserunt repudiandae aperiam repellendus numquam minus natus
              labore facilis nihil iusto vero placeat!
            </span>
          </div>
          <img
            className="w-full h-96"
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTN8WRdNp-v28S2xyUpTtyr7ACqFDTczqDRQYgI0Kb-RzW5oI8yps-wku8KCQ4dHUMbhyPChjA55SLFjmOWeLceRijfeuSmeNrbl5DrLoOM7wSSX9LxR3NiKQ&usqp=CAE%27"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 my-24 flex flex-col gap-24">
        <Section title="Categorias">
          <div className="grid grid-cols-4 gap-8">
            {!categories
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index + 'skeleton'}
                    className="border border-border p-4 rounded-md flex flex-col gap-4"
                  >
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))
              : categories.map(category => (
                  <div
                    key={category.id}
                    className="border border-border p-4 rounded-md flex flex-col gap-4"
                  >
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <Button size="sm" asChild>
                      <Link to={`/products?categoryId=${category.id}`}>
                        Ver mais
                      </Link>
                    </Button>
                  </div>
                ))}
          </div>
        </Section>

        <Section href="/products" title="Produtos">
          <div className="grid grid-cols-3 gap-8">
            {!products
              ? Array.from({ length: 4 }).map((_, index) => (
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
                    colors={product.colors}
                  />
                ))}
          </div>
        </Section>
      </div>
    </>
  )
}
