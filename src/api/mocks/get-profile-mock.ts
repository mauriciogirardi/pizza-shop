import { http, HttpResponse } from 'msw'

import { ROUTER_ME } from '@/constants/route'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  ROUTER_ME,
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      phone: '910789654',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
