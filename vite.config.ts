// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change the port to 3000
    open: true, // Optional: Automatically open the app in the browser
  },
});
