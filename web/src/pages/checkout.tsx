import { Fragment } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { useCart } from '@/hooks/use-cart'
import { useProducts } from '@/hooks/use-products'

import { formatMoney } from '@/utils/format'
import { Form } from '@/components/ui/form'
import { OrderInformation } from '@/components/order-information'
import { api } from '@/lib/axios'
import { useAuth } from '@/hooks/use-auth'

const createOrderFormSchema = z.object({
  street: z.string().min(1, {
    message: 'Rua é obrigatório.'
  }),
  neigbourhood: z.string().min(1, {
    message: 'Bairro é obrigatório.'
  }),
  number: z.string().min(1, {
    message: 'Número é obrigatório.'
  }),
  cep: z.string().min(1, {
    message: 'CEP é obrigatório.'
  }),
  complement: z.string().min(1, {
    message: 'Complemento é obrigatório.'
  }),
  city: z.string().min(1, {
    message: 'Cidade é obrigatório.'
  }),
  country: z.string().min(1, {
    message: 'País é obrigatório.'
  }),
  state: z.string().min(1, {
    message: 'Estado é obrigatório.'
  }),

  cardNumber: z.string().min(19, {
    message: 'Número do cartão é obrigatório.'
  }),
  cardName: z.string().min(1, {
    message: 'Nome do cartão é obrigatório.'
  }),
  expirationDate: z.string().min(5, {
    message: 'Data de expiração do cartão é obrigatória.'
  }),
  cvc: z.string().min(3, {
    message: 'CVC é obrigatório.'
  })
})

export type FormInput = z.infer<typeof createOrderFormSchema>

export function Checkout() {
  const form = useForm<FormInput>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      cep: '',
      city: '',
      complement: '',
      country: '',
      neigbourhood: '',
      number: '',
      state: '',
      street: ''
    }
  })

  const cart = useCart(state => state.cart)
  const { userId } = useAuth()

  const { data: products } = useProducts()

  if (!products) {
    return <span>Carregando...</span>
  }

  const total = cart.reduce((acc, item) => {
    const product = products?.find(prod => prod.id === item.productId)

    return acc + (product?.price ?? 0) * item.quantity
  }, 0)

  async function onSubmit(values: FormInput) {
    try {
      await api.post('/orders', {
        ...values,
        orderItems: cart,
        userId
      })
    } catch (error) {
      toast.error('Ocorreu um erro.', {
        description: 'Tente novamente mais tarde.'
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 grid grid-cols-2 gap-8">
      <Form {...form}>
        <form
          id="create-order-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <h2 className="text-xl font-medium">Informações de pagamento</h2>

          <div className="flex flex-col gap-6 border border-border p-4 rounded-xl">
            <OrderInformation control={form.control} />
          </div>
        </form>
      </Form>

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-medium">Resumo do pedido</h2>

        <div className="border border-border p-4 rounded-xl flex flex-col gap-6">
          {cart.map(cartItem => {
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
                  <img
                    className="w-20 h-20 rounded-md"
                    src={product.images[0]}
                  />

                  <div className="flex flex-col gap-2 justify-between flex-1 py-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {product.name}
                      </span>
                      <strong className="font-medium text-gray-800">
                        {formatMoney(product.price)}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">
                        {cartItem.quantity}{' '}
                        {cartItem.quantity === 1 ? 'item' : 'itens'}
                      </span>

                      <strong className="font-medium text-gray-800">
                        {formatMoney(product.price * cartItem.quantity)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-border"></div>
              </Fragment>
            )
          })}

          <div className="flex items-center justify-between">
            <p className="font-medium">Total</p>
            <p className="font-medium">{formatMoney(total)}</p>
          </div>

          <Button type="submit" form="create-order-form">
            Confirmar pedido
          </Button>
        </div>
      </div>
    </div>
  )
}
