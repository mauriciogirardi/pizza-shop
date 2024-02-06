import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_DAY_ORDERS_AMOUNT } from '@/constants/route'

import { GetDayOrdersAmountResponse } from '../get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>(ROUTER_METRICS_DAY_ORDERS_AMOUNT, () => {
  return HttpResponse.json({
    amount: 20,
    diffFromYesterday: -5,
  })
})
