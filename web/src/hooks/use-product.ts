import { IProduct } from '@/entities/product'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: async () => {
      const { data } = await api.get<IProduct>(`/products/${productId}`)

      return data
    }
  })
}
