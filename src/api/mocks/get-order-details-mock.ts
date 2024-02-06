import { http, HttpResponse } from 'msw'

import { Status } from '@/constants/order-status'
import { ROUTER_ORDERS } from '@/constants/route'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>(`${ROUTER_ORDERS}/:orderId`, ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      phone: '910456897',
      email: 'jonhdoe@gmail.com',
    },
    status: Status.PENDING,
    createdAt: new Date().toISOString(),
    totalInCents: 3400,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 2400,
        product: { name: 'Pizza 01' },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 1000,
        product: { name: 'Pizza 02' },
        quantity: 2,
      },
    ],
  })
})
