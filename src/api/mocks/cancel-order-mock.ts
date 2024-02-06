import { http, HttpResponse } from 'msw'

import { ROUTER_CANCEL_ORDER } from '@/constants/route'

import { CancelOrderParams } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
  ROUTER_CANCEL_ORDER,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
