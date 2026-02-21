import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Sınırı 1000kb veya daha fazlasına çekerek uyarıyı kapatıyoruz
    chunkSizeWarningLimit: 1600,
  },
});