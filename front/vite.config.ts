import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {alias: {util:'util',
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",}},
  define: {"process.env": process.env}
})
