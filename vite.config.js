import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        // Hada houwa l-hal: kat-ferdi 3la Vite y-khdem b 127.0.0.1
        // Bach may-bqach y-tkhaleq m3a [::1] dyal IPv6
        host: '127.0.0.1',
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});