import { expect, test } from '@playwright/test'

import { PATH_ROOT } from '../src/constants/paths'

test('update profile successfully', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })

  await page.getByLabel('Abrir profile').click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  await page.getByLabel('Nome:').fill('Pizza Girardi')
  await page.getByLabel('Descrição:').fill('New Description')

  await page.getByRole('button', { name: 'Salver' }).click()
  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByText('Pizza Girardi')).toBeVisible()
})
