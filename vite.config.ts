import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';
import { createServer } from "http";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'socket.io',
			configureServer({ httpServer }) {
				if (!httpServer) {
					throw new Error('httpServer is not defined');
				}
				const server = new Server(httpServer);
				server.on('connection', (socket) => {
					socket.on('message', (msg) => {
						socket.emit('message', 'Got: ' + msg);
					});
				});
				
				console.log('Socket.io server listening.');
			}
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
