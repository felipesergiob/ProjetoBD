export interface IOrder {
  id: number
  userId: number
  total: number
  createdAt: string
  ordersItems: {
    id: number
    productId: number
    quantity: number
    orderId: number
  }[]
}
