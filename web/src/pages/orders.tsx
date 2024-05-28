import { Button } from '@/components/ui/button'
import { IOrder } from '@/entities/order'
import { useAuth } from '@/hooks/use-auth'
import { useProducts } from '@/hooks/use-products'
import { api } from '@/lib/axios'
import { formatMoney } from '@/utils/format'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

export function Orders() {
  const { userInfo } = useAuth()

  const { data: orders } = useQuery({
    queryKey: ['orders', userInfo?.userId],
    queryFn: async () => {
      const { data } = await api.get<IOrder[]>(`/orders/${userInfo?.userId}`)

      return data
    },
    enabled: !!userInfo?.userId
  })

  const { data: products } = useProducts()

  if (!products || !orders) {
    return <div>Carregando...</div>
  }

  return (
    <div className="mx-auto max-w-4xl my-8 px-4 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">Pedidos</h1>
        <p className="text-muted-foreground">
          Visualize os seus pedidos mais recentes bem como os seus detalhes.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map(order => (
          <div
            key={order.id + '-order'}
            className="border border-border rounded-md"
          >
            <header className="p-4 border-b border-border flex items-center gap-12">
              <div className="flex flex-col gap-2">
                <span className="">Número do pedido</span>
                <small className="text-sm text-muted-foreground">
                  {order.id}
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <span className="">Data de Criação</span>
                <small className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <span className="">Total</span>
                <small className="text-sm text-muted-foreground">
                  {formatMoney(order.total)}
                </small>
              </div>
            </header>

            <div className="flex flex-col">
              {order.ordersItems.map((orderItem, index) => {
                const product = products.find(
                  prod => prod.id === orderItem.productId
                )

                if (!product) {
                  return <div key={orderItem.id}>Erro...</div>
                }

                return (
                  <Fragment key={orderItem.id}>
                    <div className="px-4 py-5 flex gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-40 h-40 rounded-md"
                      />
                      <div className="flex flex-col flex-1 justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <p>{product.name}</p>
                            <p>{formatMoney(product.price)}</p>
                          </div>

                          <p className="text-muted-foreground text-sm">
                            {product.description}
                          </p>
                        </div>
                        <div className="w-full flex gap-4 items-end justify-between">
                          <span className="text-sm text-muted-foreground">
                            {orderItem.quantity}{' '}
                            {orderItem.quantity === 1 ? 'item' : 'itens'}
                          </span>
                          <div className="flex items-stretch gap-4">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/products/${product.id}`}>
                                Ver produto
                              </Link>
                            </Button>

                            <div className="w-[2px] bg-primary"></div>

                            <Button size="sm" variant="outline">
                              Comprar novamente
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {index !== order.ordersItems.length - 1 && (
                      <div className="w-full h-[1px] bg-border"></div>
                    )}
                  </Fragment>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
