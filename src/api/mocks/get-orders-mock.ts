import { http, HttpResponse } from 'msw'

import { Status } from '@/constants/order-status'
import { ROUTER_ORDERS } from '@/constants/route'

import { GetOrdersResponse } from '../get-orders'

const status = ['pending', 'processing', 'canceled', 'delivered', 'delivering']

const orders: GetOrdersResponse['orders'] = Array.from({ length: 60 }).map(
  (_, index) => ({
    orderId: `order-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: status[index % 5] as Status,
  }),
)

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  ROUTER_ORDERS,
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get('pageIndex')) || 0
    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
