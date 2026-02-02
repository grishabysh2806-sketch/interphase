import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true,
      },
      preview: {
        allowedHosts: true,
      },
      plugins: [
        react(),
        tailwindcss(),
      ],
      build: {
        chunkSizeWarningLimit: 900,
      },
      define: {
        'process.env.VITE_TELEGRAM_API_ID': JSON.stringify(env.VITE_TELEGRAM_API_ID),
        'process.env.VITE_TELEGRAM_API_HASH': JSON.stringify(env.VITE_TELEGRAM_API_HASH),
        'process.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(env.VITE_TELEGRAM_BOT_TOKEN),
        'process.env.VITE_TELEGRAM_CHAT_ID': JSON.stringify(env.VITE_TELEGRAM_CHAT_ID),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
    };
});
