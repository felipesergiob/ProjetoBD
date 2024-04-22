import { Header } from '@/components/header'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { faker } from '@faker-js/faker'

export function Home() {
  const products = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.urlPicsumPhotos()
  }))

  return (
    <div>
      <Header />

      <div className="bg-primary h-[600px] w-full"></div>

      <div className="max-w-6xl mx-auto px-4 my-24 flex flex-col gap-32">
        <Section title="Categorias">
          <div className="grid grid-cols-4 gap-8">
            <div className="border border-border p-4 rounded-md flex flex-col gap-4">
              <h3 className="font-semibold text-lg">Sapatos</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Debitis iure nulla quasi.
              </p>
              <Button size="sm" asChild>
                <Link to="/">Ver mais</Link>
              </Button>
            </div>
          </div>
        </Section>

        <Section title="Produtos">
          <div className="grid grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48"
                />
                <div className="p-4 flex flex-col gap-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {product.description}
                  </span>

                  <strong>R$ {product.price}</strong>

                  <Button>Adicionar ao carrinho</Button>
                </div>
              </div>
            ))}
            {/* <div className="border border-border p-4 rounded-md flex flex-col gap-4">
              <h3 className="font-semibold text-lg">Sapatos</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Debitis iure nulla quasi.
              </p>
              <Button size="sm" asChild>
                <Link to="/">Ver mais</Link>
              </Button>
            </div> */}
          </div>
        </Section>
      </div>
    </div>
  )
}
