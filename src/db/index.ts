import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (isProduction && !url) {
  throw new Error('Missing TURSO_DATABASE_URL in production environment. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Vercel project settings.');
}

export const client = createClient({
  url: url || 'file:local.db',
  authToken,
});

export const db = drizzle(client, { schema });
