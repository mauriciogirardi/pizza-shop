import { render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const mockOnPageChange = vi.fn()

describe('<Pagination/>', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('should be able to display the right amount of pages and results.', () => {
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    expect(screen.getByText(/página 1 de 20/i)).toBeInTheDocument()
    expect(screen.getByText(/total de 200 item\(s\)/i)).toBeInTheDocument()
  })

  it('should be able to navigate to the next page.', async () => {
    const use = useEvent.setup()
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const nextPage = screen.getByRole('button', { name: /próxima página/i })
    await use.click(nextPage)

    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page.', async () => {
    const use = useEvent.setup()
    render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const previousPage = screen.getByRole('button', {
      name: /página anterior/i,
    })
    await use.click(previousPage)

    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the last page.', async () => {
    const use = useEvent.setup()
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const lastPage = screen.getByRole('button', {
      name: /última página/i,
    })
    await use.click(lastPage)

    expect(mockOnPageChange).toHaveBeenCalledWith(19)
  })

  it('should be able to navigate to the first page.', async () => {
    const use = useEvent.setup()
    render(
      <Pagination
        pageIndex={10}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const firstPage = screen.getByRole('button', {
      name: /primeira página/i,
    })
    await use.click(firstPage)

    expect(mockOnPageChange).toHaveBeenCalledWith(0)
  })

  it('should be able to start with first page and previous page as disabled.', async () => {
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const firstPage = screen.getByRole('button', {
      name: /primeira página/i,
    })
    const previousPage = screen.getByRole('button', {
      name: /página anterior/i,
    })

    expect(previousPage).toBeDisabled()
    expect(firstPage).toBeDisabled()
  })

  it('should be able to disable the last page and next page when be the last page.', async () => {
    render(
      <Pagination
        pageIndex={19}
        totalCount={200}
        perPage={10}
        onPageChange={mockOnPageChange}
      />,
    )

    const nextPage = screen.getByRole('button', {
      name: /próxima página/i,
    })
    const lastPage = screen.getByRole('button', {
      name: /última página/i,
    })

    expect(lastPage).toBeDisabled()
    expect(nextPage).toBeDisabled()
  })
})
