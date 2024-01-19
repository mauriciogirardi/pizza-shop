import { ROUTER_ME } from '@/constants/route'
import { api } from '@/lib/axios'

export type GetProfileResponse = {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>(ROUTER_ME)
  return response.data
}
