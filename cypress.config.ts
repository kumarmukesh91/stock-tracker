// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const {defineConfig} = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
  },
})
