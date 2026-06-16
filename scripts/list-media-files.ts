import { createClient } from '@libsql/client';

async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const c = createClient({ url, authToken });
  const rs = await c.execute('SELECT url, file_name FROM media_files ORDER BY file_name');
  for (const r of rs.rows) {
    const fileName = r['file_name'] as string;
    const fileUrl = r['url'] as string;
    const r2name = fileUrl.replace('https://img.gozhumeng.com/', '');
    console.log(r2name);
  }
  c.close();
}
main().catch(e => { console.error(e); process.exit(1); });