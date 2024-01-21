import { ROUTER_DELIVER_ORDER } from '@/constants/route'
import { api } from '@/lib/axios'

export type DeliverOrderParams = {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  const path = ROUTER_DELIVER_ORDER.replace(':orderId', orderId)
  await api.patch(path)
}
