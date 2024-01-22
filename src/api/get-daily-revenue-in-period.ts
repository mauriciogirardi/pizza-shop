import { ROUTER_METRICS_DAILY_RECEIPT_IN_PERIOD } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

type GetDailyRevenueInPeriodProps = {
  from?: Date
  to?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodProps) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    ROUTER_METRICS_DAILY_RECEIPT_IN_PERIOD,
    {
      params: { from, to },
    },
  )
  return response.data
}
