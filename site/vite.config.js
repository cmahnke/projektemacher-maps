// vite.config.js
import checker from 'vite-plugin-checker'
/*import { defineConfig } from 'vite'*/

export default {
  root: 'viewer',
  plugins: [
    checker({
      eslint: {
        lintCommand: 'eslint "./*.js"',
      },
    }),
  ]
}
