import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formattedCurrency } from '@/utils/formatted-currency'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 500 },
  { date: '12/12', revenue: 800 },
  { date: '13/12', revenue: 2500 },
  { date: '14/12', revenue: 1860 },
  { date: '15/12', revenue: 500 },
  { date: '16/12', revenue: 3200 },
]

export function RevenueChat() {
  return (
    <Card className="col-span-full lg:col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
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
              dataKey="revenue"
              stroke={colors.orange[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
