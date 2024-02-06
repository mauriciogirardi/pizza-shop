import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, Loader2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { PATH_SIGN_IN } from '@/constants/paths'
import { KEY_MANAGED_RESTAURANT, KEY_PROFILE } from '@/constants/queries-key'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [KEY_PROFILE],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: [KEY_MANAGED_RESTAURANT],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate(PATH_SIGN_IN, { replace: true })
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Abrir profile"
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-36" />
            ) : (
              <>
                {isSigningOut && (
                  <Loader2 className="animate-spin text-emerald-400" />
                )}
                {managedRestaurant?.name}
              </>
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-1">
            {isLoadingProfile ? (
              <>
                <Skeleton className="h-5 w-10/12" />
                <Skeleton className="h-4 w-11/12" />
              </>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem
              className="flex items-center gap-2"
              aria-label="Abrir modal de perfil da loja"
            >
              <Building className="h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="flex items-center gap-2 text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button
              onClick={() => signOutFn()}
              className="w-full"
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
              {isSigningOut && (
                <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
              )}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
