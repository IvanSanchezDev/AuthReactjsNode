import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const env=loadEnv("development", process.cwd(), 'VITE')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port : env.VITE_PORT_FRONTEND || 5122,
    hostname:env.VITE_HOSTNAME || "192.168.129.72"
  }
})
