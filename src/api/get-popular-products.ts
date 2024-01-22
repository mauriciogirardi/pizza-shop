import { ROUTER_METRICS_POPULAR_PRODUCTS } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    ROUTER_METRICS_POPULAR_PRODUCTS,
  )
  return response.data
}
