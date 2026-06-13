import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using relative base so the build works on GitHub Pages, Vercel, or any subpath
export default defineConfig({
  plugins: [react()],
  base: './',
})
