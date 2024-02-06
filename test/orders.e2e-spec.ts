import { expect, test } from '@playwright/test'

import { PATH_ORDERS, PATH_ROOT } from '../src/constants/paths'

test('list orders', async ({ page }) => {
  await page.goto(PATH_ROOT, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Pedidos' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('paginate order', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  // Disabled buttons
  expect(page.getByRole('button', { name: 'Primeira página' })).toBeDisabled()
  expect(page.getByRole('button', { name: 'Página anterior' })).toBeDisabled()

  // Next Page
  await page.getByRole('button', { name: 'Próxima página' }).click()
  await expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()

  // Last Page
  await page.getByRole('button', { name: 'Última página' }).click()
  await expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 60' })).toBeVisible()

  // Disabled buttons
  await expect(
    page.getByRole('button', { name: 'Última página' }),
  ).toBeDisabled()
  await expect(
    page.getByRole('button', { name: 'Próxima página' }),
  ).toBeDisabled()

  // Preview Page
  await page.getByRole('button', { name: 'Página anterior' }).click()
  await expect(
    page.getByRole('cell', { name: 'Customer 41', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()

  // Fist Page
  await page.getByRole('button', { name: 'Primeira página' }).click()
  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-50')
  await page.getByLabel('Filtrar resultados').click()

  await expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-50' })).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 20')
  await page.getByLabel('Filtrar resultados').click()

  await expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'order-20' })).toBeVisible()
})

test('filter by padding status', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByLabel('Filtrar resultados').click()

  const tableRows = page.getByRole('cell', { name: 'Pendente' })

  await expect(tableRows).toHaveCount(10)
})

test('filter by canceled status', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Cancelado').click()
  await page.getByLabel('Filtrar resultados').click()

  const tableRows = page.getByRole('cell', { name: 'Cancelado' })

  await expect(tableRows).toHaveCount(10)
})

test('filter by processing status', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Em preparo').click()
  await page.getByLabel('Filtrar resultados').click()

  const tableRows = page.getByRole('cell', { name: 'Em preparo' })

  await expect(tableRows).toHaveCount(10)
})

test('filter by delivering status', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'Em entrega' }).click()
  await page.getByLabel('Filtrar resultados').click()

  const tableRows = page.getByRole('cell', { name: 'Em entrega' })

  await expect(tableRows).toHaveCount(10)
})

test('filter by delivered status', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'Entregue' }).click()
  await page.getByLabel('Filtrar resultados').click()

  const tableRows = page.getByRole('cell', { name: 'Entregue' })

  await expect(tableRows).toHaveCount(10)
})

test('clear all filters', async ({ page }) => {
  await page.goto(PATH_ORDERS, { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-5')
  await page.getByPlaceholder('Nome do cliente').fill('Customer 5')

  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'Entregue' }).click()

  await page.getByLabel('Remover filtros').click()

  await expect(page.getByPlaceholder('ID do pedido')).toBeEmpty()
  await expect(page.getByPlaceholder('Nome do cliente')).toBeEmpty()
})
