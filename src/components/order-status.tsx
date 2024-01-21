import { StatusOrder } from '@/api/get-orders'
import { cn } from '@/lib/utils'

type OrderStatusProps = {
  status: StatusOrder
}

const orderStatusMap: Record<
  StatusOrder,
  { label: string; statusColor: string }
> = {
  canceled: {
    label: 'Cancelado',
    statusColor: 'bg-red-400',
  },
  delivered: {
    label: 'Entregue',
    statusColor: 'bg-green-400',
  },
  pending: {
    label: 'Pendente',
    statusColor: 'bg-slate-400',
  },
  delivering: {
    label: 'Em entrega',
    statusColor: 'bg-yellow-400',
  },
  processing: {
    label: 'Em preparo',
    statusColor: 'bg-orange-400',
  },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'h-2 w-2 rounded-full ',
          orderStatusMap[status].statusColor,
          orderStatusMap[status].label === 'Pendente' && 'animate-ping',
        )}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].label}
      </span>
    </div>
  )
}
