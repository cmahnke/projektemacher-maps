// vite.config.js
import checker from 'vite-plugin-checker'
//import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  root: 'viewer',
  plugins: [
    checker({
      eslint: {
        lintCommand: 'eslint "./*.js"',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
}
