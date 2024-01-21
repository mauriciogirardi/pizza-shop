import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Check, Loader2, Search, X } from 'lucide-react'
import { Fragment, ReactNode, useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { StatusOrder } from '@/api/get-orders'
import { updateOrderStatusOnCache } from '@/cache/update-order-status-on-cache'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import * as T from '@/components/ui/table'
import { Status } from '@/constants/order-status'
import { formattedCurrency } from '@/utils/formatted-currency'

import { OrderDetails } from './order-details'

type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: StatusOrder
    customerName: string
    total: number
  }
}

type Buttons = {
  label: string
  icon: ReactNode
  isLoading: boolean
  disabled?: boolean
  status: StatusOrder
  onClick?: () => void
}[]

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: Status.CANCELED })
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: Status.PROCESSING })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: Status.DELIVERING })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: Status.DELIVERED })
      },
    })

  const getButtonTableCell = ({
    label,
    icon,
    isLoading,
    disabled,
    onClick,
  }: Buttons[0]) => {
    return (
      <T.TableCell key={label}>
        <Button
          role="button"
          aria-label={label}
          size="xs"
          variant={'outline'}
          disabled={disabled}
          onClick={onClick}
        >
          {isLoading ? (
            <div className="flex w-[80px] justify-center">
              <Loader2 className="animate-spin text-orange-500" />
            </div>
          ) : (
            <>
              {icon}
              {label}
            </>
          )}
        </Button>
      </T.TableCell>
    )
  }

  const buttons: Buttons = [
    {
      label: 'Aprovar',
      icon: <ArrowRight className="mr-2 h-3 w-3" />,
      isLoading: isApprovingOrder,
      status: Status.PENDING,
      disabled: isApprovingOrder,
      onClick: () => approveOrderFn({ orderId: order.orderId }),
    },
    {
      label: 'Em entrega',
      icon: <ArrowRight className="mr-2 h-3 w-3" />,
      isLoading: isDispatchingOrder,
      status: Status.PROCESSING,
      disabled: isDispatchingOrder,
      onClick: () => dispatchOrderFn({ orderId: order.orderId }),
    },
    {
      label: 'Entregue',
      icon: <Check className="mr-2 h-3 w-3" />,
      isLoading: isDeliveringOrder,
      status: Status.DELIVERING,
      disabled: isDeliveringOrder,
      onClick: () => deliverOrderFn({ orderId: order.orderId }),
    },
  ]

  return (
    <T.TableRow>
      <T.TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </T.TableCell>

      <T.TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </T.TableCell>

      <T.TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </T.TableCell>

      <T.TableCell>
        <OrderStatus status={order.status} />
      </T.TableCell>

      <T.TableCell className="font-medium">{order.customerName}</T.TableCell>

      <T.TableCell className="font-medium">
        {formattedCurrency(order.total / 100)}
      </T.TableCell>

      <T.TableCell>
        {buttons.map((btn) => {
          const { status } = btn
          const shouldShowButton = order.status === status

          return (
            shouldShowButton && (
              <Fragment key={btn.label}>{getButtonTableCell(btn)}</Fragment>
            )
          )
        })}
      </T.TableCell>

      <T.TableCell>
        <Button
          role="button"
          aria-label="Cancelar"
          size="xs"
          variant="ghost"
          disabled={
            ![Status.PENDING, Status.PROCESSING].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          {isCancelingOrder ? (
            <div className="flex w-[80px] justify-center">
              <Loader2 className="animate-spin text-orange-500" />
            </div>
          ) : (
            <>
              <X className="mr-2 h-3 w-3" />
              Cancelar
            </>
          )}
        </Button>
      </T.TableCell>
    </T.TableRow>
  )
}
