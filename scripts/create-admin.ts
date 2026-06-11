import fs from 'fs';
import path from 'path';

function loadEnv() {
  const files = ['.env', '.env.local', '.env.development'];
  for (const file of files) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...values] = trimmed.split('=');
          if (key && values.length > 0) {
            process.env[key.trim()] = values.join('=').trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
          }
        }
      });
    }
  }
}

// Load environment variables before database setup
loadEnv();

import { db } from '../src/db';
import { adminUsers } from '../src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123456';

  console.log(`Creating admin user: ${username}...`);

  const passwordHash = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (existing.length > 0) {
    console.log(`Admin user "${username}" already exists. Updating password...`);
    await db
      .update(adminUsers)
      .set({
        passwordHash,
        createdAt: new Date(),
      })
      .where(eq(adminUsers.username, username));
    console.log('Password updated successfully!');
  } else {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

    await db.insert(adminUsers).values({
      id,
      username,
      passwordHash,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log(`Admin user "${username}" created successfully!`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Error creating admin user:', err);
  process.exit(1);
});
