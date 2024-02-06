import { http, HttpResponse } from 'msw'

import { ROUTER_APPROVE_ORDER } from '@/constants/route'

import { ApproveOrderParams } from '../approve-order'

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  ROUTER_APPROVE_ORDER,
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
