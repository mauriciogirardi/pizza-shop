import { ROUTER_METRICS_MONTH_REVENUE } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetMonthRevenueResponse = {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(
    ROUTER_METRICS_MONTH_REVENUE,
  )

  return response.data
}
