import { create } from 'zustand'

export interface ICart {
  productId: number
  quantity: number
}

type UseCart = {
  cart: ICart[]
  addItemToCart: (productId: number) => void
  removeItemFromCart: (productId: number) => void
  clearCart: () => void
}

export const useCart = create<UseCart>()(set => ({
  cart: [],
  clearCart: () => set({ cart: [] }),
  addItemToCart: (productId: number) =>
    set(state => {
      const productExists = state.cart.findIndex(
        item => item.productId === productId
      )

      if (productExists > -1) {
        return {
          cart: state.cart.map(item =>
            item.productId === productId
              ? {
                  productId,
                  quantity: item.quantity + 1
                }
              : item
          )
        }
      } else {
        return {
          cart: [...state.cart, { productId, quantity: 1 }]
        }
      }
    }),
  removeItemFromCart: (productId: number) =>
    set(state => {
      const productIsWith1 = state.cart.find(
        prod => prod.productId === productId
      )

      if (productIsWith1?.quantity === 1) {
        return {
          cart: state.cart.filter(item => item.productId !== productId)
        }
      } else {
        return {
          cart: state.cart.map(item =>
            item.productId === productId
              ? {
                  productId,
                  quantity: item.quantity - 1
                }
              : item
          )
        }
      }
    })

  // addItemToCart: (productId: string) =>
  //   set(({ cart }) =>
  //     cart.map(item =>
  //       item.productId === productId
  //         ? { productId: 1, quantity: 1 }
  //         : { productId, quantity: 0 }
  //     )
  //   )
}))
