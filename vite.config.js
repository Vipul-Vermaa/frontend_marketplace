import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':['http://localhost:4000','https://marketplace-4e0a.onrender.com/api/v1','https://market-backend-mneb.onrender.com/api/v1','http://localhost:5173'],
      'secure':false,
    },
  },
  plugins: [react()],
})
