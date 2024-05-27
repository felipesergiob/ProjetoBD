import { IAddress } from '@/entities/address'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useAddress(userId: number | undefined) {
  return useQuery({
    queryKey: ['address', userId],
    queryFn: async () => {
      const { data } = await api.get<IAddress>(`/address/${userId}`, {})

      return data
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}
