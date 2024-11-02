import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: env.VITE_IP_ADDRESS, // Use the IP address as the host
      port: 3001, // Change the port to 3001
      open: true, // Optional: Automatically open the app in the browser
    },
  };
});
