import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount-card'
import { MonthOrderAmountCard } from './month-orders-amount-card'
import { MonthRevenuerCard } from './month-revenuer-card'
import { PopularProducts } from './popular-products'
import { RevenueChat } from './revenue-chat'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <section className="flex flex-col gap-4 tracking-tight">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[24%_24%_24%_24%]">
          <MonthRevenuerCard />
          <MonthOrderAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChat />
          <PopularProducts />
        </div>
      </section>
    </>
  )
}
