import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_DAILY_RECEIPT_IN_PERIOD } from '@/constants/route'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>(ROUTER_METRICS_DAILY_RECEIPT_IN_PERIOD, () => {
  return HttpResponse.json([
    { date: '11/01/2024', receipt: 9000 },
    { date: '01/02/2024', receipt: 2000 },
    { date: '02/02/2024', receipt: 5000 },
    { date: '03/02/2024', receipt: 8500 },
    { date: '04/02/2024', receipt: 1000 },
    { date: '05/02/2024', receipt: 7600 },
  ])
})
