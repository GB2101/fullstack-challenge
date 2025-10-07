import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	plugins: [react()],
	preview: {
		port: parseInt(process.env.port ?? '3000'),
		strictPort: true,
	},
	server: {
		port: parseInt(process.env.port ?? '3000'),
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:8080",
	},
});
