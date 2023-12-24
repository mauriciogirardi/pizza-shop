import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import * as T from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
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
                  <T.TableHead className="w-[164px]"></T.TableHead>
                  <T.TableHead className="w-[132px]"></T.TableHead>
                </T.TableRow>
              </T.TableHeader>

              <T.TableBody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <OrderTableRow key={index} />
                ))}
              </T.TableBody>
            </T.Table>
          </div>
        </div>
        <Pagination pageIndex={0} perPage={10} totalCount={105} />
      </section>
    </>
  )
}
