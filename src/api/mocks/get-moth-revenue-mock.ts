import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_MONTH_REVENUE } from '@/constants/route'

import { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>(ROUTER_METRICS_MONTH_REVENUE, () => {
  return HttpResponse.json({
    diffFromLastMonth: 8,
    receipt: 52,
  })
})
