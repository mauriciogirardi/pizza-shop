import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('<NavLink/>', () => {
  it('should be able to highlight the nav link when is the current page link.', () => {
    render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
        ),
      },
    )

    const linkAbout = screen.getByText(/about/i)
    const linkHome = screen.getByText(/home/i)

    expect(linkAbout.dataset.current).toEqual('true')
    expect(linkHome.dataset.current).toEqual('false')
  })

  it('should be able to highlight the nav link when change and current page link.', async () => {
    const user = userEvent.setup()

    render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        ),
      },
    )

    const linkAbout = screen.getByText(/about/i)
    const linkHome = screen.getByText(/home/i)

    expect(linkHome.dataset.current).toEqual('true')
    expect(linkAbout.dataset.current).toEqual('false')

    await user.click(linkAbout)

    expect(linkHome.dataset.current).toEqual('false')
    expect(linkAbout.dataset.current).toEqual('true')

    await user.click(linkHome)

    expect(linkHome.dataset.current).toEqual('true')
    expect(linkAbout.dataset.current).toEqual('false')
  })
})
