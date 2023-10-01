// vite.config.js
import checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint';
//import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  envPrefix: 'VITE_',
  root: 'viewer',
  base: './',
  plugins: [
    /*
    checker({
      eslint: {
        lintCommand: 'eslint "./viewer/*.js"',
      },
    }),
    */
    eslint(),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
}
