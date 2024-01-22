import { Link, useRouteError } from 'react-router-dom'

import { PATH_ROOT } from '@/constants/paths'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <section className="mt-16 flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes.
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <Link to={PATH_ROOT}>Dashboard</Link>
    </section>
  )
}
