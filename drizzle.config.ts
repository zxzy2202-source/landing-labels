import { defineConfig } from 'drizzle-kit';

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
const url = process.env.TURSO_DATABASE_URL;

if (isProduction && !url) {
  throw new Error('Missing TURSO_DATABASE_URL for drizzle config in production environment.');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: url || 'file:local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
