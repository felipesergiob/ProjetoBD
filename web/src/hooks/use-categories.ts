import { useQuery } from '@tanstack/react-query'

import { ICategory } from '@/entities/category'
import { api } from '@/lib/axios'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<ICategory[]>('/categories')

      return data
    }
  })
}
