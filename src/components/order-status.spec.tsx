import { render, screen } from '@testing-library/react'

import { Status } from '@/constants/order-status'

import { OrderStatus } from './order-status'

describe('<OderStatus/>', () => {
  it('should be able to render the pending status.', () => {
    const { container } = render(<OrderStatus status={Status.PENDING} />)
    const badgeElement = container.firstChild?.firstChild
    const statusText = screen.getByText(/pendente/i)
    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })

  it('should be able to render the processing status.', () => {
    const { container } = render(<OrderStatus status={Status.PROCESSING} />)
    const badgeElement = container.firstChild?.firstChild
    const statusText = screen.getByText(/em preparo/i)
    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-orange-400')
  })

  it('should be able to render the delivering status.', () => {
    const { container } = render(<OrderStatus status={Status.DELIVERING} />)
    const badgeElement = container.firstChild?.firstChild
    const statusText = screen.getByText(/em entrega/i)
    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-yellow-400')
  })

  it('should be able to render the delivered status.', () => {
    const { container } = render(<OrderStatus status={Status.DELIVERED} />)
    const badgeElement = container.firstChild?.firstChild
    const statusText = screen.getByText(/entregue/i)
    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-green-400')
  })

  it('should be able to render the canceled status.', () => {
    const { container } = render(<OrderStatus status={Status.CANCELED} />)
    const badgeElement = container.firstChild?.firstChild
    const statusText = screen.getByText(/cancelado/i)
    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-red-400')
  })
})
