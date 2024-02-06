import { http, HttpResponse } from 'msw'

import { ROUTER_PROFILE } from '@/constants/route'

import { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
  ROUTER_PROFILE,
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Pizza Girardi') {
      return new HttpResponse(null, { status: 204 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
