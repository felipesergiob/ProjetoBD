import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

type MainStatsResponse = {
  lucro: number
  totalProdutos: number
  totalPedidos: number
}

type MonthlyStatsResponse = {
  month: string
  total: number
}[]

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data: main } = await api.get<MainStatsResponse>('/stats/main')
      const { data: monthly } =
        await api.get<MonthlyStatsResponse>('/stats/monthly')

      return {
        main,
        monthly
      }
    }
  })
}
