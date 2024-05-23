export interface IOrder {
  id: number
  userId: number
  total: number
  created_at: string
  ordersItems: {
    id: number
    productId: number
    quantity: number
    orderId: number
  }[]
}
