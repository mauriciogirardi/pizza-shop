import { ROUTER_SIGN_OUT } from '@/constants/route'
import { api } from '@/lib/axios'

export async function signOut() {
  await api.post(ROUTER_SIGN_OUT)
}
