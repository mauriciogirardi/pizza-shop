import { AlertCircle } from 'lucide-react'
import { Link, useRouteError } from 'react-router-dom'

import { PATH_ROOT } from '@/constants/paths'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <AlertCircle className="mb-6 h-11 w-11 text-orange-500" />

      <h1 className="text-2xl font-semibold">Whoops, algo aconteceu...</h1>
      <p className="mb-3 text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes.
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <Link className="mt-6 underline" to={PATH_ROOT}>
        Volte para dashboard
      </Link>
    </section>
  )
}
