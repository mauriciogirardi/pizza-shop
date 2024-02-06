import { expect, test } from '@playwright/test'

import { PATH_SIGN_IN, PATH_SIGN_UP } from '../src/constants/paths'

test('sign in successfully', async ({ page }) => {
  await page.goto(PATH_SIGN_IN, { waitUntil: 'networkidle' })

  await page.getByLabel(/seu e-mail/i).fill('johndoe@gmail.com')
  await page.getByRole('button', { name: /acessar painel/i }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail',
  )
  await expect(toast).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reenviar' })).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto(PATH_SIGN_IN, { waitUntil: 'networkidle' })

  await page.getByLabel(/seu e-mail/i).fill('john@gmail.com')
  await page.getByRole('button', { name: /acessar painel/i }).click()

  const toast = page.getByText('Credenciais inválidas.')
  await expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto(PATH_SIGN_IN, { waitUntil: 'networkidle' })

  await page.getByLabel('Cadastrar novo estabelecimento').click()

  expect(page.url()).toContain(PATH_SIGN_UP)
})
