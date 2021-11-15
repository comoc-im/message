import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'ts/index.ts'),
            name: 'ComocMessage',
        },
        sourcemap: true
    },
})
