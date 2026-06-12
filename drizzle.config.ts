import { defineConfig } from 'drizzle-kit';

const url = process.env.TURSO_DATABASE_URL;

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: url || 'file:local.db',
    authToken: process.env.TURSO_AUTH_TOKEN || '',
  },
});
