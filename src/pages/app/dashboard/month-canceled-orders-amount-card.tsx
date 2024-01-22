import { useQuery } from '@tanstack/react-query'
import { CircleOff } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { LabelAmount, LabelAmountSkeleton } from '@/components/label-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  KEY_CANCELED_MONTH_ORDERS_AMOUNT,
  KEY_METRICS,
} from '@/constants/queries-key'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: [KEY_METRICS, KEY_CANCELED_MONTH_ORDERS_AMOUNT],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <CircleOff className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>
            <LabelAmount
              isIncrease={monthCanceledOrdersAmount.diffFromLastMonth < 0}
              value={monthCanceledOrdersAmount.diffFromLastMonth}
              reversesSymbol
            />
          </>
        ) : (
          <LabelAmountSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
