import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { LabelAmount, LabelAmountSkeleton } from '@/components/label-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KEY_METRICS, KEY_MONTH_ORDERS_AMOUNT } from '@/constants/queries-key'

export function MonthOrderAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: [KEY_METRICS, KEY_MONTH_ORDERS_AMOUNT],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount}
            </span>
            <LabelAmount
              isIncrease={monthOrdersAmount.diffFromLastMonth >= 0}
              value={monthOrdersAmount.diffFromLastMonth}
            />
          </>
        ) : (
          <LabelAmountSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
