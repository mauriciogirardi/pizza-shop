import { ROUTE_MANAGED_RESTAURANT } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetManagedRestaurantResponse = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    ROUTE_MANAGED_RESTAURANT,
  )
  return response.data
}
