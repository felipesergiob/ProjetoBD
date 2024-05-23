import { IProduct } from '@/entities/product'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useProducts(categoryId?: string) {
  return useQuery({
    queryKey: ['products', { categoryId }],
    queryFn: async () => {
      const { data } = await api.get<IProduct[]>(`/products`, {
        params: {
          ...(categoryId && { categoryId })
        }
      })

      return data
    }
  })
}
