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
            open: false,
            filename: 'stats.html',
            gzipSize: true,
            brotliSize: true,
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {

                        if (id.includes('antd') || id.includes('@ant-design') || id.includes('@rc-component')) {
                            return 'vendor-antd';
                        }

                        if (id.includes('swiper')) {
                            return 'vendor-swiper';
                        }

                        if (id.includes('@reduxjs') || id.includes('redux') || id.includes('zustand')) {
                            return 'vendor-state';
                        }

                        return 'vendor-core';
                    }
                },
            },
        },
    },
})
