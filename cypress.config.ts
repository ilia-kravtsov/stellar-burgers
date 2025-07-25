import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    BURGER_API_URL: process.env.BURGER_API_URL,
  },
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {},
  },
});
