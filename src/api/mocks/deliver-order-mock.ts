import { http, HttpResponse } from 'msw'

import { ROUTER_DELIVER_ORDER } from '@/constants/route'

import { DeliverOrderParams } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  ROUTER_DELIVER_ORDER,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
