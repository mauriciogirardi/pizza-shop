import { http, HttpResponse } from 'msw'

import { ROUTER_METRICS_POPULAR_PRODUCTS } from '@/constants/route'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>(ROUTER_METRICS_POPULAR_PRODUCTS, () => {
  return HttpResponse.json([
    { product: 'Product 01', amount: 9000 },
    { product: 'Product 02', amount: 2000 },
    { product: 'Product 03', amount: 5000 },
    { product: 'Product 04', amount: 8500 },
    { product: 'Product 05', amount: 1000 },
  ])
})
