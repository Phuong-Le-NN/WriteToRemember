import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['ec2-3-139-80-149.us-east-2.compute.amazonaws.com'], // ✅ Must be an array of strings
  }
});
