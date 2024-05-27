import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { IProduct } from '@/entities/product'

import { useAuth } from './use-auth'

export function useFavorites() {
  const { userInfo } = useAuth()

  return useQuery({
    queryKey: ['favorites', userInfo?.userId],
    queryFn: async () => {
      const { data } = await api.get<IProduct[]>(
        `/favorites/${userInfo?.userId}`
      )

      return data
    },
    enabled: !!userInfo?.userId,
    staleTime: 1000 * 60 * 5
  })
}
