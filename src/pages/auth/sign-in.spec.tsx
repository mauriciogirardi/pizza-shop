import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('<NavLink/>', () => {
  it('should be able to set default email input value if email is present on search params.', () => {
    render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={['/sign-in?email=johndoe@gmail.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })

    const emailInput = screen.getByLabelText(/seu e-mail/i) as HTMLInputElement

    expect(emailInput.value).toEqual('johndoe@gmail.com')
  })
})
