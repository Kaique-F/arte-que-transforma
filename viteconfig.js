import { defineConfig } from 'vite';

export default defineConfig({
    root: 'HTML',
    publicDir: '../Imagens',
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
});