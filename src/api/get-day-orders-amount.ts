import { ROUTER_METRICS_DAY_ORDERS_AMOUNT } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetDayOrdersAmountResponse = {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>(
    ROUTER_METRICS_DAY_ORDERS_AMOUNT,
  )

  return response.data
}
