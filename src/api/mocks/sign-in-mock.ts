import { http, HttpResponse } from 'msw'

import { ROUTE_AUTH } from '@/constants/route'

import { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  ROUTE_AUTH,
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'johndoe@gmail.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: { 'Set-Cookie': 'auth=sample-jwt' },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)
