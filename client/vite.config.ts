/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true, // allows access from LAN/ngrok 
    strictPort: true,
    allowedHosts: [
      'spacially-infundibuliform-claudette.ngrok-free.dev', // ngrok host
      // you can add more hosts if needed
    ],
  },
});
