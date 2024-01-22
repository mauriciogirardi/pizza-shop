import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { LabelAmount, LabelAmountSkeleton } from '@/components/label-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KEY_DAY_ORDERS_AMOUNT, KEY_METRICS } from '@/constants/queries-key'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: [KEY_METRICS, KEY_DAY_ORDERS_AMOUNT],
    queryFn: getDayOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <LabelAmount
              value={dayOrdersAmount.diffFromYesterday}
              isIncrease={dayOrdersAmount.diffFromYesterday >= 0}
              label="em relação a ontem"
            />
          </>
        ) : (
          <LabelAmountSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
