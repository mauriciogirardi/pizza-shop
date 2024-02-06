import { http, HttpResponse } from 'msw'

import { ROUTER_DISPATCH_ORDER } from '@/constants/route'

import { DispatchOrderParams } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  ROUTER_DISPATCH_ORDER,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
