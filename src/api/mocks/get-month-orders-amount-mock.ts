import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_MONTH_ORDERS_AMOUNT } from '@/constants/route'

import { GetMonthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>(ROUTER_METRICS_MONTH_ORDERS_AMOUNT, () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  })
})
