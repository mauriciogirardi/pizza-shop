import { createBrowserRouter } from 'react-router-dom'

import {
  PATH_ORDERS,
  PATH_ROOT,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
} from '@/constants/paths'
import { SignIn } from '@/pages/auth/sign-in'

import { AppLayout } from './pages/__layouts/app'
import { AuthLayout } from './pages/__layouts/auth'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Orders } from './pages/app/orders/orders'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/not-found'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <AppLayout />,
    children: [{ path: '*', element: <NotFound /> }],
  },
  {
    path: PATH_ROOT,
    element: <AppLayout />,
    children: [
      { path: PATH_ROOT, element: <Dashboard /> },
      { path: PATH_ORDERS, element: <Orders /> },
    ],
  },

  {
    path: PATH_ROOT,
    element: <AuthLayout />,
    children: [
      { path: PATH_SIGN_IN, element: <SignIn /> },
      { path: PATH_SIGN_UP, element: <SignUp /> },
    ],
  },
])
