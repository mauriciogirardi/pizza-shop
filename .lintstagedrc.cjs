module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    'pnpm lint',
    // `pnpm test`
  ]
}
