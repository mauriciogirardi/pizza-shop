import { Home, Menu, Pizza, UtensilsCrossed, X } from 'lucide-react'
import { useState } from 'react'

import { PATH_ORDERS, PATH_ROOT } from '@/constants/paths'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import * as D from './ui/drawer'
import { Separator } from './ui/separator'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6 text-orange-400" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="hidden items-center space-x-4 md:flex  lg:space-x-6">
          <NavLink to={PATH_ROOT}>
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to={PATH_ORDERS}>
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="flex  md:hidden ">
          <D.Drawer
            direction="left"
            onOpenChange={setOpen}
            onClose={() => setOpen(false)}
            open={open}
          >
            <D.DrawerTrigger>
              <Menu className="h-8 w-8 text-muted-foreground hover:text-muted-foreground/80" />
            </D.DrawerTrigger>

            <D.DrawerContent className="h-screen w-[250px]">
              <D.DrawerClose className="absolute right-5 top-5 cursor-pointer text-muted-foreground hover:text-muted-foreground/80">
                <X />
              </D.DrawerClose>

              <nav className="mt-11 flex flex-col gap-4 pl-4">
                <NavLink to={PATH_ROOT} onClick={() => setOpen(false)}>
                  <Home className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink to={PATH_ORDERS} onClick={() => setOpen(false)}>
                  <UtensilsCrossed className="h-4 w-4" />
                  Pedidos
                </NavLink>
              </nav>

              <D.DrawerFooter>
                <Pizza className="h-6 w-6 text-orange-400" />
              </D.DrawerFooter>
            </D.DrawerContent>
          </D.Drawer>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
