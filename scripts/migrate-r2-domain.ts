/**
 * Replace old R2 image domain with new custom domain in media_files table.
 *
 * old examples:
 *   https://pub-6e633d2edb0249a49e2d6756b3a8b446.r2.dev/filename.webp
 *   https://landing-labels.r2.cloudflarestorage.com/filename.webp
 *
 * new:
 *   https://img.gozhumeng.com/filename.webp
 */
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql, eq } from 'drizzle-orm';
import * as schema from '../src/db/schema';

const mf = schema.mediaFiles;

const OLD_PREFIX_PATTERNS = [
  'https://pub-6e633d2edb0249a49e2d6756b3a8b446.r2.dev',
  'https://landing-labels.r2.cloudflarestorage.com',
];
const NEW_PREFIX = 'https://img.gozhumeng.com';

async function main() {
  const url = process.env.TURSO_DATABASE_URL || 'file:local.db';
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const usesRemote = !!url && !url.startsWith('file:');

  const client = createClient({
    url,
    authToken: usesRemote ? authToken : undefined,
  });
  const db = drizzle(client, { schema });

  // 1. Find all records with old domains
  const conditions = OLD_PREFIX_PATTERNS.map(
    (p) => sql`${mf.url} LIKE ${p + '%'}`
  );
  const oldRecords = await db
    .select({
      id: mf.id,
      url: mf.url,
      webpThumbUrl: mf.webpThumbUrl,
    })
    .from(mf)
    .where(sql`(${sql.join(conditions, sql` OR `)})`);

  console.log(`Found ${oldRecords.length} records to update.`);

  if (oldRecords.length === 0) {
    console.log('No records need migration.');
    await client.close();
    return;
  }

  // 2. Preview
  for (const r of oldRecords) {
    const newUrl = replaceOldDomain(r.url);
    const newThumb = replaceOldDomain(r.webpThumbUrl);
    console.log(`\n  [${r.id}]`);
    console.log(`    url:       ${r.url}`);
    console.log(`           -> ${newUrl}`);
    console.log(`    thumbUrl:  ${r.webpThumbUrl}`);
    console.log(`           -> ${newThumb}`);
  }

  // 3. Brief pause to allow reading output
  if (!process.env.SKIP_CONFIRM) {
    console.log('\nAbout to execute. Continuing in 2s...');
    await new Promise((r) => setTimeout(r, 2000));
  }

  // 4. Perform UPDATE
  let updated = 0;
  for (const r of oldRecords) {
    const newUrl = replaceOldDomain(r.url);
    const newThumb = replaceOldDomain(r.webpThumbUrl);
    await db
      .update(mf)
      .set({ url: newUrl, webpThumbUrl: newThumb })
      .where(eq(mf.id, r.id));
    updated++;
  }

  console.log(`\nDone. Updated ${updated} records.`);
  await client.close();
}

function replaceOldDomain(url: string): string {
  for (const old of OLD_PREFIX_PATTERNS) {
    if (url.startsWith(old)) {
      return NEW_PREFIX + url.slice(old.length);
    }
  }
  return url;
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});