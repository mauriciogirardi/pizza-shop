import { ROUTER_DISPATCH_ORDER } from '@/constants/route'
import { api } from '@/lib/axios'

export type DispatchOrderParams = {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderParams) {
  const path = ROUTER_DISPATCH_ORDER.replace(':orderId', orderId)
  await api.patch(path)
}
