import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        minify: true,
        rollupOptions: {
            input: ['index.html']
        }
    },
    esbuild: {
        target: 'es6',
        drop: ['console', 'debugger']
    }
})