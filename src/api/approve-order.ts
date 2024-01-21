import { ROUTER_APPROVE_ORDER } from '@/constants/route'
import { api } from '@/lib/axios'

export type ApproveOrderParams = {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  const path = ROUTER_APPROVE_ORDER.replace(':orderId', orderId)
  await api.patch(path)
}
