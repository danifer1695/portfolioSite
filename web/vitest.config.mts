import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	//we need to tell Vitest what @/... means
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },

	//we only test logic, no DOM or browser simulation needed
	test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
