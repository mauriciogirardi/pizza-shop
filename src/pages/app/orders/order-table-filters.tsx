import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <Input placeholder="ID do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectOptionsStatusOrder.map(({ label, statusColor, value }) => (
            <SelectItem value={value} key={value}>
              <span className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                {label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
