import { ROUTER_ORDERS } from '@/constants/route'
import { api } from '@/lib/axios'

import { StatusOrder } from './get-orders'

type GetOrderDetailsParams = {
  orderId: string
}

export type GetOrderDetailsResponse = {
  id: string
  createdAt: string
  status: StatusOrder
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `${ROUTER_ORDERS}/${orderId}`,
  )
  return response.data
}
