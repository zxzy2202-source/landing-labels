import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSiteSettings } from '@/lib/siteSettings';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  try {
    const config = await req.json();

    // Basic structure validation
    if (!config || !config.seo || !config.hero || !config.geo || !config.contact) {
      return NextResponse.json({ error: 'Invalid configuration format' }, { status: 400 });
    }

    // Save to DB
    await db
      .insert(siteSettings)
      .values({
        key: 'config',
        value: JSON.stringify(config),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: JSON.stringify(config),
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
