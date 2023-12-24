import { ArrowRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import * as T from '@/components/ui/table'

import { OrderDetails } from './order-details'

export function OrderTableRow() {
  return (
    <T.TableRow>
      <T.TableCell>
        <OrderDetails />
      </T.TableCell>

      <T.TableCell className="font-mono text-xs font-medium">
        rf7r64846544eked54ed45eff
      </T.TableCell>
      <T.TableCell>há 15 minutos</T.TableCell>
      <T.TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </T.TableCell>
      <T.TableCell className="font-medium">Mauricio Girardi</T.TableCell>
      <T.TableCell className="font-medium">R$ 149,90</T.TableCell>
      <T.TableCell>
        <Button variant="ghost" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </T.TableCell>
      <T.TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </T.TableCell>
    </T.TableRow>
  )
}
