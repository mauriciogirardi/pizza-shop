import { Status } from '@/constants/order-status'
import { ROUTER_ORDERS } from '@/constants/route'
import { api } from '@/lib/axios'

export type StatusOrder = Status

export type GetOrdersResponse = {
  orders: {
    orderId: string
    createdAt: string
    status: StatusOrder
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export type GetOrdersQuery = {
  pageIndex?: number | null
  orderId?: string | null
  status?: string | null
  customerName?: string | null
}

export async function getOrders({
  pageIndex = 0,
  customerName,
  orderId,
  status,
}: GetOrdersQuery = {}) {
  const response = await api.get<GetOrdersResponse>(ROUTER_ORDERS, {
    params: {
      pageIndex,
      customerName,
      orderId,
      status: status === 'all' ? null : status,
    },
  })

  return response.data
}
