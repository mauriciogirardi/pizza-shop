import { ROUTER_METRICS_MONTH_CANCELED_ORDERS_AMOUNT } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetMonthCanceledOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    ROUTER_METRICS_MONTH_CANCELED_ORDERS_AMOUNT,
  )

  return response.data
}
