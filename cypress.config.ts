import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8080',
		supportFile: 'cypress/support/e2e.ts',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
