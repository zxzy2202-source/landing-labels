import { createClient } from '@libsql/client';
const c = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const keywords = [
  'sample-display',
  'printing-machine-scaled',
  'Warehouse',
  'Logistics',
  'Team',
  'oil-proof-es',
  'scaled',
];
for (const kw of keywords) {
  const rs = await c.execute(`SELECT url FROM media_files WHERE url LIKE '%${kw}%'`);
  for (const r of rs.rows) console.log(r['url']);
}
c.close();