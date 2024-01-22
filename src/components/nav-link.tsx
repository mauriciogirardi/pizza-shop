import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps
export function NavLink({ ...props }: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  )
}
