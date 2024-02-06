import { expect, test } from '@playwright/test'

import { PATH_SIGN_IN, PATH_SIGN_UP } from '../src/constants/paths'

test('sign up successfully', async ({ page }) => {
  await page.goto(PATH_SIGN_UP, { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@gmail.com')
  await page.getByLabel('Seu celular').fill('910789456')

  await page.getByLabel('Finalizar cadastro').click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')
  await expect(toast).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Login', exact: true }),
  ).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto(PATH_SIGN_UP, { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Girardi')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@gmail.com')
  await page.getByLabel('Seu celular').fill('910789456')

  await page.getByLabel('Finalizar cadastro').click()

  const toast = page.getByText('Credenciais invalidas.')
  await expect(toast).toBeVisible()
})

test('navigate to new login page', async ({ page }) => {
  await page.goto(PATH_SIGN_UP, { waitUntil: 'networkidle' })

  await page.getByLabel('Voltar para tela de login').click()

  expect(page.url()).toContain(PATH_SIGN_IN)
})
