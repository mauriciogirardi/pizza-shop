import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    environment: 'jsdom',
    // coverage: {
    //   enabled: true,
    // },
    setupFiles: ['./.test/setup.js'],
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
