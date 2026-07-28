import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        react(),
        svgr(),
        visualizer({
            open: true, // Автоматично відкриватиме звіт у браузері після збірки
            filename: 'stats.html', // Ім'я файлу звіту
            gzipSize: true, // Показувати розмір з урахуванням gzip
            brotliSize: true, // Показувати розмір з урахуванням brotli
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
    },
})
