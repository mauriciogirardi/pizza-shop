import { expect, test } from '@playwright/test'

import { PATH_ROOT } from '../src/constants/paths'

test('display day orders amount metric', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })
  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('-5%em relação a ontem')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })
  await expect(page.getByText('200')).toBeVisible()
  await expect(page.getByText('+ 7%em relação ao mês passado')).toBeVisible()
})

test('display month cancel orders amount metric', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })
  await expect(page.getByText('5', { exact: true })).toBeVisible()
  await expect(page.getByText('+ 5%em relação ao mês passado')).toBeVisible()
})

test('display month revenue orders amount metric', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })
  await expect(page.getByText('R$ 0,52')).toBeVisible()
  await expect(page.getByText('+ 8%em relação ao mês passado')).toBeVisible()
})
