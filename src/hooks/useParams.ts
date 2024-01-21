import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

type OnFiltersProps = {
  orderId?: string
  status?: string
  customerName?: string
}

export function useParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const status = searchParams.get('status')
  const customerName = searchParams.get('customerName')
  const page = searchParams.get('page') ?? '1'

  const onPagination = useCallback(
    (pageIndex: number) => {
      setSearchParams((prev) => {
        prev.set('page', String(pageIndex + 1))
        return prev
      })
    },
    [setSearchParams],
  )

  const onClearAllFilters = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('status')
      prev.delete('customerName')
      prev.set('page', '1')
      return prev
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFilters = useCallback(
    ({ customerName, orderId, status }: OnFiltersProps) => {
      setSearchParams((prev) => {
        orderId ? prev.set('orderId', orderId) : prev.delete('orderId')
        customerName
          ? prev.set('customerName', customerName)
          : prev.delete('customerName')
        status ? prev.set('status', status) : prev.delete('status')

        prev.set('page', '1')
        return prev
      })
    },
    [setSearchParams],
  )

  const filters = {
    orderId,
    status,
    customerName,
    onClearAllFilters,
    onFilters,
  }

  const pagination = {
    page,
    onPagination,
  }
  return { filters, pagination }
}
