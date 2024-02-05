import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useParams } from '@/hooks/useParams'

const selectOptionsStatusOrder = [
  {
    value: 'all',
    label: 'Todos status',
    statusColor: 'border rounded-full',
  },
  {
    value: 'pending',
    label: 'Pendente',
    statusColor: 'bg-slate-400',
  },
  {
    value: 'canceled',
    label: 'Cancelado',
    statusColor: 'bg-red-400',
  },
  {
    value: 'processing',
    label: 'Em preparo',
    statusColor: 'bg-orange-400',
  },
  {
    value: 'delivering',
    label: 'Em entrega',
    statusColor: 'bg-yellow-400',
  },
  {
    value: 'delivered',
    label: 'Entregue',
    statusColor: 'bg-green-400',
  },
]

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>

export function OrderTableFilters() {
  const { filters } = useParams()
  const { customerName, orderId, status, onClearAllFilters, onFilters } =
    filters

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(ordersFiltersSchema),
      defaultValues: {
        customerName: customerName ?? '',
        orderId: orderId ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter({ customerName, orderId, status }: OrderFiltersSchema) {
    onFilters({ customerName, orderId, status })
  }

  function handleClearFilters() {
    onClearAllFilters()

    reset({
      customerName: '',
      orderId: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col flex-wrap gap-2 lg:flex-row lg:items-center"
    >
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          placeholder="Nome do cliente"
          className="h-8 lg:w-[320px]"
          {...register('customerName')}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-full lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectOptionsStatusOrder.map(
                  ({ label, statusColor, value }) => (
                    <SelectItem value={value} key={value}>
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${statusColor}`}
                        />
                        {label}
                      </span>
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Button
          aria-label="Filtrar resultados"
          type="submit"
          variant="secondary"
          size="xs"
          className="w-full"
        >
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          onClick={handleClearFilters}
          aria-label="Remover filtros"
          type="button"
          variant="outline"
          size="xs"
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </div>
    </form>
  )
}
