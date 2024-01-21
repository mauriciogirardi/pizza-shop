import { GetOrdersResponse, StatusOrder } from '@/api/get-orders'
import { KEY_ORDERS } from '@/constants/queries-key'
import { queryClient } from '@/lib/react-query'

type UpdateCancelOrderStatusCacheProps = {
  orderId: string
  status: StatusOrder
}

export function updateOrderStatusOnCache({
  orderId,
  status,
}: UpdateCancelOrderStatusCacheProps) {
  const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
    queryKey: [KEY_ORDERS],
  })

  ordersListCache.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) return

    queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
      ...cacheData,
      orders: cacheData.orders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status }
        }

        return order
      }),
    })
  })
}
