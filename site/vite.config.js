// vite.config.js
import checker from 'vite-plugin-checker'
export default {
  plugins: [
    checker({
      eslint: {
        lintCommand: 'eslint "./*.js"',
      },
    }),
  ],
}
