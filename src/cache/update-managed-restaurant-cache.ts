import { GetManagedRestaurantResponse } from '@/api/get-managed-restaurant'
import { UpdateProfileBody } from '@/api/update-profile'
import { KEY_MANAGED_RESTAURANT } from '@/constants/queries-key'
import { queryClient } from '@/lib/react-query'

export function updateManagedRestaurantCache({
  description,
  name,
}: UpdateProfileBody) {
  const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
    KEY_MANAGED_RESTAURANT,
  ])
  if (cached) {
    queryClient.setQueryData<GetManagedRestaurantResponse>(
      [KEY_MANAGED_RESTAURANT],
      {
        ...cached,
        name,
        description,
      },
    )
  }

  return { cached }
}
