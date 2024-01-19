import { ROUTE_RESTAURANTS } from '@/constants/route'
import { api } from '@/lib/axios'

export type RegisterRestaurantBody = {
  email: string
  managerName: string
  restaurantName: string
  phone: string
}

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantBody) {
  await api.post(ROUTE_RESTAURANTS, {
    email,
    managerName,
    phone,
    restaurantName,
  })
}
