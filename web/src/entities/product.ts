export interface IProduct {
  id: number
  name: string
  description: string
  images: string[]
  categoryId: number
  price: number
  colors: string[] | null
}
