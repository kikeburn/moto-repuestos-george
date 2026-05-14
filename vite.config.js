import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambia 'moto-repuestos-george' por el nombre EXACTO de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/moto-repuestos-george/',
})
