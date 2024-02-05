import { useQuery } from '@tanstack/react-query'
import { differenceInDays, subDays } from 'date-fns'
import { AlertCircle, BarChart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { KEY_DAILY_REVENUE_PERIOD, KEY_METRICS } from '@/constants/queries-key'
import { formattedCurrency } from '@/utils/formatted-currency'

export function RevenueChat() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const diffInDays =
    differenceInDays(
      new Date(dateRange?.to || 0),
      new Date(dateRange?.from || 0),
    ) > 7

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: [KEY_METRICS, KEY_DAILY_REVENUE_PERIOD, dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    enabled: !diffInDays,
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  console.log(chartData)

  return (
    <Card className="col-span-full lg:col-span-6">
      <CardHeader className="flex-col justify-between pb-8 md:flex-row md:items-center">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex flex-col gap-3 pt-5 md:flex-row md:items-center md:pt-0">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData?.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center text-sm text-gray-400">
            <BarChart className="mb-3 text-orange-400" />
            <p>Não há receita para este período.</p>
          </div>
        ) : (
          <>
            {diffInDays ? (
              <div className="flex h-[180px] flex-col items-center justify-center text-sm text-gray-400">
                <AlertCircle className="mb-3 text-orange-400" />
                <p>O intervalo das datas não pode ser superior a 7 dias.</p>
                <span>escolha a data novamente!</span>
              </div>
            ) : chartData ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} style={{ fontSize: 12 }}>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    dy={16}
                  />
                  <YAxis
                    stroke="#888"
                    axisLine={false}
                    tickLine={false}
                    width={80}
                    tickFormatter={(value: number) => formattedCurrency(value)}
                  />
                  <CartesianGrid vertical={false} className="stroke-muted" />

                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="receipt"
                    stroke={colors.orange[400]}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-[240px] w-full" />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
