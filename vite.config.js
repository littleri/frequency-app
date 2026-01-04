import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frequency-app/',  // <--- 加上这一行，注意前后都有斜杠
})