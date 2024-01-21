import { ROUTER_CANCEL_ORDER } from '@/constants/route'
import { api } from '@/lib/axios'

export type CancelOrderParams = {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  const path = ROUTER_CANCEL_ORDER.replace(':orderId', orderId)
  await api.patch(path)
}
