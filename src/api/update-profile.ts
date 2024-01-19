import { ROUTER_PROFILE } from '@/constants/route'
import { api } from '@/lib/axios'

export type UpdateProfileBody = {
  name: string
  description: string | null
}

export async function updateProfile({ description, name }: UpdateProfileBody) {
  await api.put(ROUTER_PROFILE, { description, name })
}
