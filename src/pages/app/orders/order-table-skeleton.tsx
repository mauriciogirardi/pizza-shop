import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell className="py-4">
          <Button variant="outline" size="xs">
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[172px]" />
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[148px]" />
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[110px]" />
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[200px]" />
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[64px]" />
        </TableCell>

        <TableCell className="py-4">
          <Skeleton className="h-5 w-[92px]" />
        </TableCell>

        <TableCell className="py-4">
          <Button size="xs" variant="ghost" disabled>
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    )
  })
}
