import { http, HttpResponse } from 'msw'

import { ROUTE_MANAGED_RESTAURANT } from '@/constants/route'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>(ROUTE_MANAGED_RESTAURANT, () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    managerId: 'custom-user-id',
    name: 'Pizza Shop',
    description: 'Pizza shop description',
    createdAt: new Date(),
    updatedAt: null,
  })
})
