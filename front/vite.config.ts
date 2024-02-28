import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '')
  return{
  plugins: [react()],
  server: {
    port: parseInt(env.VITE_APP_PORT) || 4000,
    host: true,
  },
  preview: {
    strictPort: true,
    host: true,
    port: parseInt(env.VITE_APP_PORT) || 4000,
    publicDir: 'public',
  },
}
})
