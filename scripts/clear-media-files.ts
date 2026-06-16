import { createClient } from '@libsql/client';
async function main() {
  const c = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const rs = await c.execute('DELETE FROM media_files');
  console.log(`Deleted ${rs.rowsAffected} records from media_files`);
  c.close();
}
main().catch(e => { console.error(e); process.exit(1); });