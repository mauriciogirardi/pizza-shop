import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import * as T from '@/components/ui/table'
import { KEY_ORDERS } from '@/constants/queries-key'
import { useParams } from '@/hooks/useParams'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  const { pagination, filters } = useParams()
  const { customerName, orderId, status } = filters

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(pagination.page)

  const { data: result } = useQuery({
    queryKey: [KEY_ORDERS, pageIndex, orderId, status, customerName],
    queryFn: () => getOrders({ pageIndex, customerName, orderId, status }),
  })

  return (
    <>
      <Helmet title="Pedidos" />

      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <T.Table>
              <T.TableHeader>
                <T.TableRow>
                  <T.TableHead className="w-[58px]"></T.TableHead>
                  <T.TableHead className="w-[140px]">Identificador</T.TableHead>
                  <T.TableHead className="w-[180px]">Realizado há</T.TableHead>
                  <T.TableHead className="w-[140px]">Status</T.TableHead>
                  <T.TableHead>Cliente</T.TableHead>
                  <T.TableHead className="w-[140px]">
                    Total do pedido
                  </T.TableHead>
                  <T.TableHead className="w-[124px]"></T.TableHead>
                  <T.TableHead className="w-[122px]"></T.TableHead>
                </T.TableRow>
              </T.TableHeader>

              <T.TableBody>
                {result &&
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </T.TableBody>
            </T.Table>
          </div>
        </div>
        {result && (
          <Pagination
            pageIndex={result.meta.pageIndex}
            perPage={result.meta.perPage}
            totalCount={result.meta.totalCount}
            onPageChange={pagination.onPagination}
          />
        )}
      </section>
    </>
  )
}
