import { ROUTER_METRICS_MONTH_ORDERS_AMOUNT } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetMonthOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    ROUTER_METRICS_MONTH_ORDERS_AMOUNT,
  )

  return response.data
}
