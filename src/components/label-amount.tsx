import { Skeleton } from './ui/skeleton'

type LabelAmountProps = {
  value: number
  label?: string
  isIncrease: boolean
  reversesSymbol?: boolean
}

export function LabelAmount({
  value,
  label = 'em relação ao mês passado',
  isIncrease,
  reversesSymbol = false,
}: LabelAmountProps) {
  return (
    <p className="flex items-start gap-1 text-xs text-muted-foreground">
      <span
        className={
          isIncrease
            ? 'text-emerald-500 dark:text-emerald-400'
            : 'text-rose-500 dark:text-rose-400'
        }
      >
        {`${isIncrease ? '+' : reversesSymbol ? '+' : ''} ${value}`}%
      </span>
      {label}
    </p>
  )
}

export function LabelAmountSkeleton() {
  return (
    <>
      <Skeleton className="mt-1 h-8 w-1/3" />
      <Skeleton className="h-3 w-3/4" />
    </>
  )
}
