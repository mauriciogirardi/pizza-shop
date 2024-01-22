import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { LabelAmount, LabelAmountSkeleton } from '@/components/label-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KEY_METRICS, KEY_MONTH_REVENUE } from '@/constants/queries-key'
import { formattedCurrency } from '@/utils/formatted-currency'

export function MonthRevenuerCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: [KEY_METRICS, KEY_MONTH_REVENUE],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formattedCurrency(monthRevenue.receipt / 100)}
            </span>
            <LabelAmount
              value={monthRevenue.diffFromLastMonth}
              isIncrease={monthRevenue.diffFromLastMonth >= 0}
            />
          </>
        ) : (
          <LabelAmountSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
