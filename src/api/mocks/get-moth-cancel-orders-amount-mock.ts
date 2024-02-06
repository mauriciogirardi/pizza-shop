import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_MONTH_CANCELED_ORDERS_AMOUNT } from '@/constants/route'

import { GetMonthCanceledOrdersAmountResponse } from '../get-month-canceled-orders-amount'

export const getMonthCancelOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>(ROUTER_METRICS_MONTH_CANCELED_ORDERS_AMOUNT, () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: 5,
  })
})
