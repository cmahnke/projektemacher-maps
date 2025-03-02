// vite.config.js
import eslint from 'vite-plugin-eslint';
//import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  envPrefix: 'VITE_',
  root: 'viewer',
  base: './',
  server: {
    cors: false,
    headers: {
       'Access-Control-Allow-Origin': '*',
     }
  },
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
