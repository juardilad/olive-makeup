import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base: './' keeps asset URLs relative so the build works from any
// GitHub Pages project path (https://user.github.io/repo-name/)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
